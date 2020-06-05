import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PostFeed from '../../components/PostFeed/PostFeed';
import { getFeed } from '../../redux/actions/posts';
import './PostsFeed.scss';

const PostsFeed = props => {

    useEffect(() => {   
        getFeed();
    }, []);

    return (
        <div className="posts-container">
            {props.posts?.map(post => 
                <PostFeed key={post.id} post={post} myUser={props.myUser} />)}
        </div>
    )
}

const mapStateToProps = ({user, post}) => ({ myUser: user.myUser, posts: post.posts });
export default connect(mapStateToProps)(PostsFeed);