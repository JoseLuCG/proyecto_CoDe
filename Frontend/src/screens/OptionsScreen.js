import { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colorStyle } from '../styles/Colors';
import { User } from '../contexts/UserContext';

const OptionsScreen = ({ navigation }) => {
	const { user, isGuest, logout } = useContext(User);

	async function logOut() {
		await logout();
	}

	return (
		<LinearGradient
			style={styles.mainContainer}
			colors={colorStyle.mainGradient}
		>
			<ScrollView
				showsVerticalScrollIndicator={false}
				contentContainerStyle={styles.scrollContent}
			>
				<Text style={styles.title}>Opciones</Text>

				{/* User info card */}
				<View style={styles.card}>
					<Text style={styles.cardLabel}>Cuenta</Text>
					<View style={styles.userInfoRow}>
						<Text style={styles.userName}>{user?.nameUser || 'Usuario'}</Text>
						{isGuest && (
							<View style={styles.guestBadge}>
								<Text style={styles.guestBadgeText}>Invitado</Text>
							</View>
						)}
					</View>
					{user?.email ? (
						<Text style={styles.userEmail}>{user.email}</Text>
					) : null}
				</View>

				{/* Options list */}
				<View style={styles.card}>
					<Text style={styles.cardLabel}>General</Text>

					<TouchableOpacity style={styles.optionRow}>
						<Text style={styles.optionIcon}>📊</Text>
						<Text style={styles.optionText}>Mis estadísticas</Text>
						<Text style={styles.optionArrow}>›</Text>
					</TouchableOpacity>

					<View style={styles.optionDivider} />

					<TouchableOpacity style={styles.optionRow}>
						<Text style={styles.optionIcon}>🎯</Text>
						<Text style={styles.optionText}>Objetivos</Text>
						<Text style={styles.optionArrow}>›</Text>
					</TouchableOpacity>

					<View style={styles.optionDivider} />

					<TouchableOpacity style={styles.optionRow}>
						<Text style={styles.optionIcon}>🔔</Text>
						<Text style={styles.optionText}>Notificaciones</Text>
						<Text style={styles.optionArrow}>›</Text>
					</TouchableOpacity>
				</View>

				{/* Logout */}
				<TouchableOpacity style={styles.logoutButton} onPress={logOut}>
					<Text style={styles.logoutIcon}>🚪</Text>
					<Text style={styles.logoutText}>Cerrar sesión</Text>
				</TouchableOpacity>

				<Text style={styles.version}>CoDe v1.0.0</Text>
			</ScrollView>
		</LinearGradient>
	);
};

export default OptionsScreen;

const styles = StyleSheet.create({
	mainContainer: {
		flex: 1,
		padding: 16,
		paddingBottom: 155,
	},
	scrollContent: {
		paddingBottom: 20,
		gap: 14,
	},
	title: {
		fontSize: 22,
		fontWeight: 'bold',
		color: colorStyle.textPrimary,
		marginBottom: 4,
	},
	card: {
		backgroundColor: colorStyle.bgCard,
		borderRadius: 16,
		padding: 16,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.15,
		shadowRadius: 8,
		elevation: 5,
	},
	cardLabel: {
		fontSize: 12,
		fontWeight: '600',
		color: colorStyle.textMuted,
		textTransform: 'uppercase',
		letterSpacing: 1,
		marginBottom: 12,
	},
	userInfoRow: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 4,
	},
	userName: {
		fontSize: 18,
		fontWeight: 'bold',
		color: colorStyle.textPrimary,
	},
	guestBadge: {
		backgroundColor: colorStyle.mainGradient[0] + '30',
		paddingHorizontal: 10,
		paddingVertical: 3,
		borderRadius: 10,
		marginLeft: 10,
	},
	guestBadgeText: {
		fontSize: 11,
		color: colorStyle.mainGradient[0],
		fontWeight: '600',
	},
	userEmail: {
		fontSize: 13,
		color: colorStyle.textSecondary,
	},
	optionRow: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 14,
	},
	optionIcon: {
		fontSize: 18,
		marginRight: 14,
	},
	optionText: {
		flex: 1,
		fontSize: 15,
		color: colorStyle.textPrimary,
	},
	optionArrow: {
		fontSize: 22,
		color: colorStyle.textMuted,
		fontWeight: '300',
	},
	optionDivider: {
		height: 1,
		backgroundColor: colorStyle.textMuted + '20',
	},
	logoutButton: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: colorStyle.bgCard,
		borderRadius: 16,
		padding: 18,
		marginTop: 6,
		borderWidth: 1,
		borderColor: colorStyle.error + '40',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.15,
		shadowRadius: 8,
		elevation: 5,
	},
	logoutIcon: {
		fontSize: 18,
		marginRight: 10,
	},
	logoutText: {
		fontSize: 16,
		fontWeight: '600',
		color: colorStyle.error,
	},
	version: {
		fontSize: 11,
		color: colorStyle.textMuted,
		textAlign: 'center',
		marginTop: 10,
	},
});
