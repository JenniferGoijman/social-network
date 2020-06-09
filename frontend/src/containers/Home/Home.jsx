import React from 'react';
import LoginComponent from '../../components/Login/LoginComponent';
import Mobiles from '../../img/mobiles.png';
import './Home.scss';
import { useMediaPredicate } from 'react-media-hook';

const Home = () => {
    const biggerThan415 = useMediaPredicate("(min-width: 415px)");

    return (
        <div className="home-container">
             {biggerThan415 && <img src={Mobiles} alt="Aplicación de Jennstagram en móvil"/>}
            <div className="login"><LoginComponent></LoginComponent></div>
        </div>
    )
}

export default Home
