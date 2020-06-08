import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';
//import './BigPostsMobile.scss';
import { getMyUser, getByUsername } from '../../redux/actions/users';

import BigPostMobile from '../../components/BigPostMobile/BigPostMobile';

const BigPostsMobile = props => {
    const [currentUser, setCurrentUser] = useState();
    const usernameFromParams = props.match.params.username.toLowerCase();

    useEffect(() => {   
        getMyUser();
        getByUsername(usernameFromParams)
        .then(res => {
            setCurrentUser(res.data);
        });
    }, [usernameFromParams]);

    return (
        <Fragment>
            {props.currentUser?.posts?.map(post => 
                <BigPostMobile key={post.id} post={post} currentUser={currentUser} myUser={props.myUser} />)}
        </Fragment>
    )
}

const mapStateToProps = ({user}) => ({ myUser: user.myUser, currentUser: user.currentUser, users: user.users });
export default connect(mapStateToProps)(BigPostsMobile);