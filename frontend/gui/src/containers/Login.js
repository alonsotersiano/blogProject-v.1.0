import React from 'react';

import { Form, Input, Button, Checkbox, Spin } from 'antd';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import { connect } from 'react-redux';
import * as actions from '../store/actions/auth';

class Login extends React.Component {

    render() {

        const onFinish = (values) => {
            if(values) {
                this.props.onAuth(values.username, values.password);
            }
            this.props.history.push('/');
          };
        
          const onFinishFailed = (errorInfo) => {
            console.log('Failed:', errorInfo);
          };

          let errorMessage = null;
          if (this.props.error) {
              errorMessage = (
                <p>{this.props.error.message}</p>
              );
          }

          
        return (

            <div>
                {errorMessage}
                {
                    this.props.loading ?
                    
                    <Spin
                    />

                    :


                    <Form
                    name="basic"
                    layout="vertical"
                    labelCol={{
                        span: 8,
                        offset: 8
                    }}
                    wrapperCol={{
                        span: 8,
                        offset: 8
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="remember"
                        valuePropName="checked"
                        wrapperCol={{
                        offset: 8,
                        span: 16,
                        }}
                    >
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                        offset: 8,
                        span: 16,
                        }}
                    >
                        <Button style={{marginRight: '10px'}} type="primary" htmlType="submit">
                        Login
                        </Button>
                        or
                        <NavLink style={{marginLeft: '10px'}} to='/signup'>
                            Signup
                        </NavLink>
                    </Form.Item>
                    </Form>
                }
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        loading: state.loading,
        error: state.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (username, password) => dispatch(actions.authLogin(username, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);