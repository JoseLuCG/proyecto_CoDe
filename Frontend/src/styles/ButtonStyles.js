import { StyleSheet } from "react-native";

export const buttonStyles = StyleSheet.create({
    logOutButton: {
      backgroundColor: '#D32F2F',
      paddingVertical: 14,
      paddingHorizontal: 24,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 4,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      marginTop: 20,
      position: 'absolute',
      bottom: 60,
      left: 20,
    },
    logOutButtonPressed: {
      backgroundColor: '#B71C1C', 
      transform: [{ scale: 0.98 }],
    },
  });