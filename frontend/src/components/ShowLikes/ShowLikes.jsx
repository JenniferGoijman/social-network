import React from 'react';
import { like } from '../../redux/actions/posts';

const ShowLikes = ({post, currentUser}) => {
    console.log(post, currentUser)
    return (
        <div>
            {post.likes?.length > 0 && 
                <div style={{fontWeight:'500', color:'black'}}>{post.likes.length} Me gusta</div>}
            {!post.likes?.length > 0 && 
                <div style={{color:'black'}}>Sé el primero en
                    <span style={{fontWeight:'500', cursor:'pointer'}} 
                        onClick={like.bind(this, post.id, currentUser?currentUser.id:null)}> indicar que te gusta esto</span>
                </div>}
        </div>
    )
}

export default ShowLikes;