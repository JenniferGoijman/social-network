import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { IMAGES_URL } from '../../../api-config';
import './ProfileHeader.scss';
import { Divider } from 'antd';
import { useMediaPredicate } from 'react-media-hook';

import NotFound from '../../NotFound/NotFound';
import Unfollow from '../Unfollow/Unfollow';
import Follow from '../Follow/Follow';
import ChangeablePicThroughPic from '../ChangeablePicThroughPic/ChangeablePicThroughPic';
import SettingsButton from '../SettingsButton/SettingsButton';
import Edit from '../Edit/Edit';
import ShowFollowers from '../ShowFollowers/ShowFollowers';
import ShowFollowings from '../ShowFollowings/ShowFollowings';

const ProfileHeader = props => {
    const biggerThan415 = useMediaPredicate("(min-width: 415px)");
    const currentUser = props.currentUser;
    const myUser = props.myUser;
    const isMe = myUser?.id === currentUser?.id;
    const isAlreadyFollowed = myUser?.followings?.filter(f => f?.id === currentUser?.id).length>0 ? true : false;
    const usernameFromParams = props.usernameFromParams;
    
    return (
        <Fragment>
            {currentUser && 
            <Fragment>
                <div className="profile">
                    <div className="photo">
                        {isMe && <ChangeablePicThroughPic myUser={myUser} />}
                        {!isMe && <img src={IMAGES_URL + currentUser?.pic} alt="Foto de perfil"/>}
                    </div>
                    
                    <div className="info">
                        <div className="name">
                            <h1>{currentUser?.username}</h1>
                            { !isMe && !isAlreadyFollowed && <Follow myUser={myUser} currentUser={currentUser} locationUser={usernameFromParams} />}
                            { isAlreadyFollowed && <Unfollow myUser={myUser} currentUser={currentUser} locationUser={usernameFromParams} />}
                            <div className="editSettings">
                                { isMe && <Edit /> }
                                { isMe && <SettingsButton />}
                            </div>
                        </div>

                        {biggerThan415 && <div className="datas">
                            <div className="data"><span className="bold">{currentUser?.amount_posts}</span> publicaciones</div>
                            <ShowFollowers myUser={myUser} user={currentUser} locationUser={usernameFromParams}/>
                            <ShowFollowings myUser={myUser} user={currentUser} locationUser={usernameFromParams}/>
                        </div>}
                        
                        <br />
                        {biggerThan415 && <div className="bold">{currentUser?.name}</div>}
                        {biggerThan415 && <div className="description">{currentUser?.description}</div>}
                    </div>
                </div>
                {!biggerThan415 && <div className="usernameDescription">
                    <div className="bold">{currentUser?.name}</div>
                    <div className="description">{currentUser?.description}</div>
                </div>}
                {!biggerThan415 && <Divider /> }
                    {!biggerThan415 && <div className="datasMobile">
                        <div className="data"><span className="bold">{currentUser?.amount_posts}</span> publicaciones</div>
                        <ShowFollowers myUser={myUser} user={currentUser} locationUser={usernameFromParams}/>
                        <ShowFollowings myUser={myUser} user={currentUser} locationUser={usernameFromParams}/>
                    </div>}
                    {!biggerThan415 && <Divider /> }
            </Fragment>}
            
            {!currentUser && props.users?.length>0 && <NotFound /> }
        </Fragment>
    )
}
const mapStateToProps = ({user}) => ({ myUser: user.myUser, currentUser: user.currentUser });
export default connect(mapStateToProps)(ProfileHeader);