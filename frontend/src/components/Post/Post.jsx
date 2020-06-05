import React from 'react';
import { Comment, Avatar, Form, Input } from 'antd';
import { IMAGES_URL } from '../../api-config';
import './Post.scss';

const Post = props => {
    console.log(props);
    const { TextArea } = Input;

    return (
        // {props.post.created_at}           
        <div className="post-container">
            <div className="post">
                <div className="header">
                    <Avatar src={IMAGES_URL + props.post.user.pic}/>
                    <div style={{color:"black",fontWeight:"500", marginLeft:10}}>{props.post.user.username}</div>
                </div>
                <div className="body">
                    <img src={IMAGES_URL + props.post.image} />
                </div>

                <div className="description">
                    <div style={{color:"black",fontWeight:"500"}}>{props.post.user.username}</div>
                    <div style={{marginLeft:10}}>{props.post.description}</div>                
                </div>
            </div>
        </div>
    )
}

export default Post;