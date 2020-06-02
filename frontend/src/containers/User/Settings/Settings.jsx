import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { IMAGES_URL } from '../../../api-config';
import './Settings.scss'
import { Form, Input, Button, notification } from 'antd';
import { getUserInfo, updateInfo } from '../../../redux/actions/users';
import ChangeablePicThroughLink from '../../../components/Profile/ChangeablePicThroughLink/ChangeablePicThroughLink';
import { useHistory } from 'react-router-dom';

const Settings = props => {
    const history = useHistory();
    const { TextArea } = Input;
    let myUser = props.myUser;

    useEffect(() => {
        getUserInfo()
        .catch(console.error)
    }, [])

    const onFinish = ({myUser}) => {
        updateInfo(myUser)
        .then(res => {
            history.push('/'+ myUser.username);
        })
        .catch((res) =>{
            notification.error({message:'Ajustes', description:'Hubo un problema al tratar de guardar los cambios.'})
            console.log(res)
        })
    }
    
    return (        
        <div className="settings-container">
            <div className="settings-items-container">
                <div className="settings-item-name">
                    <div className="left">
                        <img src={IMAGES_URL + props.myUser.pic} alt="Foto de perfil" />
                    </div>
                    <div className="usernamePic">
                        <h2>{myUser.username}</h2>
                        <ChangeablePicThroughLink />
                    </div>
                </div>
                <Form name="settings" onFinish={onFinish} initialValues={{myUser}}>
                    <div className="settings-item">
                        <div className="left">Nombre</div>
                        <Form.Item name={['myUser', 'name']} rules={[{ required: true, message: 'Ingrese su nombre completo' }]} >
                            <Input name="name" placeholder="Nombre" style={{ width: 300 }}/>
                        </Form.Item>
                    </div>
                    <div className="settings-item">
                        <div className="left">Nombre de usuario</div>
                        <Form.Item name={['myUser', 'username']} rules={[{ required: true, message: 'Ingrese su nombre de usuario' }]} >
                            <Input name="username" placeholder="Nombre" style={{ width: 300 }}/>
                        </Form.Item>
                    </div>
                    <div className="settings-item">
                        <div className="left">Biografía</div>
                        <Form.Item name={['myUser', 'description']}>
                            <TextArea name="description" autoSize={{ minRows: 4, maxRows: 4 }} style={{ width: 300 }}/>
                        </Form.Item>
                    </div>
                    <div className="settings-item">
                        <div className="left">Correo electrónico</div>
                        <Form.Item name={['myUser', 'email']} rules={[{ type: 'email', message: 'Ingrese un email válido' }]} >
                            <Input name="email" placeholder="Correo electrónico" style={{ width: 300 }}/>
                        </Form.Item>
                    </div>
                    <div className="settings-item">
                    <div className="left"></div>
                        <div className="name">
                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Aceptar
                                </Button>
                            </Form.Item>
                        </div>
                    </div>
                </Form>

                {/* <div className="settings-item">
                    <div className="left">Sitio web</div>
                    <Input placeholder="Sitio web" />
                </div> */}
                {/* <div className="settings-item">
                    <div className="left">Número de teléfono</div>
                    <Input placeholder="Número de teléfono" />
                </div> */}
            </div>
        </div>
    )
}

const mapStateToProps = ({user}) => ({ myUser: user.myUser });
export default connect(mapStateToProps)(Settings);