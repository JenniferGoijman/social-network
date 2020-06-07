import React from 'react';
import { connect } from 'react-redux';
import { useMediaPredicate } from 'react-media-hook';
import { useLocation, useHistory } from 'react-router-dom';
import './Header.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faPaperPlane, faSearch, faPlusSquare, faHeart } from '@fortawesome/free-solid-svg-icons'
import { IMAGES_URL } from '../../api-config';

import Logo from '../../img/logo.png';
import Search from '../Search/Search';

const Header = props => {
    const biggerThan415 = useMediaPredicate("(min-width: 415px)");
    const location = useLocation();
    const history = useHistory();

    const showFeed = () => {
        history.push('/feed');
    }

    const search = () => {
        history.push('/search');
    }

    const newPost = () => {
        history.push('/create');
    }

    const myProfile = () => {
        history.push('/'+ props.myUser.username);
    }  

    const routesWithoutHeader =['/register','/login','/', '/accounts/password/reset']
    if(routesWithoutHeader.includes(location.pathname)) return '';
    
    return (
        <header>
            <div className="logo">
                <img src={Logo} alt="Logo Instagram" onClick={showFeed}/>
            </div>
            {biggerThan415 && <div>
               <Search placeholder="Busca" style={{ width: 200 }}></Search>
            </div>}
            <div className="icons">
                <div className="icon">
                    <FontAwesomeIcon icon={faHome} onClick={showFeed} />
                </div>
                {biggerThan415 && <div className="icon">
                    <FontAwesomeIcon icon={faPaperPlane} />
                </div>}
                {!biggerThan415 && <div className="icon">
                    <FontAwesomeIcon icon={faSearch} onClick={search} />
                </div>}
                <div className="icon">
                    <FontAwesomeIcon icon={faPlusSquare} onClick={newPost}/>
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
