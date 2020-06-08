import React, { useState } from 'react';
import { Button } from 'antd';
import { follow, getByUsername } from '../../../redux/actions/users';

const Follow = props => {
    const [loading, setLoading] = useState(false);

    const handleFollow = () => {
        setLoading(true);
        follow(props.currentUser.id)
        .then(res => {
            console.log(":)");
            getByUsername(props.locationUser);
        })
        .catch(()=>{
            console.log(":(")
        })
    }

    return (
        <div className="follow">
            <Button type="primary" htmlType="submit" size="small" loading={loading} onClick={handleFollow}>Seguir</Button>
        </div>
    )
}
export default Follow;
