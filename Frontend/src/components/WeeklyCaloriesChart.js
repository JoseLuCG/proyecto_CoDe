import { View, Text, StyleSheet } from 'react-native';
import { colorStyle } from '../styles/Colors';

const DAY_LABELS = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];

export default function WeeklyCaloriesChart({ dailyKcal = [], maxKcal = 1 }) {
	const barColorStart = colorStyle.mainGradient[0];
	const maxBarHeight = 100;

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Kcal esta semana</Text>
			<View style={styles.chartArea}>
				<View style={styles.yAxis}>
					<Text style={styles.yLabel}>{Math.round(maxKcal)}</Text>
					<Text style={styles.yLabel}>{Math.round(maxKcal / 2)}</Text>
					<Text style={styles.yLabel}>0</Text>
				</View>
				<View style={styles.barsContainer}>
					{dailyKcal.map((kcal, index) => {
						const barHeight = maxKcal > 0
							? Math.max((kcal / maxKcal) * maxBarHeight, 2)
							: 2;
						const isToday = index === new Date().getDay() - 1;

						return (
							<View key={index} style={styles.barColumn}>
								<Text style={[styles.kcalLabel, isToday && styles.kcalLabelToday]}>
									{kcal > 0 ? Math.round(kcal) : ''}
								</Text>
								<View style={styles.barTrack}>
									<View
										style={[
											styles.bar,
											{
												height: barHeight,
												borderColor: isToday ? barColorStart : 'transparent',
												borderWidth: isToday ? 2 : 0,
											},
										]}
									>
										<View
											style={[
												styles.barFill,
												{
													height: barHeight,
													backgroundColor: kcal > 0 ? barColorStart : colorStyle.bgCard,
													opacity: kcal > 0 ? 1 : 0.3,
												},
											]}
										/>
									</View>
								</View>
								<Text style={[styles.dayLabel, isToday && styles.dayLabelToday]}>
									{DAY_LABELS[index]}
								</Text>
							</View>
						);
					})}
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: colorStyle.bgCard,
		borderRadius: 16,
		padding: 16,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.15,
		shadowRadius: 8,
		elevation: 5,
	},
	title: {
		fontSize: 14,
		fontWeight: 'bold',
		color: colorStyle.textPrimary,
		marginBottom: 12,
	},
	chartArea: {
		flexDirection: 'row',
		height: 140,
		alignItems: 'flex-end',
	},
	yAxis: {
		width: 30,
		height: 120,
		justifyContent: 'space-between',
		alignItems: 'flex-end',
		paddingRight: 6,
	},
	yLabel: {
		fontSize: 9,
		color: colorStyle.textMuted,
	},
	barsContainer: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'flex-end',
		height: 140,
		borderLeftWidth: 1,
		borderLeftColor: colorStyle.textMuted + '40',
		paddingLeft: 8,
	},
	barColumn: {
		alignItems: 'center',
		width: 30,
	},
	barTrack: {
		height: 110,
		width: 20,
		justifyContent: 'flex-end',
		alignItems: 'center',
		borderRadius: 6,
	},
	bar: {
		width: '100%',
		borderRadius: 6,
		overflow: 'hidden',
	},
	barFill: {
		width: '100%',
		borderRadius: 6,
	},
	kcalLabel: {
		fontSize: 8,
		color: colorStyle.textSecondary,
		marginBottom: 4,
	},
	kcalLabelToday: {
		color: colorStyle.mainGradient[0],
		fontWeight: 'bold',
	},
	dayLabel: {
		fontSize: 12,
		color: colorStyle.textMuted,
		marginTop: 6,
		fontWeight: '600',
	},
	dayLabelToday: {
		color: colorStyle.mainGradient[0],
		fontWeight: 'bold',
	},
});
