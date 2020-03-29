import React, {useState} from 'react';
import { Link, useHistory } from 'react-router-dom'
import {FiArrowLeft} from 'react-icons/fi';
import './styles.css';
import logo from '../../assets/logo.png';
import Api from '../../services/api'

export default function NewIncidents(){
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');
    const ongId = localStorage.getItem('ongId');
    const history = useHistory();
    async function handleNewIncidents(e){
        e.preventDefault();

        const data ={
            title,
            description,
            value,
        };

        try{
            await Api.post('incidents', data,{
                headers:{
                    Authorization: ongId,
                }
            });

            history.push('/profile');
        }catch(err){
            alert('Erro no cadastro, tente novamento.');
        }

    }


    return(
        <div className="new-incidents-container">
            <div className="content">
                <section>
                    <img src={logo} alt="Be The Hero"/>
                    <h1>Cadastro de noticia</h1>
                    <p>Faça o cadastro da notica na platafroma, as informações ficaram disponiveis na mesma.</p>
                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color='#E02041' />
                        voltar para home
                    </Link>
                </section>

                <form onSubmit={handleNewIncidents}>
                    <input 
                    placeholder="Titulo do caso"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    />
                    <textarea 
                    placeholder="Descrição"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    />
                    <input 
                    placeholder="Valor"
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    />
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}