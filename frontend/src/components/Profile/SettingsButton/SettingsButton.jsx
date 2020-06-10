import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { SettingOutlined } from '@ant-design/icons';
import { Modal, List } from 'antd';
import './SettingsButton.scss'
import { logout } from '../../../redux/actions/users';

const SettingsButton = () => {
    const [visible, setVisible] = useState();
    const history = useHistory();
    const showModal = () => { setVisible(true); };
    const hideModal = () => { setVisible(false); };

    const disconnect = () => {
        logout()
        .then(res => history.push('/'))
        hideModal();
    }

    const changePass = event =>{
        history.push('/accounts/password/reset');
    }
    
    return (
        <h2>
            <SettingOutlined onClick={showModal} />
            <Modal visible={visible} onOk={hideModal} onCancel={hideModal} footer={null} className="settings-button">
                <List header={null} footer={null} dataSource={[
                    <div className="dataSettings" onClick={changePass}>Cambiar contraseña</div>,
                    <div className="dataSettings" onClick={disconnect}>Cerrar sesión</div>,
                    <div className="dataSettings" onClick={hideModal}>Cancelar</div>
                ]} 
                    renderItem={item => (
                        <List.Item>                            
                            {item}
                        </List.Item>
                    )}
                />
            </Modal>
        </h2>
    )
}

export default SettingsButton;