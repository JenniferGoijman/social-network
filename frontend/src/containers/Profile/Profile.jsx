import React from 'react';
import './Profile.scss'

const Profile = props => {
    return (
        <div className="profile">
            <div className="photo">
                <img src="https://yeux.com.mx/ColumnaUniversitaria/wp-content/uploads/2015/01/lctrtmd.jpg" alt="Foto de perfil"/>
            </div>
            <div className="info">
                <div><h1>juanperez</h1></div>
                <div className="datas">
                    <div className="data">0 publicaciones</div>
                    <div className="data">0 seguidores</div>
                    <div className="data">0 seguidos</div>                
                </div>
                <div>
                    Juan Perez
                </div>
            </div>
        </div>
        
    )
}

export default Profile
