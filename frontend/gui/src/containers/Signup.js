import React from 'react';
import { Form, Input, Button } from 'antd';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import * as actions from '../store/actions/auth';
import { connect } from 'react-redux';


class Signup extends React.Component {

    render() {

        const onFinish = (values) => {
            if(values) {
                this.props.onAuth(values.username, values.email, values.password1, values.password2);
            }
            this.props.history.push('/');
          };

        return (

            <Form
            layout="vertical"
            labelCol={{
                span: 8,
                offset: 8
            }}
            wrapperCol={{
                span: 8,
                offset: 8
            }}
            name="register"
            onFinish={onFinish}
            scrollToFirstError
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
                name="email"
                label="E-mail"
                rules={[
                {
                    type: 'email',
                    message: 'The input is not valid E-mail!',
                },
                {
                    required: true,
                    message: 'Please input your E-mail!',
                },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="password1"
                label="Password"
                rules={[
                {
                    required: true,
                    message: 'Please input your password!',
                },
                ]}
                hasFeedback
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                name="password2"
                label="Confirm Password"
                hasFeedback
                rules={[
                {
                    required: true,
                    message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                    validator(_, value) {
                    if (!value || getFieldValue('password1') === value) {
                        return Promise.resolve();
                    }

                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                    },
                }),
                ]}
            >
                <Input.Password />
            </Form.Item>
            <Form.Item
                wrapperCol={{
                offset: 8,
                span: 16,
                }}
                >
                <Button style={{marginRight: '10px'}} type="primary" htmlType="submit">
                    Signup
                </Button>
                    or
                <NavLink style={{marginLeft: '10px'}} to='/login/'>
                    Login
                </NavLink>
            </Form.Item>
            </Form>
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
        onAuth: (username, email, password1, password2) => dispatch(actions.authSignup(username, email, password1, password2))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);