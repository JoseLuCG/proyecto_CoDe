import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	mainContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 16,
		paddingBottom: 155,
	},
	menuButton: {
		position: 'absolute',
		top: 40,
		left: 20,
		zIndex: 3,
		backgroundColor: '#ddd',
		width: 50,
		height: 50,
		borderRadius: 15,
		alignItems: 'center',
		justifyContent: 'center',
	},
	menuIcon: {
		fontSize: 24,
	},
	content: {
		flex: 1,
		width: '100%',
	},
	summaryContainer: {
		flex: 1,
		borderRadius: 14,
	},
	scrollContent: {
		paddingBottom: 20,
		gap: 14,
	},
	title: {
		fontSize: 22,
		fontWeight: 'bold',
		color: '#FFFFFF',
		marginBottom: 4,
	},
	cardsRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 2,
	},
	loadingContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	loadingText: {
		marginTop: 10,
		fontSize: 14,
		color: '#FFFFFF',
	},
	guestBanner: {
		backgroundColor: 'rgba(255, 193, 7, 0.25)',
		paddingVertical: 6,
		paddingHorizontal: 14,
		borderRadius: 8,
		marginTop: 10,
		alignSelf: 'center',
	},
	guestBannerText: {
		fontSize: 12,
		color: '#fff',
		textAlign: 'center',
	},
});
