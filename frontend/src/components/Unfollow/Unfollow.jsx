import React, { Fragment } from 'react';
import { UserOutlined, CheckOutlined } from '@ant-design/icons';
import { Button } from 'antd';

const Unfollow = props => {

    const unfollow = event => {
        console.log('unfollow', props.user);
    }

    return (
        <Button type="default" htmlType="submit" size="small" onClick={unfollow}>
            <Fragment><UserOutlined /><CheckOutlined /></Fragment>
        </Button>
    )
}

export default Unfollow
