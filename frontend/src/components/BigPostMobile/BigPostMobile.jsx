import React, { useState } from 'react';
import { Form, Button, Input, Avatar  } from 'antd';
import { IMAGES_URL } from '../../api-config';
import './BigPostMobile.scss';
import Moment from 'react-moment';
import 'moment/locale/es';
import UsernameBold from '../Profile/UsernameBold/UsernameBold';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import { like, unlike, insertComment } from '../../redux/actions/posts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-regular-svg-icons';

const { TextArea } = Input;

const BigPostMobile = props => {
    const [value, setValue] = useState();
    const [writeComment, setWriteComment] = useState(false);
    const [loading, setLoading] = useState(false);
    const isLiked = props.post.likes?.filter(like => like.user_id === props.myUser?.id).length > 0 ? true : false;
    
    const toUpperCaseFilter = (d) => {
        return d.toUpperCase();
    };

    const showInsertComment = () => {
        writeComment? setWriteComment(false): setWriteComment(true);
    }

    const onSubmit = post_id => {
        if (!value) {
            return;
        }
        setLoading(true);
        const comment = {"post_id": post_id, "body":value}
        insertComment(comment, props.currentUser.id);

        setLoading(false);
        setWriteComment(false);
        setValue();
    }

    const onChange = e => {
        setValue(e.target.value);
        console.log(e.target.value);
    }

    return (
        <div className="big-post-mobile-container">
            <div className="post">
                <div className="header">
                    <Avatar src={IMAGES_URL + props.post.user.pic}/>
                    <UsernameBold user={props.post.user} />
                </div>
                <div className="body">
                    <img src={IMAGES_URL + props.post.image} alt="Publicación" />
                </div>

                <div className="like">
                    <div style={{display:'flex'}}>
                        <h1>
                            { !isLiked && <HeartOutlined onClick={like.bind(this, props.post.id, props.currentUser?.id)} /> }
                            { isLiked && <HeartFilled onClick={unlike.bind(this, props.post.id, props.currentUser?.id)} style={{color:'rgb(237, 73, 86)'}}/> }
                        </h1>
                        <h1 style={{marginLeft:10}} onClick={showInsertComment}><FontAwesomeIcon icon={faComment} /></h1>
                    </div>
                    {props.post.likes.length > 0 && 
                        <div style={{fontWeight:'500', color:'black'}}>{props.post.likes.length} Me gusta</div>}
                    {!props.post.likes.length > 0 && 
                        <div style={{color:'black'}}>Sé el primero en
                            <span style={{fontWeight:'500', cursor:'pointer'}} 
                                onClick={like.bind(this, props.post.id, props.currentUser?.id)}> indicar que te gusta esto</span>
                        </div>}
                </div>

                <div className="description">
                    <UsernameBold user={props.post.user} />
                    <div>{props.post.description}</div>                
                </div>

                {props.post.comments?.map(comment => 
                        <div className="comment">
                            <div className="userDate">
                                <div style={{display:'flex', alignItems:'baseline'}}>
                                    <UsernameBold user={comment.user} />
                                    <div style={{fontWeight:'400', fontSize:13}}>{comment.body}</div>
                                </div>
                            </div>
                        </div>
                    )}
                
                <div className="date">
                    <Moment fromNow filter={toUpperCaseFilter} style={{fontSize:'x-small'}}>{props.post.created_at}</Moment>
                </div>
                
                {writeComment &&
                    <div className="comment">
                        <Form.Item className="textarea">
                            <TextArea rows={2} onChange={onChange} value={value} placeholder="Agrega un comentario..." />
                        </Form.Item>
                        <Form.Item>
                            <Button htmlType="submit" loading={loading} onClick={onSubmit.bind(this, props.post.id)} type="link" style={{fontWeight:500}}>
                                Publicar
                            </Button>
                        </Form.Item>
                    </div>}
            </div>
        </div>
    )
}

export default BigPostMobile;