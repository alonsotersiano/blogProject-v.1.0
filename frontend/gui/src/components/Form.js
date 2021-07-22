import React from 'react';
import { Form, Input, Button } from 'antd';
import axios from 'axios';

class CustomForm extends React.Component{
    render() {
        const onFinish = (values, requestType, articleID) => {
            const title = values.title;
            const content = values.content;
    
            switch ( requestType ){
                case 'post':
                    return axios.post('http://127.0.0.1:8000/api/', {
                        title: title,
                        content: content
                    })
                    .then((res) => console.log(res))
                    .catch(error => console.err(error));
                case 'put':
                    return axios.put(`http://127.0.0.1:8000/api/${articleID}/`, {
                        title: title,
                        content: content
                    })
                    .then(res => console.log(res))
                    .catch(error => console.err(error));
                default:
                    console.log("Not found!")
            }
        };
      
        const onFinishFailed = (errorInfo) => {
            console.log("Failed:", errorInfo);
        };
        return (
        <Form
            layout="vertical"
            onFinish={(event) => onFinish(
                event, 
                this.props.requestType, 
                this.props.articleID,
            )}
            onFinishFailed={onFinishFailed}
        >
            <Form.Item label="Title" name="title">
                <Input name="title" placeholder="Enter a Title" />
            </Form.Item>
            <Form.Item label="Content" name="content">
                <Input
                    name="content"
                    placeholder="Enter the content here"
                />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    {this.props.btnText}
                </Button>
            </Form.Item>
        </Form>
        );
    };
};
export default CustomForm;