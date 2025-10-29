import {useState} from 'react';
import { View, FlatList, StyleSheet} from 'react-native';
import dayjs from 'dayjs';
import DayCard from './DayCard'

export const DaysCarousel = () => {
    const [selectedDay, setSelectedDay] = useState(dayjs());
    const today = dayjs();
    const daysInMonth = today.daysInMonth();
  
    const days = Array.from({ length: daysInMonth }, (_, i) => today.date(i + 1));
  
    return (
      <View style={styles.container}>
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
      height: 100,
      borderRadius: 16,
      padding: 10
    },
  });