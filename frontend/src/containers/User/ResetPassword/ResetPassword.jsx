import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Row, Col, Button, notification, Divider } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons'

import './ResetPassword.scss'

import { resetPassword } from '../../../redux/actions/users'


const ResetPassword = props => {
    const [form] = Form.useForm();
    const [match, setMatch] = useState();
    console.log(props);

    const onFinish = values => {
        if (!match) {
            if (props.users.find(user => user.name === values.name && user.email === values.email)) {
                setMatch(props.users.find(user => user.name === values.name && user.email === values.email));
            } else {
                console.log("no se encontro");
            }
        } else {
            const newPassword = { password: values.password }
            resetPassword(match.id, newPassword)
            .then(res => {
                notification.success({message:'Nueva contraseña', description:res.data.message})
                setTimeout(() => {
                    props.history.push('/login')
                }, 1500);
            })
            .catch((res) =>{
                notification.error({message:'Nueva contraseña', description:'Hubo un problema al intentar cambiar la contraseña'})
                console.log(res)
            })

            //si esta logueando, logout
        }        
        
        // const user = values;
        // register(user)
        // .then(res => {
        //     notification.success({message:'Register', description:res.data.message})
        //     setTimeout(() => {
        //         props.history.push('/login')
        //     }, 1500);
        // })
        // .catch((res) =>{
        //     notification.error({message:'Register', description:'Hubo un problema al registrar el usuario'})
        //     console.log(res)
        // })
    };
  
    const register = () => {
        props.history.push('/register');
    }

    const login = () => {
        props.history.push('/login');
    }

    return (
        <div className="reset-password-container">
            <div className="card-in">
                <div className="header">
                    <div className="icon-container">
                        <div className="icon">
                            <FontAwesomeIcon icon={faLock} size={'4x'} />
                        </div>
                    </div>
                    <h3>¿Tienes problemas para entrar?</h3>
                    <h4>Introduce tu nombre completo y dirección de correo electrónico para que recuperes el acceso a tu cuenta.</h4>
                    {/* <Button type="primary" htmlType="submit" icon={<FacebookFilled />} style={{width: 270, borderRadius:4}}>
                        Iniciar sesión con Facebook
                    </Button>*/}
                    
                </div>
                <div className="form">
                    <Form form={form} name="register" onFinish={onFinish} scrollToFirstError >
                        <Form.Item name="name" style={{marginBottom: 10}} rules={[
                            { required: true, message: 'Ingrese su nombre completo', }, ]} >
                            <Input placeholder="Nombre completo" />
                        </Form.Item>
                        <Form.Item name="email" style={{marginBottom: 10}} rules={[
                            { type: 'email', message: 'Ingrese su correo electrónico', }, ]} >
                            <Input placeholder="Correo electrónico" />
                        </Form.Item>
                        
                        {match && 
                        <Form.Item name="password" style={{marginBottom: 10}} rules={[
                            { required: true, message: 'Ingrese su nueva contraseña', }, ]} hasFeedback >
                            <Input.Password placeholder="Nueva contraseña"/>
                        </Form.Item>}
                        <Row justify="center">
                            <Col>
                                <Form.Item >
                                    <Button type="primary" htmlType="submit" style={{width: 270, borderRadius:4}}>
                                        Continuar
                                    </Button>
                                </Form.Item>
                            </Col>
                        </Row>            
                    </Form>
                </div>

                <Divider plain><div className="divider">O</div></Divider>
                <div onClick={register} style={{cursor:'pointer'}}>Crear cuenta nueva</div>
                <div onClick={login} style={{cursor:'pointer'}}>Volver al inicio de sesión</div>              
            </div>
        </div>
    );
  };
                
const mapStateToProps = ({user}) => ({ users: user.users });
export default connect(mapStateToProps)(ResetPassword);