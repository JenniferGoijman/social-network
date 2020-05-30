import React from 'react';
import { Button } from 'antd';
import { follow } from '../../../redux/actions/followers'

const Follow = props => {
    console.log(props)
    const handleFollow = () => {
        console.log('follow', props.user);
        //insertar en tabla followers
        const followerFollowed = {follower_id: props.myUser.id, followed_id: props.user.id};
        console.log(followerFollowed);
        follow(followerFollowed)
        .then(res => {
            console.log(":)")
        })
        .catch(()=>{
            console.log(":(")
        })

        //sumar following a myUser

        //sumar follower a props.user

    }

    return (
        <div className="follow">
            <Button type="primary" htmlType="submit" size="small" onClick={handleFollow}>Seguir</Button>
        </div>
    )
}

export default Follow
