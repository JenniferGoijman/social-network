import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Post from '../../components/Post/Post';
import { getFeed } from '../../redux/actions/posts';
import './Posts.scss';

const Posts = props => {

    useEffect(() => {   
        getFeed();
    }, []);

    return (
        <div className="posts-container">
            {props.posts?.map(post => 
                <Post key={post.id} post={post} myUser={props.myUser} />)}
        </div>
    )
}

const mapStateToProps = ({user, post}) => ({ myUser: user.myUser, posts: post.posts });
export default connect(mapStateToProps)(Posts);