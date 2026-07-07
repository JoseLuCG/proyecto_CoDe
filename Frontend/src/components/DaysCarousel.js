import { useEffect, useRef, useState } from 'react';
import { View, FlatList, StyleSheet, Text, TouchableOpacity, Dimensions } from 'react-native';
import dayjs from 'dayjs';
import DayCard from './DayCard';
import { colorStyle } from '../styles/Colors';
import { defaultBRadius } from '../styles/DefaultVaules';

const { width } = Dimensions.get('window');

export const DaysCarousel = ({ setSelectedDate }) => {
	const [selectedDay, setSelectedDay] = useState(dayjs());
	const [currentDate, setCurrentDate] = useState(dayjs());
	const [isOpen, setIsOpen] = useState(false);
	const flatListRef = useRef(null);

	const daysInMonth = currentDate.daysInMonth();
	const days = Array.from({ length: daysInMonth }, (_, i) => currentDate.date(i + 1));
	const todayIndex = currentDate.isSame(dayjs(), 'month') ? dayjs().date() - 1 : -1;

	const goToPreviousMonth = () => setCurrentDate(currentDate.subtract(1, 'month'));
	const goToNextMonth = () => setCurrentDate(currentDate.add(1, 'month'));

	const monthYearLabel = currentDate.format('MMMM YYYY');
	const displayDate = selectedDay.format('DD MMM YYYY');

	useEffect(() => {
		setSelectedDate(selectedDay);
	}, [selectedDay]);

	const handleSelectDay = (day) => {
		setSelectedDay(day);
		setIsOpen(false);
	};

	return (
		<View style={styles.wrapper}>
			<TouchableOpacity
				style={styles.triggerButton}
				onPress={() => setIsOpen(!isOpen)}
				activeOpacity={0.8}
			>
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
								onPress={handleSelectDay}
							/>
						)}
					/>
				</View>
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
});
