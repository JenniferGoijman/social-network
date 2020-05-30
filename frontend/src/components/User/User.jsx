import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import './User.scss';
import { IMAGES_URL } from '../../api-config';
import { Tooltip, Button } from 'antd';
import { uploadImage, logout, getFollowers, getFollowings } from '../../redux/actions/users';
import { SettingOutlined, UserOutlined, CheckOutlined } from '@ant-design/icons';
import NotFound from '../NotFound/NotFound';

const User = props => {    
    //const [user, setUser] = useState(props.users?.filter(u=>u.username===props.match.params.username)[0]);
    const user = props.users?.filter(u=>u.username===props.match.params.username)[0]; //si no existe 404
    
    const isMe = props.myUser?.id === user?.id;
    
    useEffect(() => { 
        getFollowers(props.myUser?.id, true); 
        getFollowings(props.myUser?.id, true);
    }, []);

    const isAlreadyFollowed = props.myFollowings?.filter(f => f?.id === user?.id).length>0 ? true : false;
    
    const follow = () => {
        console.log('follow');
    }

    const unfollow = () => {
        console.log('unfollow');
    }
    const fileSelectedHandler = event => {
        //setUser(user.pic = event.target.files[0].name);
        const fd = new FormData();        
        //fd.append("image", event.target.files[0], user.pic);
        fd.append("image", event.target.files[0], event.target.files[0].name);
        uploadImage(props.myUser.id, fd)
        .then((res) => { console.log(":)") })
          .catch(() => { console.log(":(") });
    }

    const disconnect = () => {
        logout()
        .then((res) => { 
            setTimeout(() => {
                props.history.push('/')
            }, 1500);
        })
        .catch(() => { 
            console.log(":("); //poner mensaje de error 
        });
    }
   
    return (
        <Fragment>
            {user !== undefined && 
            <Fragment>
                <div className="profile">
                    {isMe && <div className="photo">
                        <label htmlFor='single'>
                            <Tooltip title="Cambiar foto de perfil">
                                <img src={IMAGES_URL + user?.pic} alt="Foto de perfil"/>
                            </Tooltip>
                        </label>
                        <input type="file" id='single' onChange={fileSelectedHandler} />
                    </div>}
                    {!isMe && <div className="photo"><img src={IMAGES_URL + user?.pic} alt="Foto de perfil"/></div>}
                    
                
                    <div className="info">
                        <div className="name">
                            <h1>{user?.username}</h1>
                            { !isMe && !isAlreadyFollowed && <div className="follow">
                                <Button type="primary" htmlType="submit" size="small" onClick={follow}>Seguir</Button>
                            </div>}
                            { isAlreadyFollowed && <div className="unfollow">
                                <Button type="default" htmlType="submit" size="small" onClick={unfollow}><Fragment><UserOutlined /><CheckOutlined /></Fragment></Button>
                            </div>}
                            { isMe && <h2><SettingOutlined onClick={disconnect} /></h2>}
                        </div>

                        <div className="datas">
                            <div className="data"><span className="bold">{user?.amout_posts}</span> publicaciones</div>
                            <div className="data"><span className="bold">{user?.amout_followers}</span> seguidores</div>
                            <div className="data"><span className="bold">{user?.amout_followings}</span> seguidos</div>                
                        </div><br />
                        <div className="bold">{user?.name}</div>
                        <div className="description">{user?.description}</div>
                    </div>
                </div>
            </Fragment>}
            {user === undefined && <NotFound></NotFound> }
        </Fragment>
    )
}
const mapStateToProps = ({user, myFollowers, myFollowings}) => ({ 
    myUser: user.myUser, myFollowers: user.myFollowers, myFollowings: user.myFollowings, users: user.users
});
export default connect(mapStateToProps)(User);