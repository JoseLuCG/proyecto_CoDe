import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { View, FlatList, StyleSheet, Text, TouchableOpacity, Dimensions } from 'react-native';
import Animated, { FadeInDown, FadeOutUp, useSharedValue, useAnimatedStyle, withTiming, interpolateColor } from 'react-native-reanimated';
import dayjs from 'dayjs';
import DayCard from './DayCard';
import { colorStyle } from '../styles/Colors';
import { defaultBRadius } from '../styles/DefaultVaules';
import { User } from '../contexts/UserContext';
import { getMonthlyActivity } from '../services/activityService';

const { width } = Dimensions.get('window');

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export const CalendarComponent = ({ setSelectedDate }) => {
	const { user, token, isGuest } = useContext(User);
	const [selectedDay, setSelectedDay] = useState(dayjs());
	const [currentDate, setCurrentDate] = useState(dayjs());
	const [isOpen, setIsOpen] = useState(false);
	const [viewMode, setViewMode] = useState('day');
	const [activityMap, setActivityMap] = useState({});
	const flatListRef = useRef(null);
	const animProgress = useSharedValue(0);

	useEffect(() => {
		animProgress.value = withTiming(isOpen ? 1 : 0, { duration: 250 });
	}, [isOpen]);

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

	const animatedTextStyle = useAnimatedStyle(() => ({
		color: interpolateColor(
			animProgress.value,
			[0, 1],
			[colorStyle.textPrimary, colorStyle.mainGradient[0]]
		),
	}));

	const daysInMonth = currentDate.daysInMonth();
	const days = Array.from({ length: daysInMonth }, (_, i) => currentDate.date(i + 1));
	const todayIndex = currentDate.isSame(dayjs(), 'month') ? dayjs().date() - 1 : -1;

	const weekStart = currentDate.startOf('week');
	const weekDays = Array.from({ length: 7 }, (_, i) => weekStart.add(i, 'day'));
	const weekLabel = `${weekStart.format('DD MMM')} – ${weekStart.add(6, 'day').format('DD MMM')}`;

	const goToPreviousMonth = () => setCurrentDate(currentDate.subtract(1, 'month'));
	const goToNextMonth = () => setCurrentDate(currentDate.add(1, 'month'));
	const goToPreviousWeek = () => setCurrentDate(currentDate.subtract(1, 'week'));
	const goToNextWeek = () => setCurrentDate(currentDate.add(1, 'week'));

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

	const isToday = (date) => date.isSame(dayjs(), 'day');
	const isSelected = (date) => date.isSame(selectedDay, 'day');

	useEffect(() => {
		setSelectedDate(selectedDay);
	}, [selectedDay]);

	const handleSelectDay = (day) => {
		setSelectedDay(day);
		setIsOpen(false);
	};

	const getActivityForDate = (date) => {
		return activityMap[date.format('YYYY-MM-DD')] || null;
	};

	return (
		<View style={styles.wrapper}>
			<TouchableOpacity
				style={[styles.triggerButton, isOpen && styles.triggerButtonOpen]}
				onPress={() => setIsOpen(!isOpen)}
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

			{isOpen && (
				<Animated.View entering={FadeInDown.duration(200)} exiting={FadeOutUp.duration(150)} style={styles.dropdown}>
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

							<FlatList
								key={currentDate.format('YYYY-MM')}
								ref={flatListRef}
								data={days}
								horizontal
								showsHorizontalScrollIndicator={false}
								snapToAlignment="center"
								decelerationRate="fast"
								keyExtractor={(item) => item.format('YYYY-MM-DD')}
								initialScrollIndex={todayIndex >= 0 ? todayIndex : 0}
								getItemLayout={(_, index) => ({
									length: width * 0.18 + 12,
									offset: (width * 0.18 + 12) * index,
									index,
								})}
								renderItem={({ item }) => (
									<DayCard
										day={item}
										isSelected={item.isSame(selectedDay, 'day')}
										isToday={item.isSame(dayjs(), 'day')}
										onPress={handleSelectDay}
										activity={getActivityForDate(item)}
									/>
								)}
							/>
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

							<View style={styles.weekRow}>
								{weekDays.map((day) => (
									<DayCard
										key={day.format('YYYY-MM-DD')}
										day={day}
										isSelected={day.isSame(selectedDay, 'day')}
										isToday={day.isSame(dayjs(), 'day')}
										onPress={handleSelectDay}
										compact
										activity={getActivityForDate(day)}
									/>
								))}
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
											onPress={() => handleSelectDay(date)}
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
		width: 300,
		maxWidth: 380,
		zIndex: 10,
		marginTop: 10,
		marginBottom: 10,
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
		padding: 16,
		borderWidth: 1,
		borderTopWidth: 0,
		borderColor: colorStyle.mainGradient[0] + '40',
	},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginBottom: 8,
	},
	monthYear: {
		fontSize: 18,
		fontWeight: 'bold',
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
