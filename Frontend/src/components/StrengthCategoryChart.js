import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList } from 'react-native';
import { colorStyle } from '../styles/Colors';

const BAR_COLOR_START = colorStyle.mainGradient[0];

export default function StrengthCategoryChart({ categoryData = [], categories = [] }) {
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [dropdownVisible, setDropdownVisible] = useState(false);

	useEffect(() => {
		if (selectedIndex >= categoryData.length && categoryData.length > 0) {
			setSelectedIndex(0);
		}
	}, [categoryData, selectedIndex]);

	const currentCategory = categoryData[selectedIndex] || null;
	const maxReps = categoryData.reduce((max, cat) => Math.max(max, cat.totalReps), 0);

	function goNext() {
		if (categoryData.length === 0) return;
		setSelectedIndex((prev) => (prev + 1) % categoryData.length);
	}

	function goPrev() {
		if (categoryData.length === 0) return;
		setSelectedIndex((prev) => (prev - 1 + categoryData.length) % categoryData.length);
	}

	function handleSelectCategory(item) {
		const idx = categoryData.findIndex((c) => c.categoryName === item.cathegory_name);
		if (idx !== -1) {
			setSelectedIndex(idx);
		}
		setDropdownVisible(false);
	}

	if (categoryData.length === 0) {
		return (
			<View style={styles.container}>
				<Text style={styles.title}>Ejercicios por categoría</Text>
				<View style={styles.emptyState}>
					<Text style={styles.emptyText}>No hay ejercicios esta semana</Text>
				</View>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Ejercicios por categoría</Text>

			{/* Category selector */}
			<View style={styles.selectorRow}>
				<TouchableOpacity onPress={goPrev} style={styles.arrowButton}>
					<Text style={styles.arrowText}>‹</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={styles.categoryNameButton}
					onPress={() => setDropdownVisible(true)}
				>
					<Text style={styles.categoryNameText}>{currentCategory.categoryName}</Text>
					<Text style={styles.dropdownArrow}>▾</Text>
				</TouchableOpacity>

				<TouchableOpacity onPress={goNext} style={styles.arrowButton}>
					<Text style={styles.arrowText}>›</Text>
				</TouchableOpacity>
			</View>

			{/* Category dropdown modal */}
			<Modal
				visible={dropdownVisible}
				transparent
				animationType="fade"
				onRequestClose={() => setDropdownVisible(false)}
			>
				<TouchableOpacity
					style={styles.modalOverlay}
					activeOpacity={1}
					onPress={() => setDropdownVisible(false)}
				>
					<View style={styles.dropdownContainer}>
						<FlatList
							data={categories}
							keyExtractor={(item) => item.uuid_cathegory}
							renderItem={({ item }) => {
								const hasData = categoryData.some(
									(c) => c.categoryName === item.cathegory_name
								);
								return (
									<TouchableOpacity
										style={[
											styles.dropdownItem,
											currentCategory?.categoryName === item.cathegory_name && styles.dropdownItemActive,
										]}
										onPress={() => handleSelectCategory(item)}
										disabled={!hasData}
									>
										<Text
											style={[
												styles.dropdownItemText,
												!hasData && styles.dropdownItemDisabled,
												currentCategory?.categoryName === item.cathegory_name && styles.dropdownItemTextActive,
											]}
										>
											{item.cathegory_name}
										</Text>
										{hasData && (
											<Text style={styles.dropdownItemDot}>●</Text>
										)}
									</TouchableOpacity>
								);
							}}
						/>
					</View>
				</TouchableOpacity>
			</Modal>

			{/* Stats row */}
			<View style={styles.statsRow}>
				<View style={styles.statItem}>
					<Text style={styles.statValue}>{currentCategory.totalReps}</Text>
					<Text style={styles.statLabel}>reps totales</Text>
				</View>
				<View style={styles.statDivider} />
				<View style={styles.statItem}>
					<Text style={styles.statValue}>{currentCategory.exerciseCount}</Text>
					<Text style={styles.statLabel}>ejercicios</Text>
				</View>
				<View style={styles.statDivider} />
				<View style={styles.statItem}>
					<Text style={styles.statValue}>{currentCategory.totalSets}</Text>
					<Text style={styles.statLabel}>sets</Text>
				</View>
			</View>

			{/* Horizontal bar chart for exercises in this category */}
			{currentCategory.exercises.map((exercise, index) => {
				const barWidth = maxReps > 0
					? Math.max((exercise.totalReps / maxReps) * 100, 5)
					: 5;

				return (
					<View key={exercise.name + index} style={styles.exerciseRow}>
						<Text style={styles.exerciseName} numberOfLines={1}>
							{exercise.name}
						</Text>
						<View style={styles.exerciseBarTrack}>
							<View
								style={[
									styles.exerciseBar,
									{ width: `${barWidth}%` },
								]}
							/>
						</View>
						<Text style={styles.exerciseReps}>{exercise.totalReps} reps</Text>
					</View>
				);
			})}
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
	emptyState: {
		paddingVertical: 24,
		alignItems: 'center',
	},
	emptyText: {
		fontSize: 13,
		color: colorStyle.textMuted,
	},
	// Selector
	selectorRow: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: 14,
	},
	arrowButton: {
		width: 36,
		height: 36,
		borderRadius: 18,
		backgroundColor: colorStyle.bgDark,
		alignItems: 'center',
		justifyContent: 'center',
	},
	arrowText: {
		fontSize: 24,
		color: colorStyle.textPrimary,
		fontWeight: 'bold',
		lineHeight: 28,
	},
	categoryNameButton: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: colorStyle.bgDark,
		paddingVertical: 8,
		paddingHorizontal: 20,
		borderRadius: 20,
		marginHorizontal: 12,
		borderWidth: 1,
		borderColor: BAR_COLOR_START + '60',
	},
	categoryNameText: {
		fontSize: 15,
		fontWeight: 'bold',
		color: colorStyle.textPrimary,
	},
	dropdownArrow: {
		fontSize: 12,
		color: BAR_COLOR_START,
		marginLeft: 8,
	},
	// Dropdown modal
	modalOverlay: {
		flex: 1,
		backgroundColor: 'rgba(0,0,0,0.5)',
		justifyContent: 'center',
		alignItems: 'center',
	},
	dropdownContainer: {
		backgroundColor: colorStyle.bgDark,
		borderRadius: 16,
		padding: 8,
		width: '70%',
		maxHeight: '50%',
	},
	dropdownItem: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingVertical: 12,
		paddingHorizontal: 16,
		borderRadius: 10,
	},
	dropdownItemActive: {
		backgroundColor: BAR_COLOR_START + '20',
	},
	dropdownItemText: {
		fontSize: 14,
		color: colorStyle.textPrimary,
	},
	dropdownItemTextActive: {
		color: BAR_COLOR_START,
		fontWeight: 'bold',
	},
	dropdownItemDisabled: {
		color: colorStyle.textInactive,
	},
	dropdownItemDot: {
		fontSize: 8,
		color: BAR_COLOR_START,
	},
	// Stats
	statsRow: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		marginBottom: 14,
		paddingVertical: 8,
		borderTopWidth: 1,
		borderBottomWidth: 1,
		borderColor: colorStyle.textMuted + '20',
	},
	statItem: {
		alignItems: 'center',
	},
	statValue: {
		fontSize: 18,
		fontWeight: 'bold',
		color: colorStyle.textPrimary,
	},
	statLabel: {
		fontSize: 10,
		color: colorStyle.textSecondary,
		marginTop: 2,
	},
	statDivider: {
		width: 1,
		height: 28,
		backgroundColor: colorStyle.textMuted + '30',
	},
	// Exercise bars
	exerciseRow: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 8,
	},
	exerciseName: {
		width: 90,
		fontSize: 11,
		color: colorStyle.textSecondary,
	},
	exerciseBarTrack: {
		flex: 1,
		height: 10,
		backgroundColor: colorStyle.bgDark,
		borderRadius: 5,
		marginHorizontal: 8,
		overflow: 'hidden',
	},
	exerciseBar: {
		height: '100%',
		borderRadius: 5,
		backgroundColor: BAR_COLOR_START,
	},
	exerciseReps: {
		width: 55,
		fontSize: 11,
		color: colorStyle.textSecondary,
		textAlign: 'right',
	},
});
