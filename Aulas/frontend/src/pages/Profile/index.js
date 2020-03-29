import React, {useState ,useEffect} from 'react';
import LogoImg from '../../assets/logo.png';
import Sippa from '../../assets/sippa.png';
import {Link, useHistory} from 'react-router-dom';
import {FiPower, FiTrash2} from 'react-icons/fi';
import api from '../../services/api';
import './styles.css';

export default function Profile(){
    const [incidents, setIncidents ] = useState([]);
    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');
    const history = useHistory();
    useEffect(()=>{
        api.get('profile', {
            headers:{
                Authorization: ongId,
            }
        }).then(response =>{
            setIncidents(response.data);
        })
    },[ongId])

    async function handleDeleteIncident(id){
        try{
            await api.delete(`incidents/${id}`,  {
                headers:{
                    Authorization: ongId,
                }
            });
            setIncidents(incidents.filter(incident => incident.id !== id));
        }catch(err){
            alert("Erro, tente novamente.");
        }
    }

    async function handleLogout(){
        localStorage.clear();

        history.push('/');

    }
    return(
        <div>
            <div className="menu">
                <ul> 
                    <img src={LogoImg} alt="Be The Hero"/>
                    <li>
                        <a onClick={handleLogout} type="button">
                            <FiPower size={18} color="#E02041"/>
                        </a>
                    </li>
                    <li><Link to="incidents/new">Cadastrar nova informação</Link></li>
                    <li><a class="active" href="#home">Home</a></li>
                    <li><a href="#news">News</a></li>
                    <li><a href="#contact">Contact</a></li>
                    <li><a href="#about">About</a></li>
                </ul>
            </div>
            <div className="profile-container">
            <header>
               
                <span>Bem- vindo, {ongName}</span>
                
            </header>
            <h1>Infomações Cadastradas</h1>

            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>Caso:</strong>
                        <p>{incident.title}</p>

                        <strong>Descriçaão:</strong>
                        <p>{incident.description}</p>

                        <strong>Valor:</strong>
                        <p>{Intl.NumberFormat('pt-BR',{style: 'currency' , currency:'BRL'}).format(incident.value)}</p>

                        <button onClick={() => handleDeleteIncident(incident.id)} type="button">
                            <FiTrash2 size={20} color="#a8a8a3"/>
                        </button>
                </li>
                ))}
            </ul>
        </div>

        <div className="nav-bar">    
        <table>
            <tr>
                <td>
                    <a href="https://www.w3schools.com">
                        <div className="circulo">
                            <img src={Sippa} alt="SIPPA"/>
                        </div>
                    </a>
                </td>
                <td>
                    <a href="https://www.w3schools.com">
                        <div className="circulo">
                            <img src={Sippa} alt="SIPPA"/>
                        </div>
                    </a>
                </td>
                <td> 
                    <a href="https://www.w3schools.com">
                        <div className="circulo">
                            <img src={Sippa} alt="SIPPA"/>
                        </div>
                    </a>
                </td>
                <td>
                    <a href="https://www.w3schools.com">
                        <div className="circulo">
                            <img src={Sippa} alt="SIPPA"/>
                        </div>
                    </a>
                </td>
                <td> 
                    <a href="https://www.w3schools.com">
                        <div className="circulo">
                            <img src={Sippa} alt="SIPPA"/>
                        </div>
                    </a>
                </td>
            </tr>
        </table>
        </div>

        <div class="footer">
            Copyright &copy; 2020 Pet-SI
        </div>
        
        </div>
        
        
    );
}