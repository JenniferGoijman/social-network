import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { IMAGES_URL } from '../../api-config';
import './User.scss';
import { Divider } from 'antd';
import { useMediaPredicate } from 'react-media-hook';

import { getAll } from '../../redux/actions/users';
import { getFollowers, getFollowings } from '../../redux/actions/followers';

import NotFound from '../NotFound/NotFound';
import Unfollow from '../Profile/Unfollow/Unfollow';
import Follow from '../Profile/Follow/Follow';
import ChangeablePicThroughPic from '../Profile/ChangeablePicThroughPic/ChangeablePicThroughPic';
import SettingsButton from '../Profile/SettingsButton/SettingsButton';
import Edit from '../Profile/Edit/Edit';

const User = props => {
    const biggerThan415 = useMediaPredicate("(min-width: 415px)");
    const user = props.users?.find(u=>u.username.toLowerCase()===props.match.params.username.toLowerCase()); //si no existe 404
    const isMe = props.myUser?.id === user?.id;
    
    useEffect(() => { 
        getAll();
        getFollowers(props.myUser?.id, true); 
        getFollowings(props.myUser?.id, true);
    }, [props.myUser]);

    const isAlreadyFollowed = props.myFollowings?.filter(f => f?.id === user?.id).length>0 ? true : false;
           
    return (
        <Fragment>
            {user && 
            <Fragment>
                <div className="profile">
                    <div className="photo">
                        {isMe && <ChangeablePicThroughPic myUser={props.myUser} />}
                        {!isMe && <img src={IMAGES_URL + user?.pic} alt="Foto de perfil"/>}
                    </div>
                    
                    <div className="info">
                        <div className="name">
                            <h1>{user?.username}</h1>
                            { !isMe && !isAlreadyFollowed && <Follow myUser={props.myUser} user={user} />}
                            { isAlreadyFollowed && <Unfollow myUser={props.myUser} user={user} />}
                            <div className="editSettings">
                                { isMe && <Edit /> }
                                { isMe && <SettingsButton />}
                            </div>
                        </div>

                        {biggerThan415 && <div className="datas">
                            <div className="data"><span className="bold">{user?.amount_posts}</span> publicaciones</div>
                            <div className="data"><span className="bold">{user?.amount_followers}</span> seguidores</div>
                            <div className="data"><span className="bold">{user?.amount_followings}</span> seguidos</div>                
                        </div>}
                        
                        <br />
                        {biggerThan415 && <div className="bold">{user?.name}</div>}
                        {biggerThan415 && <div className="description">{user?.description}</div>}
                    </div>
                </div>
                {!biggerThan415 && <div className="usernameDescription">
                    <div className="bold">{user?.name}</div>
                    <div className="description">{user?.description}</div>
                </div>}
                {!biggerThan415 && <Divider /> }
                    {!biggerThan415 && <div className="datasMobile">
                        <div className="data"><span className="bold">{user?.amount_posts}</span> publicaciones</div>
                        <div className="data"><span className="bold">{user?.amount_followers}</span> seguidores</div>
                        <div className="data"><span className="bold">{user?.amount_followings}</span> seguidos</div>                
                    </div>}
                    {!biggerThan415 && <Divider /> }
                    
                    
                    
            </Fragment>}
            {!user && props.users?.length>0 && <NotFound /> }
        </Fragment>
    )
}
const mapStateToProps = ({user}) => ({ 
    myUser: user.myUser, myFollowers: user.myFollowers, myFollowings: user.myFollowings, users: user.users
});
export default connect(mapStateToProps)(User);