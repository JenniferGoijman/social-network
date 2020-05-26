import React from 'react';
import './Header.scss';
import Logo from '../../img/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faPaperPlane, faCompass, faHeart } from '@fortawesome/free-solid-svg-icons'

const Header = props => {
    return (
        <header>
            <div className="logo">
                <img src={Logo} alt="Logo Instagram"/>
                </div>
            <div>
                <input type="text" name="" id="" placeholder="Busca" className="search" />
            </div>
            <div className="icons">
                <div className="icon">
                    <FontAwesomeIcon icon={faHome} />
                </div>
                <div className="icon">
                    <FontAwesomeIcon icon={faPaperPlane} />
                </div>
                <div className="icon">
                    <FontAwesomeIcon icon={faCompass} />
                    </div>
                <div className="icon">
                    <FontAwesomeIcon icon={faHeart} />
                </div>
            </div>
        </header>
    )
}

export default Header
