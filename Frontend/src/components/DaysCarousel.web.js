import { useEffect, useMemo, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import dayjs from 'dayjs';
import { colorStyle } from '../styles/Colors';

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export const DaysCarousel = ({ setSelectedDate }) => {
    const [selectedDay, setSelectedDay] = useState(dayjs());
    const [currentDate, setCurrentDate] = useState(dayjs());

    const monthYearLabel = currentDate.format('MMMM YYYY');

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
    };

    useEffect(() => {
        setSelectedDate(selectedDay);
    }, [selectedDay]);

    return (
        <View style={styles.wrapper}>
            <View style={styles.container}>
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
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: 8,
    },
    container: {
        width: '100%',
        maxWidth: 420,
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 8,
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
        color: '#1a1a2e',
    },
    navBtn: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#f0f0f5',
        alignItems: 'center',
        justifyContent: 'center',
    },
    navBtnText: {
        fontSize: 24,
        color: '#3a8abb',
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
        color: '#888',
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
        color: '#1a1a2e',
    },
    dayTextSelected: {
        color: '#fff',
        fontWeight: '700',
    },
});
