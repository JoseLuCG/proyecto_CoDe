import { TextInput, Text, View, Button } from "react-native";
import { styles } from "../styles/Styles.js";

export function Register(props) {
    return (
        <View style={styles.container}>
            <h1>Registro</h1>
            <Text>Nombre</Text>
            <TextInput style={styles.textinput} />
            <Text>Apellidos</Text>
            <TextInput style={styles.textinput} />
            <Text>Contraseña</Text>
            <TextInput style={styles.textinput} />
            <Text>Teléfono</Text>
            <TextInput style={styles.textinput} />
            <Button title="Crear Usuario" onPress={() => props.onClickCrearUsuario()} />
        </View>
    );
}