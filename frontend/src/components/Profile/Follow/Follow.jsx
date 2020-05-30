import React from 'react';
import { Button } from 'antd';

const Follow = props => {
    const follow = () => {
        console.log('follow', props.user);
    }

    return (
        <div className="follow">
            <Button type="primary" htmlType="submit" size="small" onClick={follow}>Seguir</Button>
        </div>
    )
}

export default Follow
