import React from 'react';
import { SettingOutlined } from '@ant-design/icons';
import { logout } from '../../../redux/actions/users';
import { useHistory } from 'react-router-dom';

const Logout = props => {
    const history = useHistory();
    
    const disconnect = () => {
        logout()
        .then((res) => { 
            history.push('/');
        })
        .catch(() => { 
            console.log(":("); //poner mensaje de error 
        });
    }

    return (
        <h2>
            <SettingOutlined onClick={disconnect} />
        </h2>
    )
}

export default Logout
