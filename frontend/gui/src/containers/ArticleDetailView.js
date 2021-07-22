import React from 'react';
import axios from 'axios';
import { Button, Card, Form } from 'antd';
import CustomForm from '../components/Form';
import { connect } from "react-redux";



class ArticleDetail extends React.Component {

    state = {
        article: {}
    }

    componentDidMount() {
        const articleID = this.props.match.params.articleID;
        axios.get(`http://127.0.0.1:8000/api/${articleID}`)
            .then(res => {
                this.setState({
                    article: res.data
                })
            })
    }

    handleDelete = (event) => {
        const articleID = this.props.match.params.articleID;
        axios.delete(`http://127.0.0.1:8000/api/${articleID}`);
        this.props.history.push('/');
    }

    render () {
        return (
            <div>
                <Card title={this.state.article.title}>
                    <p>
                        {this.state.article.content}
                    </p>
                </Card>
                <br />
                <CustomForm requestType="put" articleID={this.props.match.params.articleID} btnText="Update" />
                <Form onFinish={this.handleDelete}>
                    <Button type="primary" danger htmlType="submit">
                        Delete
                    </Button>
                </Form>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
      token: state.token
    };
  };

export default connect(mapStateToProps)(ArticleDetail);