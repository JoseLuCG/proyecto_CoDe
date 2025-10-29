import { useState } from 'react';
import { View, FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import dayjs from 'dayjs';
import DayCard from './DayCard';

export const DaysCarousel = () => {
	const [selectedDay, setSelectedDay] = useState(dayjs());
	const [currentDate, setCurrentDate] = useState(dayjs()); // controls month/year

	const daysInMonth = currentDate.daysInMonth();
	const days = Array.from({ length: daysInMonth }, (_, i) => currentDate.date(i + 1));

	// Handlers to move between months
	const goToPreviousMonth = () => setCurrentDate(currentDate.subtract(1, 'month'));
	const goToNextMonth = () => setCurrentDate(currentDate.add(1, 'month'));

	const monthYearLabel = currentDate.format('MMMM YYYY');

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
				data={days}
				horizontal
				showsHorizontalScrollIndicator={false}
				snapToAlignment="center"
				decelerationRate="fast"
				keyExtractor={(item) => item.format('YYYY-MM-DD')}
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
		display: 'flex',
		top: 100,
		backgroundColor: 'rgba(201, 237, 255, 0.76)',
		borderRadius: 16,
		padding: 10,
		height: 150
	},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginBottom: 8,
	},
	monthYear: {
		fontSize: 18,
		fontWeight: '600',
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