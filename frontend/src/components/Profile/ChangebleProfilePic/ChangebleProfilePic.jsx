import React, { Fragment } from 'react';
import { Tooltip } from 'antd';
import { uploadImage } from '../../../redux/actions/users';
import { IMAGES_URL } from '../../../api-config';

const ChangebleProfilePic = props => {

    const fileSelectedHandler = event => {
        const fd = new FormData();        
        fd.append("image", event.target.files[0], event.target.files[0].name);
        uploadImage(props.myUser.id, fd)
        .then((res) => { console.log(":)") })
          .catch(() => { console.log(":(") });
    }

    return (
        <Fragment>
            <label htmlFor='single'>
                <Tooltip title="Cambiar foto de perfil">
                    <img src={IMAGES_URL + props.myUser?.pic} alt="Foto de perfil"/>
                </Tooltip>
            </label>
            <input type="file" id='single' onChange={fileSelectedHandler} />
        </Fragment>
    )
}

export default ChangebleProfilePic
