import { useEffect, useRef, useState } from 'react';
import { View, FlatList, StyleSheet, Text, TouchableOpacity, Dimensions } from 'react-native';
import dayjs from 'dayjs';
import DayCard from './DayCard';

const { width } = Dimensions.get('window');

export const DaysCarousel = ({ setSelectedDate }) => {
	const [selectedDay, setSelectedDay] = useState(dayjs());
	const [currentDate, setCurrentDate] = useState(dayjs()); // controls month/year
	const flatListRef = useRef(null);

	const daysInMonth = currentDate.daysInMonth();
	const days = Array.from({ length: daysInMonth }, (_, i) => currentDate.date(i + 1));
	const todayIndex = currentDate.isSame(dayjs(), 'month') ? dayjs().date() - 1 : -1;

	// Handlers to move between months
	const goToPreviousMonth = () => setCurrentDate(currentDate.subtract(1, 'month'));
	const goToNextMonth = () => setCurrentDate(currentDate.add(1, 'month'));

	const monthYearLabel = currentDate.format('MMMM YYYY');

	useEffect(()=> {
		setSelectedDate(selectedDay);
	}, [selectedDay]);

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<TouchableOpacity onPress={goToPreviousMonth} style={styles.arrowButton}>
					<Text style={styles.arrowText}>◀</Text>
				</TouchableOpacity>
				<Text style={styles.monthYear}>{monthYearLabel}</Text>
				<TouchableOpacity onPress={goToNextMonth} style={styles.arrowButton}>
					<Text style={styles.arrowText}>▶</Text>
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
						onPress={setSelectedDay}
					/>
				)}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: 330,
		top: 10,
		backgroundColor: '#fff',
		borderRadius: 30,
		padding: 16,
		height: 150,
		marginTop: 10,
		marginBottom: 10,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 10,
		elevation: 10,
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
		color: '#333',
	},
	arrowButton: {
		paddingHorizontal: 12,
	},
	arrowText: {
		fontSize: 20,
		color: '#007AFF',
	},
});