import React from 'react';
import { connect } from 'react-redux';
import './Header.scss';
import Logo from '../../img/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faPaperPlane, faCompass, faHeart } from '@fortawesome/free-solid-svg-icons'
import { IMAGES_URL } from '../../api-config';
import Search from '../Search/Search';
import { useMediaPredicate } from 'react-media-hook';

const Header = props => {
    const biggerThan415 = useMediaPredicate("(min-width: 415px)");

    const myProfile = () => {
        window.location.pathname='/'+ props.myUser.username;
    }
    
    return (
        <header>
            <div className="logo">
                <img src={Logo} alt="Logo Instagram"/>
            </div>
            {biggerThan415 && <div>
               <Search placeholder="Busca" style={{ width: 200 }}></Search>
            </div>}
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
                <div className="icon">
                    {props.myUser && <img src={IMAGES_URL + props.myUser?.pic} alt="Foto de perfil"
                        onClick={myProfile} />}
                </div>
            </div>
        </header>
    )
}

const mapStateToProps = ({user}) => ({ myUser: user.myUser });
export default connect(mapStateToProps)(Header);
