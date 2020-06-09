import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { IMAGES_URL } from '../../api-config';
import './BigPostMobile.scss';
import Moment from 'react-moment';
import 'moment/locale/es';
import { Form, Button, Input, Avatar  } from 'antd';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-regular-svg-icons';
import { like, unlike, insertComment, getPostById } from '../../redux/actions/posts';
import { getMyUser, getByUsername } from '../../redux/actions/users';
import UsernameBold from '../Profile/UsernameBold/UsernameBold';
import ShowLikes from '../ShowLikes/ShowLikes';
import { useHistory } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';

const { TextArea } = Input;

const BigPostMobile = props => {
    const history = useHistory();
    const usernameFromParams = props.match.params.username.toLowerCase();   
    const [currentUser, setCurrentUser] = useState();  
    const [myUser, setMyUser] = useState(props.myUser);
    const isLiked = props.post?.likes?.filter(like => like.user_id === myUser?.id).length > 0 ? true : false;
    const [value, setValue] = useState();
    const [writeComment, setWriteComment] = useState(false);
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {   
        getByUsername(usernameFromParams)
            .then(res => { 
                setCurrentUser(res.data); 
            });
    }, []);

    const goToProfile = () => {
        history.push('/'+ props.post.user.username);
    }

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
    }
    
    return (
        <Fragment>
            <div style={{display:'flex', paddingLeft:15}} onClick={goToProfile}>
                <h2 style={{margin:0}}><ArrowLeftOutlined /></h2>
            </div>
            <div className="big-post-mobile-container">   
                {props.post && <div className="post">
                    <div className="header">
                        <Avatar src={IMAGES_URL + props.post.user.pic}/>
                        <UsernameBold user={props.post?.user} />
                    </div>
                    <div className="body">
                        <img src={IMAGES_URL + props.post.image} alt="Publicación" />
                    </div>

                    <div className="like">
                        <div style={{display:'flex'}}>
                            <h1>
                                { !isLiked && <HeartOutlined onClick={like.bind(this, props.post.id, currentUser?.id, "BigPostMobile")} /> }
                                { isLiked && <HeartFilled onClick={unlike.bind(this, props.post.id, currentUser?.id, "BigPostMobile")} style={{color:'rgb(237, 73, 86)'}}/> }
                            </h1>
                            <h1 style={{marginLeft:10}} onClick={showInsertComment}><FontAwesomeIcon icon={faComment} /></h1>
                        </div>
                        <ShowLikes post={props.post} currentUser={currentUser} />
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
                </div>}
            </div>
        </Fragment>
    )
}

const mapStateToProps = ({user, post}) => ({ myUser: user.myUser, currentUser: user.currentUser, users: user.users, post:post.post });
export default connect(mapStateToProps)(BigPostMobile);