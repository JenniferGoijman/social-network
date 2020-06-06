import React from 'react';
import Moment from 'react-moment';
import 'moment/locale/es';
import './BigPost.scss';
import { IMAGES_URL } from '../../api-config';
import { Avatar } from 'antd';
import UsernameBold from '../Profile/UsernameBold/UsernameBold';
import SettingsPost from '../Profile/SettingsPost/SettingsPost';

const BigPost = props => {

    return (
        <div className="big-post-container">
            <img src={IMAGES_URL + props.post.image} alt=""/>
            <div className="modal-body">
                <div className="header-container">
                    <div className="header">
                        <Avatar src={IMAGES_URL + props.post.user.pic}/>
                        <UsernameBold user={props.post.user} />
                    </div>
                    <div className="icon">
                        <SettingsPost />
                    </div>
                </div>
                    <div className="comments">
                        <Avatar src={IMAGES_URL + props.post.user.pic}/>
                        <div className="userDate">
                            <UsernameBold user={props.post.user} />
                            <div className="datePost">
                                <Moment fromNow style={{fontSize:'small'}}>{props.post.created_at}</Moment>
                            </div>  
                        </div>
                </div>
                
            </div>
        </div>
    )
}

export default BigPost;