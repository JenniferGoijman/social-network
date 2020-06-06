import React from 'react';
import { Avatar } from 'antd';
import { IMAGES_URL } from '../../api-config';
import './PostFeed.scss';
import { useHistory } from 'react-router-dom';

const PostFeed = props => {
    const history = useHistory();
    
    const goToUserProfile = (user)=> {
        history.push('/'+ user.username);
    }

    return (
        // {props.post.created_at}           
        <div className="post-feed-container">
            <div className="post">
                <div className="header">
                    <Avatar src={IMAGES_URL + props.post.user.pic}/>
                    <div className="username" onClick={goToUserProfile.bind(this, props.post.user)}>
                        {props.post.user.username}</div>
                </div>
                <div className="body">
                    <img src={IMAGES_URL + props.post.image} />
                </div>

                <div className="description">
                    <div className="username" onClick={goToUserProfile.bind(this, props.post.user)}>
                        {props.post.user.username}</div>
                    <div style={{marginLeft:10}}>{props.post.description}</div>                
                </div>
            </div>
        </div>
    )
}

export default PostFeed;