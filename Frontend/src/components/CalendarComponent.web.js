import { useContext, useEffect, useMemo, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, interpolateColor } from 'react-native-reanimated';
import dayjs from 'dayjs';
import { colorStyle } from '../styles/Colors';
import { defaultBRadius } from '../styles/DefaultVaules';
import { User } from '../contexts/UserContext';
import { getMonthlyActivity } from '../services/activityService';

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export const CalendarComponent = ({ setSelectedDate }) => {
    const { user, token, isGuest } = useContext(User);
    const [selectedDay, setSelectedDay] = useState(dayjs());
    const [currentDate, setCurrentDate] = useState(dayjs());
    const [isOpen, setIsOpen] = useState(false);
    const [shouldRender, setShouldRender] = useState(false);
    const [viewMode, setViewMode] = useState('day');
    const [activityMap, setActivityMap] = useState({});
    const animProgress = useSharedValue(0);

    useEffect(() => {
        animProgress.value = withTiming(isOpen ? 1 : 0, { duration: 250 });
        if (!isOpen) {
            const timer = setTimeout(() => setShouldRender(false), 250);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    const animatedTextStyle = useAnimatedStyle(() => ({
        color: interpolateColor(
            animProgress.value,
            [0, 1],
            [colorStyle.textPrimary, colorStyle.mainGradient[0]]
        ),
    }));

    const animatedDropdownStyle = useAnimatedStyle(() => ({
        opacity: animProgress.value,
        transform: [{ translateY: (1 - animProgress.value) * -10 }],
    }));

    async function fetchActivity() {
        try {
            const year = currentDate.year();
            const month = currentDate.month() + 1;
            const dates = await getMonthlyActivity(year, month, user.uuidUser, token);
            const map = {};
            dates.forEach(({ date, hasExercise, hasFood }) => {
                map[date] = { hasExercise, hasFood };
            });
            setActivityMap(map);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchActivity();
    }, [currentDate]);

    const monthYearLabel = currentDate.format('MMMM YYYY');
    const displayDate = selectedDay.format('DD MMM YYYY');

    const calendarGrid = useMemo(() => {
        const startOfMonth = currentDate.startOf('month');
        const startDayOfWeek = startOfMonth.day() === 0 ? 6 : startOfMonth.day() - 1;
        const totalDays = currentDate.daysInMonth();
        const totalCells = Math.ceil((startDayOfWeek + totalDays) / 7) * 7;

        const grid = [];
        for (let i = 0; i < totalCells; i++) {
            const dayOffset = i - startDayOfWeek;
            const date = startOfMonth.add(dayOffset, 'day');
            grid.push({
                date,
                isCurrentMonth: dayOffset >= 0 && dayOffset < totalDays,
                key: date.format('YYYY-MM-DD'),
            });
        }
        return grid;
    }, [currentDate]);

    const goToPreviousMonth = () => setCurrentDate(currentDate.subtract(1, 'month'));
    const goToNextMonth = () => setCurrentDate(currentDate.add(1, 'month'));

    const weekStart = currentDate.startOf('week');
    const weekDays = Array.from({ length: 7 }, (_, i) => weekStart.add(i, 'day'));
    const weekLabel = `${weekStart.format('DD MMM')} – ${weekStart.add(6, 'day').format('DD MMM')}`;
    const goToPreviousWeek = () => setCurrentDate(currentDate.subtract(1, 'week'));
    const goToNextWeek = () => setCurrentDate(currentDate.add(1, 'week'));

    const isToday = (date) => date.isSame(dayjs(), 'day');
    const isSelected = (date) => date.isSame(selectedDay, 'day');

    function toggleOpen() {
        if (isOpen) {
            setIsOpen(false);
        } else {
            animProgress.value = 0;
            setShouldRender(true);
            setIsOpen(true);
        }
    }

    const handleDayPress = (date) => {
        setSelectedDay(date);
        setIsOpen(false);
    };

    const getActivityForDate = (date) => {
        return activityMap[date.format('YYYY-MM-DD')] || null;
    };

    useEffect(() => {
        setSelectedDate(selectedDay);
    }, [selectedDay]);

    return (
        <View style={styles.wrapper}>
            <TouchableOpacity
                style={[styles.triggerButton, isOpen && styles.triggerButtonOpen]}
                onPress={toggleOpen}
                activeOpacity={0.8}
            >
                <Animated.Text style={[styles.triggerText, animatedTextStyle]}>{displayDate}</Animated.Text>
                <View style={styles.viewModeGroup}>
                    {['day', 'week', 'month'].map((mode) => (
                        <TouchableOpacity
                            key={mode}
                            style={[styles.viewModeBtn, viewMode === mode && styles.viewModeBtnActive]}
                            onPress={() => setViewMode(mode)}
                            activeOpacity={0.7}
                        >
                            <Text style={[styles.viewModeText, viewMode === mode && styles.viewModeTextActive]}>
                                {mode === 'day' ? 'D' : mode === 'week' ? 'W' : 'M'}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
                <Text style={styles.triggerArrow}>{isOpen ? '▲' : '▼'}</Text>
            </TouchableOpacity>

            {shouldRender && (
                <Animated.View style={[styles.dropdown, animatedDropdownStyle]} pointerEvents={isOpen ? 'auto' : 'none'}>
                    {viewMode === 'day' && (
                        <>
                            <View style={styles.header}>
                                <TouchableOpacity onPress={goToPreviousMonth} style={styles.navBtn}>
                                    <Text style={styles.navBtnText}>‹</Text>
                                </TouchableOpacity>
                                <Text style={styles.monthYear}>{monthYearLabel}</Text>
                                <TouchableOpacity onPress={goToNextMonth} style={styles.navBtn}>
                                    <Text style={styles.navBtnText}>›</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.weekdayRow}>
                                {WEEKDAYS.map((d) => (
                                    <View key={d} style={styles.weekdayCell}>
                                        <Text style={styles.weekdayText}>{d}</Text>
                                    </View>
                                ))}
                            </View>

                            <View style={styles.grid}>
                                {calendarGrid.map(({ date, isCurrentMonth, key }) => (
                                    <TouchableOpacity
                                        key={key}
                                        style={[
                                            styles.dayCell,
                                            !isCurrentMonth && { opacity: 0.25 },
                                            isSelected(date) && styles.dayCellSelected,
                                            isToday(date) && !isSelected(date) && styles.dayCellToday,
                                        ]}
                                        onPress={() => handleDayPress(date)}
                                        activeOpacity={0.7}
                                    >
                                        <Text
                                            style={[
                                                styles.dayText,
                                                isSelected(date) && styles.dayTextSelected,
                                            ]}
                                        >
                                            {date.format('D')}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </>
                    )}

                    {viewMode === 'week' && (
                        <>
                            <View style={styles.header}>
                                <TouchableOpacity onPress={goToPreviousWeek} style={styles.navBtn}>
                                    <Text style={styles.navBtnText}>‹</Text>
                                </TouchableOpacity>
                                <Text style={styles.monthYear}>{weekLabel}</Text>
                                <TouchableOpacity onPress={goToNextWeek} style={styles.navBtn}>
                                    <Text style={styles.navBtnText}>›</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.weekdayRow}>
                                {WEEKDAYS.map((d) => (
                                    <View key={d} style={styles.weekdayCell}>
                                        <Text style={styles.weekdayText}>{d}</Text>
                                    </View>
                                ))}
                            </View>

                            <View style={styles.weekRow}>
                                {weekDays.map((date) => {
                                    const activity = getActivityForDate(date);
                                    const hasDot = activity && (activity.hasExercise || activity.hasFood);
                                    return (
                                        <TouchableOpacity
                                            key={date.format('YYYY-MM-DD')}
                                            style={[
                                                styles.dayCell,
                                                isSelected(date) && styles.dayCellSelected,
                                                isToday(date) && !isSelected(date) && styles.dayCellToday,
                                            ]}
                                            onPress={() => handleDayPress(date)}
                                            activeOpacity={0.7}
                                        >
                                            <Text
                                                style={[
                                                    styles.dayText,
                                                    isSelected(date) && styles.dayTextSelected,
                                                ]}
                                            >
                                                {date.format('D')}
                                            </Text>
                                            {hasDot && (
                                                <View style={styles.dotContainer}>
                                                    {activity.hasExercise && <View style={[styles.dot, styles.dotExercise]} />}
                                                    {activity.hasFood && <View style={[styles.dot, styles.dotFood]} />}
                                                </View>
                                            )}
                                        </TouchableOpacity>
                                    );
                                })}
                            </View>
                        </>
                    )}

                    {viewMode === 'month' && (
                        <>
                            <View style={styles.header}>
                                <TouchableOpacity onPress={goToPreviousMonth} style={styles.navBtn}>
                                    <Text style={styles.navBtnText}>‹</Text>
                                </TouchableOpacity>
                                <Text style={styles.monthYear}>{monthYearLabel}</Text>
                                <TouchableOpacity onPress={goToNextMonth} style={styles.navBtn}>
                                    <Text style={styles.navBtnText}>›</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.weekdayRow}>
                                {WEEKDAYS.map((d) => (
                                    <View key={d} style={styles.weekdayCell}>
                                        <Text style={styles.weekdayText}>{d}</Text>
                                    </View>
                                ))}
                            </View>

                            <View style={styles.grid}>
                                {calendarGrid.map(({ date, isCurrentMonth, key }) => {
                                    const activity = getActivityForDate(date);
                                    const hasDot = activity && (activity.hasExercise || activity.hasFood);
                                    return (
                                        <TouchableOpacity
                                            key={key}
                                            style={[
                                                styles.dayCell,
                                                !isCurrentMonth && { opacity: 0.25 },
                                                isSelected(date) && styles.dayCellSelected,
                                                isToday(date) && !isSelected(date) && styles.dayCellToday,
                                            ]}
                                            onPress={() => handleDayPress(date)}
                                            activeOpacity={0.7}
                                        >
                                            <Text
                                                style={[
                                                    styles.dayText,
                                                    isSelected(date) && styles.dayTextSelected,
                                                ]}
                                            >
                                                {date.format('D')}
                                            </Text>
                                            {hasDot && (
                                                <View style={styles.dotContainer}>
                                                    {activity.hasExercise && <View style={[styles.dot, styles.dotExercise]} />}
                                                    {activity.hasFood && <View style={[styles.dot, styles.dotFood]} />}
                                                </View>
                                            )}
                                        </TouchableOpacity>
                                    );
                                })}
                            </View>
                        </>
                    )}
                </Animated.View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        alignSelf: 'center',
        width: '100%',
        maxWidth: 300,
        zIndex: 10,
        paddingHorizontal: 16,
        paddingTop: 8,
    },
    triggerButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colorStyle.bgDark,
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 20,
        gap: 8,
    },
    triggerText: {
        color: colorStyle.textPrimary,
        fontWeight: 'bold',
        fontSize: 14,
    },
    triggerArrow: {
        color: colorStyle.textPrimary,
        fontSize: 10,
        marginLeft: 4,
    },
    viewModeGroup: {
        flexDirection: 'row',
        gap: 4,
        marginLeft: 8,
    },
    viewModeBtn: {
        width: 26,
        height: 26,
        borderRadius: 13,
        backgroundColor: colorStyle.bgCard,
        alignItems: 'center',
        justifyContent: 'center',
    },
    viewModeBtnActive: {
        backgroundColor: colorStyle.mainGradient[0],
    },
    viewModeText: {
        fontSize: 11,
        fontWeight: '600',
        color: colorStyle.textInactive,
    },
    viewModeTextActive: {
        color: colorStyle.textPrimary,
    },
    triggerButtonOpen: {
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
    },
    dropdown: {
        backgroundColor: colorStyle.bgDark,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        padding: 20,
        borderWidth: 1,
        borderTopWidth: 0,
        borderColor: colorStyle.mainGradient[0] + '40',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    monthYear: {
        fontSize: 18,
        fontWeight: '700',
        color: colorStyle.textPrimary,
    },
    navBtn: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: colorStyle.bgCard,
        alignItems: 'center',
        justifyContent: 'center',
    },
    navBtnText: {
        fontSize: 24,
        color: colorStyle.mainGradient[0],
        lineHeight: 26,
        fontWeight: '600',
    },
    weekRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    weekdayRow: {
        flexDirection: 'row',
        marginBottom: 8,
    },
    weekdayCell: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 6,
    },
    weekdayText: {
        fontSize: 13,
        fontWeight: '600',
        color: colorStyle.textMuted,
        textTransform: 'uppercase',
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    dayCell: {
        width: '14.28%',
        aspectRatio: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
    dayCellSelected: {
        backgroundColor: colorStyle.mainGradient[0],
    },
    dayCellToday: {
        borderWidth: 2,
        borderColor: colorStyle.mainGradient[0],
    },
    dayText: {
        fontSize: 15,
        fontWeight: '500',
        color: colorStyle.textPrimary,
    },
    dayTextSelected: {
        color: colorStyle.textPrimary,
        fontWeight: '700',
    },
    dotContainer: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 2,
        gap: 2,
    },
    dot: {
        width: 5,
        height: 5,
        borderRadius: 2.5,
    },
    dotExercise: {
        backgroundColor: '#4CAF50',
    },
    dotFood: {
        backgroundColor: '#FF9800',
    },
});
