import React, { Fragment } from 'react';
import { UserOutlined, CheckOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { unfollow } from '../../../redux/actions/followers';

const Unfollow = props => {

    const handleUnfollow = event => {
        const follower_id = props.myUser.id;
        const followed_id = props.user.id;
        unfollow(follower_id, followed_id)
        .then(res => {
            console.log(":)")
        })
        .catch(()=>{
            console.log(":(")
        })
    }

    return (
        <div className="unfollow">
            <Button type="default" htmlType="submit" size="small" onClick={handleUnfollow}>
                <Fragment><UserOutlined /><CheckOutlined /></Fragment>
            </Button>
        </div>
    )
}

export default Unfollow;
