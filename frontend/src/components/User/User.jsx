import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { IMAGES_URL } from '../../api-config';
import './User.scss';

import { getFollowers, getFollowings } from '../../redux/actions/users';

import NotFound from '../NotFound/NotFound';
import Unfollow from '../Profile/Unfollow/Unfollow';
import Follow from '../Profile/Follow/Follow';
import ChangebleProfilePic from '../Profile/ChangebleProfilePic/ChangebleProfilePic';
import Logout from '../Profile/Logout/Logout';

const User = props => {    
    const user = props.users?.filter(u=>u.username===props.match.params.username)[0]; //si no existe 404
    
    const isMe = props.myUser?.id === user?.id;
    
    useEffect(() => { 
        getFollowers(props.myUser?.id, true); 
        getFollowings(props.myUser?.id, true);
    }, [props]);

    const isAlreadyFollowed = props.myFollowings?.filter(f => f?.id === user?.id).length>0 ? true : false;
           
    return (
        <Fragment>
            {user !== undefined && 
            <Fragment>
                <div className="profile">
                    <div className="photo">
                        {isMe && <ChangebleProfilePic myUser={props.myUser}></ChangebleProfilePic>}
                        {!isMe && <img src={IMAGES_URL + user?.pic} alt="Foto de perfil"/>}
                    </div>
                    
                    <div className="info">
                        <div className="name">
                            <h1>{user?.username}</h1>
                            { !isMe && !isAlreadyFollowed && <Follow user={user}></Follow>}
                            { isAlreadyFollowed && <Unfollow user={user}></Unfollow>}
                            { isMe && <Logout></Logout>}
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
const mapStateToProps = ({user}) => ({ 
    myUser: user.myUser, myFollowers: user.myFollowers, myFollowings: user.myFollowings, users: user.users
});
export default connect(mapStateToProps)(User);