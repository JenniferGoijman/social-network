import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import './Profile.scss';
import { getMyUser, getByUsername } from '../../../redux/actions/users';

import ProfileHeader from '../../../components/Profile/ProfileHeader/ProfileHeader';
import PostProfile from '../../../components/Profile/PostProfile/PostProfile';

const Profile = props => {
    const [currentUser, setCurrentUser] = useState();
    const usernameFromParams = props.match.params.username.toLowerCase();

    useEffect(() => {   
        getMyUser();
        getByUsername(usernameFromParams)
        .then(res => {
            setCurrentUser(res.data);
        });
    }, []);

    return (
        <div className="grid-center">
            <div className="profile-wraper">
                <ProfileHeader currentUser={currentUser} usernameFromParams={usernameFromParams} />
                <div className="posts-wraper">
                    {props.currentUser?.posts?.map(post => 
                        <PostProfile key={post.id} post={post} currentUser={currentUser} />)}
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = ({user}) => ({ myUser: user.myUser, currentUser: user.currentUser });
export default connect(mapStateToProps)(Profile);
