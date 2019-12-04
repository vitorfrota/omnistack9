import React, {useState, useEffect} from 'react';
import { Link, useParams } from 'react-router-dom'; 
import api from '../../services/api';
import camera from '../../assets/camera.svg';
import arrow from '../../assets/arrow-left.svg';
import './styles.css';

export default function Spot(){

    let { spot_id } = useParams();

    const [spot,setSpot] = useState({});
    useEffect(() =>{ // hook para capturar dados do spot
        async function loadSpot(){
            const response = await api.get(`spots/${spot_id}/show`, {});
            setSpot(response.data);
            console.log(response.data);
        }
        loadSpot();
        
    }, []);
    const teste = [];
    return (
      <>
        <Link to="/Dashboard"  style={{ textDecoration: 'none' }}>
            <p className="btn-back"><img src={arrow}></img> Voltar para os meus Spots</p>
        </Link>
        <label id="thumb" className="has-thumbnail" style={{backgroundImage: `url(${spot.thumbnail_url})`}}>
            <input type="file"/>
            <img src={camera} alt="select img"/>
        </label>
        <strong className="company-title">{spot.company}</strong>
        <span className="price-span">{spot.price? `R$${spot.price}/dia`: 'Gratuito'}</span>
        <ul className="techs-list">
            {
                teste.map(item => <li>{item}</li>)
            }
        </ul>
        </>
        )
}