import React, {useState} from 'react';

import api from '../../services/api';

export default function Login({history}){
    const [email, setEmail] = useState('');

    async function handleSubmit(e){
        e.preventDefault(); // PREVINE Q FORMULÁRIO DÊ REFRESH
        const response = await api.post('/sessions',{email});
        const { _id } = response.data;
        localStorage.setItem('user', _id);
        history.push('/dashboard'); // direciona para outra página
    }
    return (
        <>
            <p>Ofereça <strong>spots</strong> para programadores e encontre <strong>talentos</strong> para sua empresa</p>
            <form onSubmit={handleSubmit}>
              <label htmlFor="email">E-mail:</label>
              <input 
              type="email" 
              id="email" 
              onChange ={event => setEmail(event.target.value)}
              placeholder="Seu melhor email..." autoComplete="off" required/>
              <button className='btn' type="submit">Entrar</button>
            </form>
        </>
        )
}