import React from 'react';
import { connect } from 'react-redux';
import './Profile.scss';
import { IMAGES_URL } from '../../api-config';

const Profile = ({ user }) => {
    return (
        <div className="profile">
            <div className="photo">
                <img src={IMAGES_URL + user.pic} alt="Foto de perfil"/>
            </div>
            <div className="info">
                <div><h1>{user.username}</h1></div>
                <div className="datas">
                    <div className="data">0 publicaciones</div>
                    <div className="data">0 seguidores</div>
                    <div className="data">0 seguidos</div>                
                </div>
                <div>{user.name}</div>
            </div>
        </div>
        
    )
}

const mapStateToProps = ({user}) => ({ user: user.user });
export default connect(mapStateToProps)(Profile);