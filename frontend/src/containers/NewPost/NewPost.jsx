import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import './NewPost.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { uploadPostImage } from '../../redux/actions/posts';
import { Comment, Avatar, Form, Input, Button, Spin } from 'antd';
import { IMAGES_URL } from '../../api-config';
import { useHistory } from 'react-router-dom';

const NewPost = props => {
    const [selectedFile, setSelectedFile] = useState();
    const [preview, setPreview] = useState();
    const [comment, setComment] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const { TextArea } = Input;

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
        setSelectedFile(undefined);
    }

    const onClick = () => {
        setLoading(true);
        const fd = new FormData();        
        fd.append("image", selectedFile, selectedFile.name);
        fd.append("description", comment);
        uploadPostImage(fd)
        .then((res) => { console.log(":)"); 
            history.push('/' + props.myUser.username)})
        .catch(() => { console.log(":("); });
    }
    
    const handleComment = e => {
        setComment(e.target.value);  
    };

    return (
        <div className="new-post-container">
            <div className="new-post">
                <div className="header">
                    <FontAwesomeIcon icon={faTimes} style={{fontSize:"x-large", cursor:"pointer"}} onClick={close}/>
                    <div className="title">Nueva publicación con foto</div>
                    <Button type="link" disabled={!selectedFile} loading={loading} onClick={onClick}>Publicar</Button>
                </div>
                <div className="body">
                    {!selectedFile && <input type="file" name="image" onChange={onSelectFile}/>}            
                    {selectedFile && !loading && <img src={preview} alt="Vista previa de imágen" /> }
                    {selectedFile && loading && <Spin size="large"><img src={preview} alt="Vista previa de imágen" /></Spin>}
                    
                </div>
                {selectedFile && 
                    <div className="comment">
                         <Comment 
                            avatar={
                                <Avatar src={IMAGES_URL + props.myUser?.pic}/>
                            }
                            content={
                                <Form.Item>
                                    <TextArea rows={2} onChange={handleComment} placeholder="Escribe un pie de foto" style={{border:"none"}} />
                                </Form.Item>
                            }
                        />
                    </div>
                }
            </div>
        </div>
    )
}

const mapStateToProps = ({user}) => ({ myUser: user.myUser });
export default connect(mapStateToProps)(NewPost);