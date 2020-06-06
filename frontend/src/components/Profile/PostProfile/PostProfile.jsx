import React from 'react';
// import { Comment, Avatar, Form, Input } from 'antd';
import { IMAGES_URL } from '../../../api-config';
import './PostProfile.scss';

const PostProfile = props => {
    console.log(props);

    return (
        // {props.post.created_at}           
        <div className="post-profile-container">
            <div className="post">
                <div className="body">
                    <img src={IMAGES_URL + props.post.image} />
                </div>
            </div>
        </div>
    )
}

export default PostProfile;