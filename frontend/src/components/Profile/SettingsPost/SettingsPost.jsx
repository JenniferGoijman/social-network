import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { EllipsisOutlined } from '@ant-design/icons';
import { Modal, List } from 'antd';
import './SettingsPost.scss'
//import { logout } from '../../../redux/actions/users';

const SettingsPost = () => {
    const [visible, setVisible] = useState();
    const history = useHistory();
    const showModal = () => { setVisible(true); };
    const hideModal = () => { setVisible(false); };

    const deletePost = () => {
        // logout();
        // history.push('/');
        hideModal();
    }
    
    return (
        <h2>
            <EllipsisOutlined onClick={showModal}/>
            <Modal visible={visible} onOk={hideModal} onCancel={hideModal} footer={null}>
                <List header={null} footer={null} dataSource={[
                    <div className="dataSettings" onClick={deletePost}>Eliminar publicación</div>,
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

export default SettingsPost;