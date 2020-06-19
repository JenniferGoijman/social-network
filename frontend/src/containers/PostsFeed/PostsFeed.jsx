import React, { useEffect,useState } from 'react';
import { connect } from 'react-redux';
import PostFeed from '../../components/PostFeed/PostFeed';
import { getFeed, cleanup } from '../../redux/actions/posts';
import './PostsFeed.scss';
import Loading from '../../components/Loading/Loading';

const PostsFeed = props => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {   
        getFeed()
        .then(res => {            
            setLoading(false);
        })
        .catch(res => {
            setLoading(false);
        });

        return () => {
            cleanup();
        }
    }, []);

    return (
        <div className="posts-container">
            {props.posts?.length > 0 && props.posts?.map(post => 
                <PostFeed key={post.id} post={post} myUser={props.myUser} />)}
            
            {!loading && !props.posts?.length > 0 && <div style={{marginTop:30}}>
                <h1>Tu feed esta vacío!</h1>
                <h3>Comienza a seguir a tus amigos y te aparecerán sus publicaciones.</h3>
            </div>}

            {loading && <Loading />}
        </div>
    )
}

const mapStateToProps = ({user, post}) => ({ myUser: user.myUser, posts: post.posts });
export default connect(mapStateToProps)(PostsFeed);