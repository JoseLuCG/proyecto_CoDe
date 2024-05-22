import React from 'react';
import Login from '../components/Login.js';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import * as controllers from '../controllers/fetchController.js'

/*
test('renders correctly', () => {
    const tree = renderer.create(<Login />).toJSON();
    expect(tree).toMatchSnapshot();
});
*/

test('Funciona el Login', () => {
    return controllers.loginNuevo(1234, 12345)
        .then((data) => expect(data[0].id).toBe(13));
});

test('Funciona el GetCardio', () => {
    return controllers.getEjerciciosCardio(13)
        .then(data => {
            expect(data.idUSer).toBe(13)
        })
});

test('Funciona el GetFuerza', () => {
    return controllers.getEjerciciosFuerza(13)
        .then(data => expect(data[0].idUSer).toBe(13));
});