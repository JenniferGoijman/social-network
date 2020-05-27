import React from 'react';
import LoginComponent from '../../components/Login/LoginComponent';
import Mobiles from '../../img/mobiles.png';
import './Home.scss';
import { useMediaPredicate } from 'react-media-hook';

const Home = () => {
    const biggerThan400 = useMediaPredicate("(min-width: 400px)");

    return (
        <div className="home-container">
             {biggerThan400 && <img src={Mobiles} alt="Aplicación de Instagram en móvil"/>}
            <div className="login"><LoginComponent></LoginComponent></div>
        </div>
    )
}

export default Home
