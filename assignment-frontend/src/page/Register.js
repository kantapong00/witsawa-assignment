import React from 'react'
import { Form, Input, Button } from 'antd'
import 'antd/dist/antd.css'
import { styles } from '../Components/generalStyle'
import { Link } from 'react-router-dom'

const axios = require('axios').default
class Register extends React.Component {
  state = {
    username: '',
    password: ''
  }

  handleSubmit = () => {
    const { history } = this.props
    const { username, password } = this.state
    axios.post('https://assignment-api.dev.witsawa.com/users', { username, password })
      .then(() => {
        history.push({ pathname: '/' })
      })
      .catch(function (error) {
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
              <div style={{ ...styles.textCenter, marginBottom: '8px' }}>Register</div>
              <Form.Item
                name='username'
                rules={[{ required: true, message: 'Please input your Username' }]}>
                <Input
                  placeholder="Username"
                  onChange={value => this.onChangeUser(value)}
                />
              </Form.Item>
              <Form.Item
                name='password'
                rules={[{ required: true, message: 'Please input your password' }]}>
                <Input.Password
                  type="password"
                  placeholder="Password"
                  onChange={value => this.onChangePassword(value)}
                />
              </Form.Item>
              <Form.Item>
                <Button style={{ ...styles.buttonLogin }} type="primary" htmlType="submit">
                  Register
              </Button>
                <Button style={{ width: '100%', marginTop: '8px' }}>
                  <Link to={{ pathname: '/' }}>Cancel</Link>
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    )
  }
}
export default Register