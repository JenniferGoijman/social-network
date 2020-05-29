import React, {useState} from 'react';
import { connect } from 'react-redux';
import './Profile.scss';
import { IMAGES_URL } from '../../api-config';
import { Tooltip, Button } from 'antd';
import { uploadImage, logout } from '../../redux/actions/users';
import { SettingOutlined } from '@ant-design/icons'

const Profile = ({ user }) => {
    const [selectedFile, setSelectedFile] = useState(user?.pic);
    
    const fileSelectedHandler = event => {
        setSelectedFile(event.target.files[0]);
        const fd = new FormData();
        //fd.append("image", selectedFile, selectedFile.name);
        fd.append("image", event.target.files[0], event.target.files[0].name);
        uploadImage(user.id, fd)
        .then((res) => { console.log(":)") })
          .catch(() => { console.log(":(") });
        // TODO: que refresque la imagen al modificar el user.pic // con F5 funciona
    }

    const disconnect = () => {
        logout()
        .then((res) => { 
            //redirigir al login 
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
                        <img src={IMAGES_URL + selectedFile} alt="Foto de perfil"/>
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
                    <div className="data">0 publicaciones</div>
                    <div className="data">0 seguidores</div>
                    <div className="data">0 seguidos</div>                
                </div>
                <div>{user?.name}</div>
            </div>
        </div>
        
    )
}

const mapStateToProps = ({user}) => ({ user: user.user });
export default connect(mapStateToProps)(Profile);