import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, Alert, TextInput, AsyncStorage, Image, TouchableOpacity, View, KeyboardAvoidingView } from 'react-native';

import logo from '../assets/logo.png';
import api from '../services/api';


export default function Login({navigation}){
    const [email,setEmail] = useState('');
    const [techs,setTechs] = useState('');

    useEffect(()=>{
        AsyncStorage.getItem('user').then(user =>{
            if(user){
                navigation.navigate('List');
            }
        })
    },[])

    async function handleSubmit(){
        const response = await api.post('/sessions',{
            email
        })
        const { _id } = response.data;

        await AsyncStorage.setItem('user', _id);
        await AsyncStorage.setItem('techs', techs);
        navigation.navigate('List'); // redireciona p outra pagina
    }

    return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}> 
       <Image source={logo}/>
        <View style={styles.form}>
            <Text style={styles.label}>Seu e-mail*</Text>
            <TextInput style={styles.input} placeholder="Seu e-mail" 
            placeholderTextColor="#999" 
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            value={email}
            onChangeText = {setEmail}
            />
            <Text style={styles.label}>Tecnologias*</Text>
            <TextInput style={styles.input} placeholder="Tecnologias de interesse" 
            placeholderTextColor="#999" 
            autoCapitalize="words"
            autoCorrect={false}
            value={techs}
            onChangeText = {setTechs}
            />

            <TouchableOpacity onPress={()=>{(email === '')?Alert.alert('Faltou informar o e-mail'):handleSubmit()}} style={styles.button}>
                <Text style={styles.buttonText}>Encontrar Spots</Text>
            </TouchableOpacity>
        </View>
    </KeyboardAvoidingView>

    )}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    form:{
        alignSelf: 'stretch', // ocupa a largura inteira possivel
        paddingHorizontal: 30,
        marginTop:30,
    
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
        borderRadius: 5

    },
    button:{
        height: 42,
        backgroundColor: '#00b1a2',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    buttonText:{
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16
    }
})

