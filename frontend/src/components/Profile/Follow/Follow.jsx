import React from 'react';
import { Button } from 'antd';
import { follow } from '../../../redux/actions/users';

const Follow = props => {
    const handleFollow = () => {
        const followerFollowed = {follower_id: props.myUser.id, followed_id: props.currentUser.id};
        follow(followerFollowed)
        .then(res => {
            console.log(":)")
        })
        .catch(()=>{
            console.log(":(")
        })
    }

    return (
        <div className="follow">
            <Button type="primary" htmlType="submit" size="small" onClick={handleFollow}>Seguir</Button>
        </div>
    )
}

export default Follow;
