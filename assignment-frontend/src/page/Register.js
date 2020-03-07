import React from 'react'
import { Form, Input, Button } from 'antd'
import 'antd/dist/antd.css'
import { styles } from '../Components/generalStyle'
import { Link } from 'react-router-dom'

class Register extends React.Component {
  render() {

    const validateMessages = {
      types: {
        username: 'Please input username',
        password: 'Please input password',
      }
    }

    const onFinish = values => {
      console.log('Received values of form: ', values);
    }

    return (
      <div style={{ ...styles.background }}>
        <div style={{ ...styles.centerBackground }}>
          <Form style={{ width: '100%', padding: '40px' }} onFinish={onFinish} validateMessages={validateMessages}>
            <div style={{ ...styles.textCenter, marginBottom: '8px' }}>Register</div>
            <Form.Item
              name='username'
              rules={[
                {
                  required: true,
                  message: 'Please input your Username',
                }
              ]}>
              <Input placeholder="Username" />
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
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item
              name='confirm'
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password',
                }
              ]}>
              <Input.Password
                type="password"
                placeholder="Confirm Password"
              />
            </Form.Item>
            <Form.Item>
              <Button style={{ ...styles.buttonLogin }} type="primary" htmlType="submit">
                Register
              </Button>
              <Button style={{ width: '100%', marginTop: '8px' }}>
                <Link to={{pathname: '/'}}>Cancel</Link>
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    )
  }
}
export default Register