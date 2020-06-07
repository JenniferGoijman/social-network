import React from 'react';
import { Form, Input, Row, Col, Button, notification, Divider } from 'antd';
import { FacebookFilled } from '@ant-design/icons';

import './Register.scss'
import Logo from '../../../img/logoGrande.png';
import { register } from '../../../redux/actions/users'


const Register = props => {
    const [form] = Form.useForm();

    const onFinish = values => {
        const user = values;
        register(user)
        .then(res => {
            notification.success({message:'Register', description:res.data.message})
            setTimeout(() => {
                props.history.push('/login')
            }, 1500);
        })
        .catch((res) =>{
            notification.error({message:'Register', description:'Hubo un problema al registrar el usuario'})
            console.log(res)
        })
    };
  
    return (
        <div className="register-container">
            <div className="card-in">
                <div className="header">
                    <div className="logo">
                        <img src={Logo} alt="Logo Instagram"/>
                    </div>
                    <h3>Regístrate para ver fotos y vídeos de tus amigos.</h3>
                    <Button type="primary" htmlType="submit" icon={<FacebookFilled />} style={{width: 270, borderRadius:4}}>
                        Iniciar sesión con Facebook
                    </Button>
                    <Divider plain><div className="divider">O</div></Divider>
                    
                </div>
                <div className="form">
                    <Form form={form} name="register" onFinish={onFinish} scrollToFirstError >
                        <Form.Item name="email" style={{marginBottom: 10}} rules={[
                            { type: 'email', message: 'Ingrese su correo electrónico', }, ]} >
                            <Input placeholder="Correo electrónico" />
                        </Form.Item>
                        <Form.Item name="name" style={{marginBottom: 10}} rules={[
                            { required: true, message: 'Ingrese su nombre completo', }, ]} >
                            <Input placeholder="Nombre completo" />
                        </Form.Item>
                        <Form.Item name="username" style={{marginBottom: 10}} rules={[
                            { required: true, message: 'Ingrese su nombre de usuario', }, ]} >
                            <Input placeholder="Nombre de usuario" />
                        </Form.Item>
                        <Form.Item name="password" style={{marginBottom: 10}} rules={[
                            { required: true, message: 'Ingrese su contraseña', }, ]} hasFeedback >
                            <Input.Password placeholder="Contraseña"/>
                        </Form.Item>
                        <Row justify="center">
                            <Col>
                                <Form.Item >
                                    <Button type="primary" htmlType="submit" style={{width: 270, borderRadius:4}}>
                                        Registrarse
                                    </Button>
                                </Form.Item>
                            </Col>
                        </Row>            
                    </Form>
                </div>
                <h5>Al registrarte, aceptas nuestras Condiciones. Obtén más información sobre cómo recopilamos, 
                    usamos y compartimos tu información en la Política de datos, así como el uso que hacemos de 
                    las cookies y tecnologías similares en nuestra Política de cookies.</h5>
            </div>
            <div className="card-in">
                ¿Tienes una cuenta?  <a href="/login">Entrar</a>
            </div>
        </div>
    );
  };
                
      

export default Register;