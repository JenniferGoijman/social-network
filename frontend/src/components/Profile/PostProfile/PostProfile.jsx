import React, { useState } from 'react';
import { IMAGES_URL } from '../../../api-config';
import { Modal } from 'antd';
import './PostProfile.scss';
import { useMediaPredicate } from 'react-media-hook';
import { useHistory } from 'react-router-dom';

import BigPost from '../../BigPost/BigPost';
import { getPostById } from '../../../redux/actions/posts';

const PostProfile = props => {
    const [visible, setVisible] = useState();
    const showModal = () => { setVisible(true); };
    const hideModal = () => { setVisible(false); };
    const biggerThan415 = useMediaPredicate("(min-width: 415px)");
    const history = useHistory();

    const goToPostsMobile = post_id => {
        getPostById(post_id);
        history.push('/posts/'+ props.post.user.username + '/'+ post_id);
    }

    return (           
        <div className="post-profile-container">
            <div className="post">
                <img src={IMAGES_URL + props.post.image} alt="Publicación"
                    onClick={biggerThan415?showModal:goToPostsMobile.bind(this, props.post.id)} />
            </div>
            <Modal visible={visible} onOk={hideModal} onCancel={hideModal} footer={null} className="post-profile"
                style={{ display:'inline-flex', justifyContent:'center', alignItems:'center', height:'100vh' }} centered >
                <BigPost visible={visible} onOk={hideModal} onCancel={hideModal} footer={null} 
                    post={props.post} currentUser={props.currentUser} />
            </Modal>
        </div>
    )
}

export default PostProfile;