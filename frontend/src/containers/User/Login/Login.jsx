import React from 'react'
import { Form, Input, Row, Col, Button, notification, Divider } from 'antd';
import { FacebookFilled } from '@ant-design/icons';

import './Login.scss'
import Logo from '../../../img/logoGrande.png';

import { login } from '../../../redux/actions/users'


const Login = props => {
    const [form] = Form.useForm();

    const onFinish = values => {
        const user = values;
        login(user)
        .then(res => {
            notification.success({message:'Login', description:res.data.message})
            // setTimeout(() => {
            //     props.history.push('/login')
            // }, 1500);
        })
        .catch((res) =>{
            notification.error({message:'Login', description:'Hubo un problema al tratar de iniciar sesión'})
            console.log(res)
        })
    };
  
    return (
        <div className="card-out">
            <div className="card-in">
                <div className="header">
                    <div className="logo">
                        <img src={Logo} alt="Logo Instagram"/>
                    </div>
                </div>
                <div className="form">
                    <Form form={form} name="register" onFinish={onFinish} scrollToFirstError >
                        {/* <Form.Item name="email" style={{marginBottom: 10}} rules={[
                            { required: true, message: 'Ingrese su correo electrónico', }, ]} >
                            <Input placeholder="Correo electrónico" />
                        </Form.Item> */}
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
                                        Iniciar sesión
                                    </Button>
                                </Form.Item>
                            </Col>
                        </Row>            
                    </Form>
                </div>
                <Divider plain><div className="divider">O</div></Divider>
                <FacebookFilled /><h4> Iniciar sesión con Facebook</h4>
                <h5>¿Has olvidado la contraseña?</h5>                 
            </div>
            <div className="card-in">
                ¿No tienes una cuenta?  <a href="/register">Regístrate</a> {/* chequear href para redirigir a register*/}
            </div>
        </div>
    );
  };
                
      

export default Login;