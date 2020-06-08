import React from 'react';
import { useHistory } from 'react-router-dom';
import './UsernameBold.scss';

const UsernameBold = props => {
    const history = useHistory();

    const goToUserProfile = (user)=> {
        history.push('/'+ user.username);
    }
    
    return (
        <div className="username" onClick={goToUserProfile.bind(this, props.user)}>{props.user.username}</div>
    )
}

export default UsernameBold;
