import React from 'react';
import { Button } from 'antd';
import { useHistory } from 'react-router-dom';

const Edit = props => {
    const history = useHistory();
    
    const edit = () => {
        history.push('/accounts/edit');
    }

    return (
        <div className="edit">
            <Button type="default" htmlType="submit" size="small" onClick={edit}>Editar perfil</Button>
        </div>
    )
}

export default Edit;