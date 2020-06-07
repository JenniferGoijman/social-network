import React, { useState, Fragment } from 'react';
import { UserOutlined, CheckOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { unfollow, getByUsername } from '../../../redux/actions/users';

const Unfollow = props => {
    const [loading, setLoading] = useState(false);

    const handleUnfollow = event => {
        setLoading(true);
        const follower_id = props.myUser.id;
        const followed_id = props.currentUser.id;
        unfollow(follower_id, followed_id)
        .then(res => {
            console.log(":)");
            getByUsername(props.locationUser);
        })
        .catch(()=>{
            console.log(":(");
        })
    }

    return (
        <div className="unfollow">
            <Button type="default" htmlType="submit" size="small" loading={loading} onClick={handleUnfollow}>
                <Fragment><UserOutlined /><CheckOutlined /></Fragment>
            </Button>
        </div>
    )
}

export default Unfollow;
