import React, {useState, useMemo} from 'react';
import { Link } from 'react-router-dom'; 
import api from '../../services/api';
import camera from '../../assets/camera.svg';
import arrow from '../../assets/arrow-left.svg';
import './styles.css';

export default function New({history}){
    const [company, setCompany] = useState('');
    const [techs, setTechs] = useState('');
    const [price, setPrice] = useState('');
    const [thumbnail, setThumbnail] = useState('');
    const preview = useMemo(()=> {return thumbnail ? URL.createObjectURL(thumbnail):null},[thumbnail]); // para exibir preview da imagem no form
    
    async function handleSubmit(e){
        e.preventDefault();
        const data = new FormData();
        const user_id = localStorage.getItem('user');
        data.append('thumbnail',thumbnail);
        data.append('company',company);
        data.append('techs',techs);
        data.append('price',price);

        await api.post('/spots', data, {
            headers: {user_id}
        });
        history.push('/dashboard');
    }
    return (
      <>
        <Link to="/Dashboard"  style={{ textDecoration: 'none' }}><p className="btn-back"><img src={arrow}></img> Voltar para os meus Spots</p></Link>
        <form onSubmit={handleSubmit}>
            <label htmlFor="company">Empresa:</label>
            <input type="text" id="company" placeholder="Diga-nos o nome de sua empresa" value={company}autoComplete="off"onChange={event => setCompany(event.target.value)}required/>
            <label htmlFor="company">Tecnologias:<span> (Separadas por vírgula)</span></label>
            <input type="text" id="techs"value={techs} placeholder="Quais tecnologias vocês usam?" autoComplete="off" onChange={event => setTechs(event.target.value)} required/>
            <label htmlFor="company">Valor da diária:<span> (Deixe em branco se for <strong>gratuito</strong>)</span></label>
            <input type="text" id="price" value={price} placeholder="Qual o valor da diária?" autoComplete="off" onChange={event=>setPrice( event.target.value)}/>
            <label htmlFor="thumbnail">Fotografia do spot:</label>
            <label id="thumbnail" style={{backgroundImage: `url(${preview})`}}className={thumbnail?'has-thumbnail':''}>
                <input type="file" onChange={event=>setThumbnail(event.target.files[0])}/>
                <img src={camera} alt="select img"/>
            </label>
            <button className="btn">Cadastrar</button>
        </form>
        </>
    )
}