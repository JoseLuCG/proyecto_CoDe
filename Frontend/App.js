import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';

import { styles } from './styles/Styles.js';
import {Login} from './components/Login.js';
import { UserLoggedView } from './components/UserLoggedView.js';

export default function App() {
  const [index, setIndex] = useState(0);
  const [user, setUser] = useState ({name: 'Dario', apellidos: 'Lopez Gomez'});
  const [ejerciciosCardio, setEjerciciosCardio] = useState(0);
  const [ejerciciosFuerza, setEjerciciosFuerza] = useState(0);

  function getEjerciciosCardio () {
    fetch ("https://www.localhost:3000")
      .then(response => response.json())
      .then(ejerciciosCardio => setEjerciciosCardio(ejerciciosCardio));
  }

  function getEjerciciosFuerza () {
    fetch ("https://www.localhost:3000")
      .then(response => response.json())
      .then(ejerciciosCardio => setEjerciciosCardio(ejerciciosCardio));
  }

  if (index==0) {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <Text>Holaa</Text>
        <Login />
        <StatusBar style="auto" />
      </View>
    );
  } else {
    return (
      <View>
        <UserLoggedView />
      </View>
    );
  }
  
}
