import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import './NewPost.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import NewComment from '../../components/Post/NewComment/NewComment';

const NewPost = props => {
    const [selectedFile, setSelectedFile] = useState();
    const [preview, setPreview] = useState();

    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined)
            return
        }
        const objectUrl = URL.createObjectURL(selectedFile)
        setPreview(objectUrl)

        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])

    const onSelectFile = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }
        setSelectedFile(e.target.files[0])
    }

    const close = () => {
        window.location.pathname='/'+ props.myUser.username;
    }

    return (
        <div className="new-post-container">
            <div className="new-post">
                <div className="header">
                    <FontAwesomeIcon icon={faTimes} style={{fontSize:"x-large", cursor:"pointer"}} onClick={close}/>
                    <div className="title">Nueva publicación con foto</div>
                    <a href="#">Siguiente</a>
                </div>
                <div className="body">
                    {!selectedFile && <input type="file" name="image" onChange={onSelectFile}/>}            
                    {selectedFile && <img src={preview} /> }
                </div>
                {selectedFile && 
                    <div className="comment">
                         <NewComment /> 
                    </div>
                }
            </div>
        </div>
    )
}

const mapStateToProps = ({user}) => ({ myUser: user.myUser });
export default connect(mapStateToProps)(NewPost);