import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import './PersonalInfo.scss';
import { IMAGES_URL } from '../../../api-config';
import { Tooltip } from 'antd';
import { uploadImage, logout, getFollowers, getFollowings } from '../../../redux/actions/users';
import { SettingOutlined } from '@ant-design/icons';

const PersonalInfo = props => {
    const [user, setUser] = useState(props.user);
    const [followers, setFollowers] = useState(props.followers);
    const [followings, setFollowings] = useState(props.followings);

    useEffect(() => { 
        getFollowers(user?.id); 
        getFollowings(user?.id);
    }, []);
    
    const fileSelectedHandler = event => {
        setUser(user.pic = event.target.files[0].name);
        const fd = new FormData();        
        fd.append("image", event.target.files[0], user.pic);
        uploadImage(user.id, fd)
        .then((res) => { console.log(":)") })
          .catch(() => { console.log(":(") });
        // TODO: que refresque la imagen al modificar el user.pic // con F5 funciona
    }

    const disconnect = () => {
        logout()
        .then((res) => { 
            setTimeout(() => {
                window.location.pathname='/' //tira error
            }, 1500);
        })
        .catch(() => { 
            console.log(":("); //poner mensaje de error 
        });
    }
   
    return (
        <div className="profile">
            <div className="photo">
                <label htmlFor='single'>
                    <Tooltip title="Cambiar foto de perfil">
                        <img src={IMAGES_URL + user?.pic} alt="Foto de perfil"/>
                    </Tooltip>
                </label>
                <input type="file" id='single' onChange={fileSelectedHandler} />
            </div>
            
            <div className="info">
                <div className="name">
                    <h1>{user?.username}</h1>
                    <h2><SettingOutlined onClick={disconnect} /></h2>
                </div>

                <div className="datas">
                    <div className="data"><span className="bold">0</span> publicaciones</div>
                    <div className="data"><span className="bold">{followers.length}</span> seguidores</div>
                    <div className="data"><span className="bold">{followings.length}</span> seguidos</div>                
                </div><br />
                <div className="bold">{user?.name}</div>
                <div className="description">{user?.description}</div>
            </div>
        </div>
        
    )
}

const mapStateToProps = ({user, followers, followings}) => ({ user: user.user, followers: user.followers, followings: user.followings });
export default connect(mapStateToProps)(PersonalInfo);