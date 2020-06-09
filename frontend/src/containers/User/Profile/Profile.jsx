import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import './Profile.scss';
import { getMyUser, getByUsername } from '../../../redux/actions/users';

import ProfileHeader from '../../../components/Profile/ProfileHeader/ProfileHeader';
import PostProfile from '../../../components/Profile/PostProfile/PostProfile';
import NotFound from '../../../components/NotFound/NotFound';

const Profile = props => {
    const [currentUser, setCurrentUser] = useState();
    const [notFound, setNotFound] = useState();
    const usernameFromParams = props.match.params.username.toLowerCase();

    useEffect(() => {   
        getMyUser();
        getByUsername(usernameFromParams)
        .then(res => {
            setCurrentUser(res.data);
        })
        .catch(res => {
            setNotFound(true);
        });
    }, [usernameFromParams]);

    return (
        <Fragment>
            {currentUser && 
            <Fragment>
                <ProfileHeader currentUser={currentUser} usernameFromParams={usernameFromParams} />
                <div className="grid-center">
                    <div className="posts-wraper">
                        {props.currentUser?.posts?.map(post => 
                            <PostProfile key={post.id} post={post} currentUser={currentUser} />)}
                    </div>
                </div>
            </Fragment>}

            {notFound && <NotFound /> }
        </Fragment>
    )
}

const mapStateToProps = ({user}) => ({ myUser: user.myUser, currentUser: user.currentUser, users: user.users });
export default connect(mapStateToProps)(Profile);
