import React from 'react'
import { Form, Input, Button } from 'antd'
import 'antd/dist/antd.css'
import { styles } from '../Components/generalStyle'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'

const axios = require('axios').default
class Login extends React.Component {
  state = {
    id: '',
    username: '',
    password: '',
  }

  handleSubmit = () => {
    const { history } = this.props
    const { username, password } = this.state
    axios.post('https://assignment-api.dev.witsawa.com/users/login', { username, password })
      .then(response => {
        console.log('success', response)
        this.setState({id: response.data._id})
        history.push({ pathname: '/main', state: {...this.state} })
      })
      .catch(error => {
        console.log('error', error)
      })
  }

  onChangeUser = (e) => {
    this.setState({ username: e.target.value })
  }

  onChangePassword = (e) => {
    this.setState({ password: e.target.value })
  }

  render() {
    return (
      <div style={{ ...styles.background }}>
        <div style={{ ...styles.center }}>
          <div style={{ ...styles.centerBackground }}>
            <Form style={{ width: '100%', padding: '40px' }} onFinish={this.handleSubmit}>
              <div style={{ ...styles.textCenter, marginBottom: '8px' }}>Login</div>
              <Form.Item
                name='username'
                rules={[
                  {
                    required: true,
                    message: 'Please input your Username',
                  }
                ]}>
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Username"
                  onChange={value => this.onChangeUser(value)}
                />
              </Form.Item>
              <Form.Item
                name='password'
                rules={[
                  {
                    required: true,
                    message: 'Please input your password',
                  }
                ]}>
                <Input.Password
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                  onChange={value => this.onChangePassword(value)}
                />
              </Form.Item>
              <Form.Item>
                <Button style={{ ...styles.buttonLogin }} type="primary" htmlType="submit">
                  Log in
              </Button>
              </Form.Item>
              <div style={{ ...styles.registerLabel }}>
                Not a member?
              <Link style={{ paddingLeft: '3px' }} to={{ pathname: '/register' }}>register now!</Link>
              </div>
            </Form>
          </div>
        </div>
      </div>
    )
  }
}
export default Login