import React from 'react';
import { connect } from 'react-redux';
import { Form, Input, Row, Col, Button, notification, Divider } from 'antd';
import { FacebookFilled } from '@ant-design/icons';
import { getMyUser } from '../../redux/actions/users';

import './LoginComponent.scss';
import Logo from '../../img/logo.png';
import { useHistory } from 'react-router-dom';
import { login } from '../../redux/actions/users';

const LoginComponent = props => {
    const [form] = Form.useForm();
    const history = useHistory();

    setTimeout(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            getMyUser()
            .then(res => {
                history.push('/'+ props.myUser.username);
            })
            .catch(console.error)
        }
    }, 3000);

    const onFinish = values => {
        const user = values;
        login(user)
        .then(res => {
            history.push('/'+ res.data.user.username);
        })
        .catch((res) =>{
            notification.error({message:'Login', description:'Hubo un problema al tratar de iniciar sesión'})
        })
    };
  
    const resetPassword = () => {
        history.push('/accounts/password/reset');
    }

    return (
        <div className="login-component">
            <div className="card-in">
                <div className="header">
                    <div className="logo">
                        <img src={Logo} alt="Logo Jenntagram"/>
                    </div>
                </div>
                <div className="form">
                    <Form form={form} name="register" onFinish={onFinish} scrollToFirstError >
                        <Form.Item name="usernameOrEmail" style={{marginBottom: 10}} rules={[
                            { required: true, message: 'Ingrese su usuario o correo electrónico', }, ]} >
                            <Input placeholder="Usuario o correo electrónico" />
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
                <h4><FacebookFilled /> Iniciar sesión con Facebook</h4>
                <h5 onClick={resetPassword}>¿Has olvidado la contraseña?</h5>                 
            </div>
            <div className="card-in">
                ¿No tienes una cuenta?  <a href="/register">Regístrate</a>
            </div>
        </div>
    );
  };
                
const mapStateToProps = ({user}) => ({ myUser: user.myUser });
export default connect(mapStateToProps)(LoginComponent);