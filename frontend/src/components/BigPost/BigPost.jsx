import React, { useState } from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import 'moment/locale/es';
import './BigPost.scss';
import { IMAGES_URL } from '../../api-config';
import { Form, Button, Input } from 'antd';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import { like, unlike, insertComment } from '../../redux/actions/posts';

import UsernameBold from '../Profile/UsernameBold/UsernameBold';
import SettingsPost from '../Profile/SettingsPost/SettingsPost';
import ShowLikes from '../ShowLikes/ShowLikes';

const { TextArea } = Input;

const BigPost = props => {
    const [value, setValue] = useState();
    const [loading, setLoading] = useState(false);
    const itsMe = props.myUser?.id === props.post.user.id;
    const isLiked = props.post.likes?.filter(like => like.user_id === props.myUser?.id).length > 0 ? true : false;
    
    const toUpperCaseFilter = (d) => {
        return d.toUpperCase();
    };

    const onSubmit = post_id => {
        if (!value) {
            return;
        }
        setLoading(true);
        const comment = {"post_id": post_id, "body":value}
        insertComment(comment, props.currentUser.id);

        setLoading(false);
        setValue();
    }

    const onChange = e => {
        setValue(e.target.value);
    }

    return (
        <div className="big-post-container">
            <img src={IMAGES_URL + props.post.image} alt=""/>
            <div className="modal-body">
                <div>
                    <div className="header-container">
                        <div className="header">
                            <img src={IMAGES_URL + props.post.user.pic} alt="Foto de perfil" className="imgAvatar" />
                            <UsernameBold user={props.post.user} />
                        </div>
                        {itsMe &&  <div className="icon">
                            <SettingsPost post={props.post} myUser={props.myUser} />
                        </div>}
                    </div>

                    <div className="comments">
                        <img src={IMAGES_URL + props.post.user.pic} alt="Foto de perfil" className="imgAvatar" />
                        <div className="userDate">
                            <div style={{display:'flex', alignItems:'baseline'}}>
                                <UsernameBold user={props.post.user} />
                                <div style={{fontWeight:'400', fontSize:13}}>{props.post.description}</div>
                            </div>  
                            <div className="datePost">
                                <Moment fromNow style={{fontSize:'x-small'}}>{props.post.created_at}</Moment>
                            </div>  
                        </div>
                    </div>

                    {props.post.comments?.map(comment => 
                        <div className="comments">
                            <img src={IMAGES_URL + comment.user.pic} alt="Foto de perfil" className="imgAvatar" />
                            <div className="userDate">
                                <div style={{display:'flex', alignItems:'baseline'}}>
                                    <UsernameBold user={comment.user} />
                                    <div style={{fontWeight:'400', fontSize:13}}>{comment.body}</div>
                                </div>  
                                <div className="datePost">
                                    <Moment fromNow style={{fontSize:'x-small'}}>{comment.created_at}</Moment>
                                </div>  
                            </div>
                        </div>
                    )}
                </div>
                
                <div>
                    <div className="like-container">
                        <div className="like">
                            <h1>
                                { !isLiked && <HeartOutlined onClick={like.bind(this, props.post.id, props.currentUser?.id)} /> }
                                { isLiked && <HeartFilled onClick={unlike.bind(this, props.post.id, props.currentUser?.id)} style={{color:'rgb(237, 73, 86)'}}/> }
                            </h1>
                            <ShowLikes post={props.post} currentUser={props.currentUser} />
                            <Moment format="D MMMM YYYY" filter={toUpperCaseFilter} style={{fontSize:'x-small'}}>{props.post.created_at}</Moment>
                        </div>
                    </div>
                    

                    <div className="comment">
                        <Form.Item className="textarea">
                            <TextArea rows={1} onChange={onChange} value={value} placeholder="Agrega un comentario..." />
                        </Form.Item>
                        <Form.Item>
                            <Button htmlType="submit" loading={loading} onClick={onSubmit.bind(this, props.post.id)} type="link" style={{fontWeight:500}}>
                                Publicar
                            </Button>
                        </Form.Item>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = ({user}) => ({ myUser: user.myUser });
export default connect(mapStateToProps)(BigPost);