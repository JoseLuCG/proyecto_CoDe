import { useEffect, useMemo, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import dayjs from 'dayjs';
import { colorStyle } from '../styles/Colors';

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export const DaysCarousel = ({ setSelectedDate }) => {
    const [selectedDay, setSelectedDay] = useState(dayjs());
    const [currentDate, setCurrentDate] = useState(dayjs());
    const [isOpen, setIsOpen] = useState(false);

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

    const isToday = (date) => date.isSame(dayjs(), 'day');
    const isSelected = (date) => date.isSame(selectedDay, 'day');

    const handleDayPress = (date) => {
        setSelectedDay(date);
        setIsOpen(false);
    };

    useEffect(() => {
        setSelectedDate(selectedDay);
    }, [selectedDay]);

    return (
        <View style={styles.wrapper}>
            <TouchableOpacity
                style={styles.triggerButton}
                onPress={() => setIsOpen(!isOpen)}
                activeOpacity={0.8}
            >
                <Text style={styles.triggerIcon}>📅</Text>
                <Text style={styles.triggerText}>{displayDate}</Text>
                <Text style={styles.triggerArrow}>{isOpen ? '▲' : '▼'}</Text>
            </TouchableOpacity>

            {isOpen && (
                <View style={styles.dropdown}>
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
                </View>
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
    triggerIcon: {
        fontSize: 18,
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
});
