import React, {useState} from 'react';
import { StyleSheet, Alert, Text, TextInput, AsyncStorage, TouchableOpacity, View } from 'react-native';
import api from '../services/api';

export default function Book({navigation}){
    const [date, setDate] = useState('');


    const id = navigation.getParam('id');

    async function handleSubmit(){
        const user_id = await AsyncStorage.getItem('user');

        await api.post(`/spots/${id}/bookings`,{
            date
        },
        {headers: {user_id}
    })
        Alert.alert("Solicitação de reserva enviada.");
        navigation.navigate('List');
    }
    
    function handleCancel(){
        navigation.navigate('List');
    }
    return (
        <View style={styles.form}>
            <Text style={styles.label}>Data de interesse*</Text>
            <TextInput style={styles.input} placeholder="Qual data você quer reservar?" 
            placeholderTextColor="#999" 
            autoCapitalize="words"
            autoCorrect={false}
            value={date}
            onChangeText = {setDate}
            />
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Solicitar Reserva</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
                <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
        </View>
    )

}

const styles = StyleSheet.create({
    form:{
        alignSelf: 'stretch', // ocupa a largura inteira possivel
        paddingHorizontal: 30,
        marginTop:60,
    
    },

    label: {
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 8,
    },

    input:{
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#444',
        height: 44,
        marginBottom: 20,
        borderRadius: 2

    },
    button:{
        height: 42,
        backgroundColor: '#00b1a2',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    cancelButton:{
        height: 42,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2
    },
    cancelButtonText:{
        color: '#999',
        fontWeight: 'bold',
        fontSize: 16
    },
    buttonText:{
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16
    }
});
