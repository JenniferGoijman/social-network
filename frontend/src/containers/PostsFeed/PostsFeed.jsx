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
            {props.posts?.length > 0 && props.posts?.map(post => 
                <PostFeed key={post.id} post={post} myUser={props.myUser} />)}
            
            {!props.posts.length > 0 && <div style={{marginTop:30}}>
                <h1>Tu feed esta vacío!</h1>
                <h3>Comienza a seguir a tus amigos y te aparecerán sus publicaciones.</h3>
            </div>}
        </div>
    )
}

const mapStateToProps = ({user, post}) => ({ myUser: user.myUser, posts: post.posts });
export default connect(mapStateToProps)(PostsFeed);