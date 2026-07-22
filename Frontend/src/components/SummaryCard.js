import { View, Text, StyleSheet } from 'react-native';
import { colorStyle } from '../styles/Colors';

export default function SummaryCard({ icon, value, label, accentColor }) {
	const barColor = accentColor || colorStyle.mainGradient[0];

	return (
		<View style={styles.card}>
			<View style={[styles.accentBar, { backgroundColor: barColor }]} />
			<View style={styles.content}>
				<Text style={styles.icon}>{icon}</Text>
				<Text style={styles.value}>{value}</Text>
				<Text style={styles.label}>{label}</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	card: {
		backgroundColor: colorStyle.bgCard,
		borderRadius: 16,
		width: '31%',
		overflow: 'hidden',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.15,
		shadowRadius: 8,
		elevation: 5,
	},
	accentBar: {
		height: 4,
		width: '100%',
	},
	content: {
		alignItems: 'center',
		paddingVertical: 12,
		paddingHorizontal: 6,
	},
	icon: {
		fontSize: 22,
		marginBottom: 4,
	},
	value: {
		fontSize: 20,
		fontWeight: 'bold',
		color: colorStyle.textPrimary,
		marginBottom: 2,
	},
	label: {
		fontSize: 10,
		color: colorStyle.textSecondary,
		textAlign: 'center',
	},
});
