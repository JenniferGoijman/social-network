import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Comment, Avatar, Form, Button, Input } from 'antd';
import { IMAGES_URL } from '../../../api-config';

const NewComment = props => {
    const [ value, setValue] = useState();
    const { TextArea } = Input;

    const handleChange = e => {
        setValue(e.target.value);
        console.log(e.target.value);
    };

    const Editor = ({ onChange, onSubmit, submitting, value }) => (
        <>
          <Form.Item>
            <TextArea rows={4} onChange={onChange} value={value} placeholder="Escribe un pie de foto" unbordered />
          </Form.Item>
        </>
      );
    
    return (
        <div>
            <Comment 
                avatar={
                    <Avatar src={IMAGES_URL + props.myUser?.pic} alt="Han Solo"/>
                }
                content={
                    <Form.Item>
                        <TextArea rows={2} onChange={handleChange} placeholder="Escribe un pie de foto" style={{border:"none"}} />
                    </Form.Item>
                }
            />
        </div>
    )
}

const mapStateToProps = ({user}) => ({ myUser: user.myUser });
export default connect(mapStateToProps)(NewComment);
