import React from 'react';
import renderer from 'react-test-renderer';
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
    return controllers.Login(12345, 1234)
        .then((data) => expect(data[0].id).toBe(0));
});

test('Funciona el GetCardio', () => {
    return controllers.getEjerciciosCardio(7)
        .then(data => {
            expect(data[0].distance).toBe(2)
        })
});

test('Funciona el GetFuerza', () => {
    return controllers.getEjerciciosFuerza(7)
        .then(data => expect(data[0].idUser).toBe(undefined));
});