import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { EllipsisOutlined } from '@ant-design/icons';
import { Modal, List } from 'antd';
import './SettingsPost.scss'
import { deletePost } from '../../../redux/actions/posts';

const SettingsPost = props => {
    const history = useHistory();
    const [visible, setVisible] = useState();
    const showModal = () => { setVisible(true); };
    const hideModal = () => { setVisible(false); };

    const deleteOne = (id) => {
        console.log(id);
        deletePost(id)
        .then(res => {
            console.log(":)");
            history.push('/feed');
        })
        .catch(()=>{
            console.log(":(")
        })  
    }
    
    return (
        <h2>
            <EllipsisOutlined onClick={showModal}/>
            <Modal visible={visible} onOk={hideModal} onCancel={hideModal} footer={null}>
                <List header={null} footer={null} dataSource={[
                    <div className="dataSettings" onClick={deleteOne.bind(this, props.post.id)}>Eliminar publicación</div>,
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