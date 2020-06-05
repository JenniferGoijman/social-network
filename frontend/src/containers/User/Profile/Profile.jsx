import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { getMyUser, getByUsername } from '../../../redux/actions/users';

import ProfileHeader from '../../../components/Profile/ProfileHeader/ProfileHeader';

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
        <div>
            <ProfileHeader currentUser={currentUser} usernameFromParams={usernameFromParams} />
        </div>
    )
}

export default Profile
