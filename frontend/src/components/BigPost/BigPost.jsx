import React from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import 'moment/locale/es';
import './BigPost.scss';
import { IMAGES_URL } from '../../api-config';
import { Avatar, Divider } from 'antd';
import UsernameBold from '../Profile/UsernameBold/UsernameBold';
import SettingsPost from '../Profile/SettingsPost/SettingsPost';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import { like, unlike } from '../../redux/actions/posts';

const BigPost = props => {
    const isMe = props.myUser?.id === props.post.user.id;
    const isLiked = props.post.likes?.filter(like => like.user_id === props.myUser?.id).length > 0 ? true : false;

    return (
        <div className="big-post-container">
            <img src={IMAGES_URL + props.post.image} alt=""/>
            <div className="modal-body">
                <div>
                    <div className="header-container">
                        <div className="header">
                            <Avatar src={IMAGES_URL + props.post.user.pic}/>
                            <UsernameBold user={props.post.user} />
                        </div>
                        {isMe &&  <div className="icon">
                            <SettingsPost post={props.post} myUser={props.myUser} />
                        </div>}
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
                
                <div className="like-container">
                    <div className="like">
                        <h1>
                            { !isLiked && <HeartOutlined onClick={like.bind(this, props.post.id, props.currentUser?.id)} /> }
                            { isLiked && <HeartFilled onClick={unlike.bind(this, props.post.id, props.currentUser?.id)} style={{color:'rgb(237, 73, 86)'}}/> }
                        </h1>
                        {props.post.likes.length > 0 && 
                            <div style={{fontWeight:'500', color:'black'}}>{props.post.likes.length} Me gusta</div>}
                        {!props.post.likes.length > 0 && 
                            <div style={{color:'black'}}>Sé el primero en
                                <span style={{fontWeight:'500', cursor:'pointer'}} 
                                    onClick={like.bind(this, props.post.id, props.currentUser?.id)}> indicar que te gusta esto</span>
                            </div>}
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = ({user}) => ({ myUser: user.myUser });
export default connect(mapStateToProps)(BigPost);