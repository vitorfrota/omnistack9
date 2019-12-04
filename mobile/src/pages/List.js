import React, {useState, useEffect} from 'react';
import socketio from 'socket.io-client';
import { Alert, StyleSheet, Text, Image, ScrollView, View,  AsyncStorage, SafeAreaView, TouchableOpacity } from 'react-native';
import logo from '../assets/logo.png';
import SpotList from '../components/SpotList';

export default function List({navigation}){
    const [techs,setTechs] = useState([]);

    useEffect(()=>{
        AsyncStorage.getItem('user').then(user_id =>{
            const socket = socketio('http://192.168.0.73:3333',{
                query: {user_id}
            })

            socket.on('booking-response', booking =>{
                Alert.alert(`Sua reserva em ${booking.spot.company} em ${booking.date}
                foi ${booking.approved?'APROVADA':'REJEITADA'}`);
            })
        })
    },[]);
    useEffect(()=>{
        AsyncStorage.getItem('techs').then(storagedTechs=>{
            const techsArray = storagedTechs.split(',').map(tech=> tech.trim());
            setTechs(techsArray);
        })
    },[]);

    function handleLogout(){
        AsyncStorage.clear(); // to clear the token 
        navigation.navigate('Login');
    }
    return (
    <SafeAreaView style={styles.container}>
        <View style={styles.topBar}>
        <Image source={logo} style={styles.logo}/>
         <TouchableOpacity style={styles.Logoutbutton} onPress={handleLogout}>
                        <Text style={styles.logoutButtonText}>Sair</Text>
        </TouchableOpacity>
        </View>
        
         <ScrollView>
            {techs.map(tech=>  <SpotList key={tech} tech={tech}/>)}
         </ScrollView>
    </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    topBar:{
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    logo:{
        height: 32,
        resizeMode: 'contain',
        alignSelf: 'center',
        flex:1,
        marginTop: 40
    },
    button:{
        height: 42,
        backgroundColor: '#00b1a2',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5 
    },
    logoutButton:{
        flex:1,
    },
    logoutButtonText:{
        color: '#c1c1c1',
        fontWeight: 'bold',
        fontSize: 16,
        marginRight: 25,
        marginTop: 45
    },
    buttonText:{
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16
    },
 
})
