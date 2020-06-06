import React from 'react';
import { Avatar } from 'antd';
import { IMAGES_URL } from '../../api-config';
import './PostFeed.scss';
import Moment from 'react-moment';
import 'moment/locale/es';
import UsernameBold from '../UsernameBold/UsernameBold';

const PostFeed = ({post}) => {

    return (
        <div className="post-feed-container">
            <div className="post">
                <div className="header">
                    <Avatar src={IMAGES_URL + post.user.pic}/>
                    <UsernameBold user={post.user} />
                </div>
                <div className="body">
                    <img src={IMAGES_URL + post.image} />
                </div>

                <div className="description">
                    <UsernameBold user={post.user} />
                    <div>{post.description}</div>                
                </div>
                
                <div className="date">
                    <Moment fromNow>{post.created_at}</Moment>
                </div>
                
            </div>
        </div>
    )
}

export default PostFeed;