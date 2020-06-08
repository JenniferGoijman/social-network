import React from 'react';
import { Avatar } from 'antd';
import { IMAGES_URL } from '../../api-config';
import './PostFeed.scss';
import Moment from 'react-moment';
import 'moment/locale/es';
import UsernameBold from '../Profile/UsernameBold/UsernameBold';
import { HeartOutlined, HeartFilled, CodeSandboxCircleFilled } from '@ant-design/icons';
import { like, unlike } from '../../redux/actions/posts';

const PostFeed = props => {
    const isLiked = props.post.likes?.filter(like => like.user_id === props.myUser?.id).length > 0 ? true : false;
    
    return (
        <div className="post-feed-container">
            <div className="post">
                <div className="header">
                    <Avatar src={IMAGES_URL + props.post.user.pic}/>
                    <UsernameBold user={props.post.user} />
                </div>
                <div className="body">
                    <img src={IMAGES_URL + props.post.image} />
                </div>

                <div className="like">
                    <h1>
                        { !isLiked && <HeartOutlined onClick={like.bind(this, props.post.id, null)} /> }
                        { isLiked && <HeartFilled onClick={unlike.bind(this, props.post.id, null)} style={{color:'rgb(237, 73, 86)'}}/> }
                    </h1>
                    {props.post.likes?.length > 0 && 
                        <div style={{fontWeight:'500', color:'black'}}>{props.post.likes.length} Me gusta</div>}
                    {!props.post.likes?.length > 0 && 
                        <div style={{color:'black'}}>Sé el primero en
                            <span style={{fontWeight:'500', cursor:'pointer'}} 
                                onClick={like.bind(this, props.post.id, null)}> indicar que te gusta esto</span>
                        </div>}
                </div>

                <div className="description">
                    <UsernameBold user={props.post.user} />
                    <div>{props.post.description}</div>                
                </div>

                {props.post.comments?.map(comment => 
                    <div className="description">
                        <UsernameBold user={comment.user} /> 
                        <div>{comment.body}</div>
                    </div>   
                )}                             
                
                <div className="date">
                    <Moment fromNow>{props.post.created_at}</Moment>
                </div>
                
            </div>
        </div>
    )
}

export default PostFeed;