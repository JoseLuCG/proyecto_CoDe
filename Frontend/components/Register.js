import { TextInput, Text, View, Button } from "react-native";
import { styles } from "../styles/Styles.js";
import { useState } from "react";

export function Register(props) {
    const [nombre, setNombre] = useState("");
    const [apellidos, setApellidos] = useState("");
    const [passwd, setPasswd] = useState("");
    const [phone, setPhone] = useState("");
    return (
        <View style={styles.container}>
            <h1>Registro</h1>
            <Text>Nombre</Text>
            <TextInput onChangeText={(text) => setNombre(text)} style={styles.textinput} />
            <Text>Apellidos</Text>
            <TextInput onChangeText={(text) => setApellidos(text)} style={styles.textinput} />
            <Text>Contraseña</Text>
            <TextInput onChangeText={(text) => setPasswd(text)} style={styles.textinput} />
            <Text>Teléfono</Text>
            <TextInput onChangeText={(text) => setPhone(text)} style={styles.textinput} />
            <Button title="Crear Usuario" onPress={() => props.onClickCrearUsuario(nombre, apellidos, passwd, phone)} />
        </View>
    );
}