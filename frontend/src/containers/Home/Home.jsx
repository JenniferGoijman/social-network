import React from 'react';
import LoginComponent from '../../components/Login/LoginComponent';
import Mobiles from '../../img/mobiles.png';
import './Home.scss';

const Home = () => {
    return (
        <div className="home-container">
            <img src={Mobiles} alt="Aplicación de Instagram en móvil"/>
            <div className="login"><LoginComponent></LoginComponent></div>
        </div>
    )
}

export default Home
