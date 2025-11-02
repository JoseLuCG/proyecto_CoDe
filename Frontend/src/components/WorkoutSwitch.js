import { View, Text, Switch, StyleSheet } from 'react-native';

export default function WorkoutSwitch({ exerciseType, setExerciseType }) {
  return (
    <View style={styles.container}>
      <Text style={[styles.label, !exerciseType && styles.activeLabel]}>Cardio</Text>
      <Switch
        onValueChange={setExerciseType}
        value={exerciseType}
        trackColor={{ false: '#767577', true: '#81b0ff' }}
        thumbColor={exerciseType ? '#f5dd4b' : '#f4f3f4'}
      />
      <Text style={[styles.label, exerciseType && styles.activeLabel]}>Strength</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8, // React Native 0.71+ supports gap
  },
  label: {
    fontSize: 16,
    color: '#999',
    fontWeight: '500',
  },
  activeLabel: {
    color: '#000', // highlight active side
  },
});