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
		justifyContent: 'center',
		alignItems: 'center',
	},
	title: {
		fontSize: 22,
		fontWeight: 'bold',
	},
	routinesContainer: {
		backgroundColor: 'rgba(201, 237, 255, 0.76)',
		height: 200,
		width: 300,
		borderRadius: 14,
	}
});