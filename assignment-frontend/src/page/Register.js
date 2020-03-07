import React from 'react'
import { Form, Input, Button } from 'antd'
import 'antd/dist/antd.css'
import { styles } from '../Components/generalStyle'

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
            <div style={{ ...styles.textCenter, marginBottom: '8px' }}>Login</div>
            <Form.Item
              name='username'
              rules={[
                {
                  required: true,
                  message: 'Please input your Username',
                }
              ]}>
              <Input style={{}} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
            </Form.Item>
            <Form.Item
              name='password'
              rules={[
                {
                  required: true,
                  message: 'Please input your password',
                }
              ]}>
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Button style={{ ...styles.buttonLogin }} type="primary" htmlType="submit" className="login-form-button">
                Log in
              </Button>
            </Form.Item>
            <div style={{ ...styles.registerLabel }}>
              Not a member? <a style={{paddingLeft:'3px'}}>register now!</a>
            </div>
          </Form>
        </div>
      </div>
    )
  }
}
export default Register