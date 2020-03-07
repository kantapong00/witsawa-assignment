import React from 'react'
import { Form, Input, Button, Layout, Table } from 'antd'
import 'antd/dist/antd.css'
import { styles } from '../Components/generalStyle'
import { Link } from 'react-router-dom'
import { SettingOutlined } from '@ant-design/icons'

// const axios = require('axios').default
const { Header, Content } = Layout;
class Main extends React.Component {
  state = {
    username: '',
    password: '',
  }
  render() {
    const data = [];
    for (let i = 0; i < 10; i++) {
      data.push({
        key: i,
        date: `Edward King ${i}`,
        type: `income`,
        amount: 1200,
        remark: `London, Park Lane no. ${i}`,
      });
    }
    const columns = [
      {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
      },
      {
        title: 'Type',
        dataIndex: 'type',
        key: 'type',
      },
      {
        title: 'Amount',
        dataIndex: 'amount',
        key: 'amount',
      },
      {
        title: 'Remark',
        dataIndex: 'remark',
        key: 'remark',
      }
    ]
    return (
      <div style={{ ...styles.background }}>
        <Layout style={{flex: 1, display: 'table'}}>
          <Header style={{ ...styles.headerStyle }}>
            <div style={{ ...styles.headerText }}>Income and Expense Recording</div>
            <SettingOutlined style={{ ...styles.settingIcon }} />
          </Header>
          <Content style={{ ...styles.contentBackground }}>
            <div style={{ ...styles.line }} />
            <Table dataSource={data} columns={columns} />
          </Content>
        </Layout>
      </div >
    )
  }
}
export default Main