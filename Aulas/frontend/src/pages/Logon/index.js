import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom'
import {FiLogIn} from 'react-icons/fi';
import './styles.css';
import logo from '../../assets/logo.png';

import api from '../../services/api';

export default function Logon(){
    const [id,setId] = useState('');

    const history = useHistory();
    async function handleLogin(e){
        e.preventDefault();

        try{
            const response = await api.post('sessions', { id });

            localStorage.setItem('ongId',id);
            localStorage.setItem('ongName',response.data.name);

            history.push('/profile');
        }catch(err){
            alert('Falha no login, tente novamento.');
        }

    }

    return(
        <div className="logon-container">
            <div className="content">
                <section className="form">
                   
                    <form onSubmit={handleLogin}>
                        <center> <h1>Faça seu Login</h1> </center> 
                        <input 
                        placeholder="Digite seu e-mail"
                        value={id}
                        onChange={e =>setId(e.target.value)}
                        />
                        <button className="button" type="submit">Entrar</button>
                        *Acesso restrito
                        <Link className="back-link" to="/register">
                            <FiLogIn size={16} color='#E02041' />
                            Não tenho cadastro
                        </Link>
                    </form>
                </section>

                <img src={logo} alt="PET-SI"/>
            </div>
      </div>
    )

}