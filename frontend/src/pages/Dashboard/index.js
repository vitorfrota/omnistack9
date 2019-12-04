import React, {useEffect, useState, useMemo} from 'react';
import Skeleton from 'react-loading-skeleton';
import { Link } from 'react-router-dom'; // serve para criar links para outras rotas
import socketio from 'socket.io-client';
import api from '../../services/api';
import './styles.css';
export default function Dashboard(){
    const [spots,setSpots] = useState([]);
    const [requests, setRequests] = useState([]);
    
    const user_id = localStorage.getItem('user');
    const socket = useMemo(()=>socketio('http://localhost:3333',{
        query: {user_id}
    }), [user_id]);
    
    useEffect(()=>{ // hook para exibir notificação
        socket.on('booking-request', data =>{
            setRequests([...requests, data]);
        });

    },[requests]);

    useEffect(() =>{ // hook para listar os spots cadastrados
        async function loadSpots(){
            const user_id = localStorage.getItem('user');
            const response = await api.get('/dashboard', {
                headers: {user_id}
            });
            setSpots(response.data);
        }
        loadSpots();
    }, []);

    async function handleAccept(id){
        await api.post(`/bookings/${id}/approvals`);

        setRequests(requests.filter(request=> request._id !== id));
    }

    async function handleReject(id){
        await api.post(`/bookings/${id}/rejections`);

        setRequests(requests.filter(request=> request._id !== id));
    }

    return (
        <>
        <ul className="notifications">
            {requests.map(request=>(
                <li key={request._id}>
                    <p>
                        <strong>{request.user.email}</strong> está solicitando uma reserva
                         em <strong>{request.spot.company} </strong>  
                         para a data <strong>{request.date}</strong>
                    </p>
                    <button className="accept" onClick={()=>handleAccept(request._id)}>ACEITAR</button>
                    <button className="reject" onClick={()=>handleReject(request._id)}>REJEITAR</button>
                </li>
            ))}
        </ul>    
            {(spots.length ===0)?<h2 className="hasSpot">Nenhum spot cadastrado</h2>:''}
            <ul className="spot-list">
                {
                spots.map(spot =>(
                    <Link to={`/spot/${spot._id}`} style={{ textDecoration: 'none' }}>
                        <li key={spot._id}>
                        <header style={{backgroundImage: `url(${spot.thumbnail_url})`}}></header>
                        <strong>{spot.company  || <Skeleton/> }</strong>
                        <span>{spot.price? `R$${spot.price}/dia`: 'Gratuito' || <Skeleton/>}</span>
                    </li></Link>
                ))}
            </ul>
            <Link to="/new"><button className="btn">Cadastrar novo Spot</button></Link>  
        </>
    )
}