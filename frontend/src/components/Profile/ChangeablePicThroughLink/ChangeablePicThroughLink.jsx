import React, { Fragment } from 'react';
import { uploadImage } from '../../../redux/actions/users';

const ChangeablePicThroughLink = props => {

    const fileSelectedHandler = event => {
        const fd = new FormData();        
        fd.append("image", event.target.files[0], event.target.files[0].name);
        uploadImage(fd)
        .then((res) => { console.log(":)"); })
          .catch(() => { console.log(":("); });
    }

    return (
        <Fragment>
            <label htmlFor='single'>
                <h4>Cambiar foto de perfil</h4>
            </label>
            <input type="file" id='single' onChange={fileSelectedHandler} />
        </Fragment>
    )
}

export default ChangeablePicThroughLink
