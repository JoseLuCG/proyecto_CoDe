import React, { useEffect, useState, useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

// Evita que la pantalla de inicio se oculte automáticamente
SplashScreen.preventAutoHideAsync();

const App = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  // Cargar las fuentes
  const loadFonts = async () => {
    await Font.loadAsync({
        "main-font": require("./assets/fonts/attort.ttf")
    });
    setFontsLoaded(true);
  };

  useEffect(() => {
    loadFonts();
  }, []);

  // Ocultar splash cuando las fuentes estén listas
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  // Mientras se cargan las fuentes, no renderizar nada
  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer onReady={onLayoutRootView}>
      <AppNavigator />
    </NavigationContainer>
  );
};

export default App;






















/*
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';

import { styles } from './styles/Styles.js';
import { Login } from './components/Login.js';
import { UserLoggedView } from './components/UserLoggedView.js';

import * as fetchController from './controllers/fetchController.js';

export default function App() {
    const [index, setIndex] = useState(0);
    const [user, setUser] = useState({ name: 'Dario', apellidos: 'Lopez Gomez' });
    const [ejerciciosCardio, setEjerciciosCardio] = useState(new Array);
    const [ejerciciosFuerza, setEjerciciosFuerza] = useState(new Array);

    /**
     * Log Out User
     * @method logoutUser
     
    function logoutUser() {
        setIndex(0);
    }

    function removeUser(id) {
        fetchController.removeUser(id)
        .then(data=>setIndex(0));
    }

    function removeExercise (id,exerciseDate,exerciseName) {
        fetchController.removeExercise(id,exerciseDate,exerciseName)
        .then(()=>{
            getEjerciciosCardio(id);
            getEjerciciosFuerza(id);
        })
    }

    function loginUserNuevo(phoneNumber,passwd) {
        fetchController.loginNuevo(phoneNumber,passwd)
        .then((users)=>{
            if (users[0]!=undefined) {
                setUser(users[0]);
                getEjerciciosCardio(users[0].id);
                getEjerciciosFuerza(users[0].id);
                setIndex(users[0].id);
                console.log(users[0].passwd);
            }
            
        });
    }

    function getEjerciciosCardio(id) {
        fetchController.getEjerciciosCardio(id)
        .then(ejerciciosCardio => setEjerciciosCardio(ejerciciosCardio));
    }

    function getEjerciciosFuerza(id) {
        fetchController.getEjerciciosFuerza(id)
            .then(ejerciciosFuerza => setEjerciciosFuerza(ejerciciosFuerza));
    }

    if (index == 0) {
        return (
            <View style={styles.container}>
                <Login onLoginClick={(phoneNumber,passwd) => loginUserNuevo(phoneNumber,passwd)} />
                <StatusBar style="auto" />
            </View>
        );
    } else {
        return (
            <View style={styles.container}>
                <UserLoggedView name={user.nameUser} lastName={user.lastNameUser} phone={user.phoneNumber} id={index} userCardio={ejerciciosCardio} userFuerza={ejerciciosFuerza} refreshCardio={() => getEjerciciosCardio(index)} refreshFuerza={() => getEjerciciosFuerza(index)} onClickDeleteExercise={(id,exerciseName,exerciseDate)=>removeExercise(id,exerciseName,exerciseDate)} onClickLogout={()=>logoutUser()} onClickRemoveUser={()=>removeUser(index)} />
            </View>
        );
    }

}
*/