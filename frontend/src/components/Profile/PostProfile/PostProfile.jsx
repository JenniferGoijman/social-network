import React, { useState } from 'react';
import { IMAGES_URL } from '../../../api-config';
import { Modal } from 'antd';
import './PostProfile.scss';

import BigPost from '../../BigPost/BigPost';


const PostProfile = props => {
    console.log(props);
    const [visible, setVisible] = useState();
    const showModal = () => { setVisible(true); };
    const hideModal = () => { setVisible(false); };

    return (           
        <div className="post-profile-container">
            <div className="post">
                <div className="body">
                    <img src={IMAGES_URL + props.post.image} onClick={showModal}/>
                </div>
            </div>
            <Modal visible={visible} onOk={hideModal} onCancel={hideModal} footer={null} className="post-profile"
                style={{ display:'inline-flex', justifyContent:'center', alignItems:'center', height:'100vh' }} centered >
                <BigPost visible={visible} onOk={hideModal} onCancel={hideModal} footer={null} post={props.post} />
            </Modal>
        </div>
    )
}

export default PostProfile;