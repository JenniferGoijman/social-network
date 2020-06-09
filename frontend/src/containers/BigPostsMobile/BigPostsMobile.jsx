import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { getMyUser, getByUsername } from '../../redux/actions/users';
import { getPostById } from '../../redux/actions/posts';
import { ArrowLeftOutlined } from '@ant-design/icons';
import BigPostMobile from '../../components/BigPostMobile/BigPostMobile';
import { useHistory } from 'react-router-dom';

const BigPostsMobile = props => {
    const [currentUser, setCurrentUser] = useState();
    const [post, setPost] = useState();
    const usernameFromParams = props.match.params.username.toLowerCase();    
    const history = useHistory();

    useEffect(() => {   
        getMyUser();
        getByUsername(usernameFromParams)
        .then(res => {
            setCurrentUser(res.data);
        });
        getPostById(props.match.params.post_id)
        .then(res => {
            setPost(res.data);
        });
    }, [usernameFromParams]);

    const goToProfile = () => {
        history.push('/'+ post.user.username);
    }

    return (
        <Fragment>
            <div style={{display:'flex', paddingLeft:15}} onClick={goToProfile}>
                <h2 style={{margin:0}}><ArrowLeftOutlined /></h2>
            </div>
            
            {post &&
                <BigPostMobile key={post.id} post={post} currentUser={currentUser} myUser={props.myUser} />}
        </Fragment>
    )
}

const mapStateToProps = ({user}) => ({ myUser: user.myUser, currentUser: user.currentUser, users: user.users });
export default connect(mapStateToProps)(BigPostsMobile);