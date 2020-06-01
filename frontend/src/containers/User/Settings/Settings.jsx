import React from 'react';
import { connect } from 'react-redux';
import { IMAGES_URL } from '../../../api-config';
import './Settings.scss'
import { Input, Button } from 'antd';

const Settings = props => {
    const { TextArea } = Input;

    return (
        <div className="settings-container">
            <div className="settings-items-container">
                <div className="settings-item-name">
                    <div className="left">
                        <img src={IMAGES_URL + props.myUser.pic} alt="Foto de perfil" />
                    </div>
                    <div className="name">
                        <h2>{props.myUser.username}</h2>
                        <h4><a href="#">Cambiar foto de perfil</a></h4>
                    </div>
                </div>
                <div className="settings-item">
                    <div className="left">Nombre</div>
                    <Input placeholder="Nombre" />
                </div>
                <div className="settings-item">
                    <div className="left">Nombre de usuario</div>
                    <Input placeholder="Nombre de usuario" />
                </div>
                <div className="settings-item">
                    <div className="left">Sitio web</div>
                    <Input placeholder="Sitio web" />
                </div>
                <div className="settings-item">
                    <div className="left">Biografía</div>
                    <TextArea rows={4} />
                </div>
                <div className="settings-item">
                    <div className="left">Correo electrónico</div>
                    <Input placeholder="Correo electrónico" />
                </div>
                <div className="settings-item">
                    <div className="left">Número de teléfono</div>
                    <Input placeholder="Número de teléfono" />
                </div>
                <div className="settings-item">
                    <div className="left"></div>
                    <div className="name">
                        <Button type="primary" htmlType="submit">Enviar</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = ({user}) => ({ myUser: user.myUser });
export default connect(mapStateToProps)(Settings);