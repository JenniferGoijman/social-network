import React, { useState } from 'react';
import { SettingOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import { List } from 'antd';
import './Settings.scss'
import { logout } from '../../../redux/actions/users';
import { useHistory } from 'react-router-dom';

const Settings = () => {
    const [visible, setVisible] = useState();
    const history = useHistory();
    const showModal = () => { setVisible(true); };
    const hideModal = () => { setVisible(false); };

    const disconnect = () => {
        logout()
        .then((res) => { history.push('/'); })
        .catch(() => { console.log(":("); }); //poner mensaje de error 
        hideModal();
    }

    const changePass = event =>{
        console.log("cambiar", event.target);
        // TODO
    }
    
    return (
        <h2>
            <SettingOutlined onClick={showModal} />
            <Modal visible={visible} onOk={hideModal} onCancel={hideModal} footer={null}>
                <div className="list">
                    <div className="dataSettings holi" onClick={changePass}>Cambiar contraseña</div>
                    <div className="dataSettings b" onClick={disconnect}>Cerrar sesión</div>
                    <div className="dataSettings c" onClick={hideModal}>Cancelar</div>
                </div>
            </Modal>
            {/* <Modal visible={visible} onOk={hideModal} onCancel={hideModal} footer={null}>
                <List header={null} footer={null} bordered dataSource={[
                    <div className="data" onClick={changePass}>Cambiar contraseña</div>,
                    <div className="data" onClick={disconnect}>Cerrar sesión</div>,
                    <div className="data" onClick={hideModal}>Cancelar</div>
                ]} 
                    renderItem={item => (
                        <List.Item>                            
                            {item}
                        </List.Item>
                    )}
                />
            </Modal> */}
        </h2>
    )
}

export default Settings;