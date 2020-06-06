import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
//import './AmountPosts.scss';
import { getById } from '../../../redux/actions/users';

const AmountPosts = props => {
    useEffect(() => { 
        getById(props.currentUser?.id); 
    }, []);
    return (
        <Fragment>
            <div className="data">
                <span className="bold">{props.currentUser?.posts.length}</span> publicaciones
            </div>
        </Fragment>
    )
}

const mapStateToProps = ({user}) => ({ currentUser: user.currentUser });
export default connect(mapStateToProps)(AmountPosts);