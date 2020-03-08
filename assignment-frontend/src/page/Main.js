import React from 'react'
import { Button, Layout, Table } from 'antd'
import 'antd/dist/antd.css'
import { styles } from '../Components/generalStyle'
import { SettingOutlined } from '@ant-design/icons'
import MyModal from '../Components/modal'
import moment from 'moment'
import format from 'number-format.js'

const axios = require('axios').default
const { Header, Content } = Layout;
class Main extends React.Component {
  state = {
    visible: false,
    confirmLoading: false,
    type: '',
    transactions: [],
    userId: this.props.location.state.id,
    date: '',
    amount: 0,
    description: '',
    isLoad: false
  }

 UNSAFE_componentWillMount(){
  this.getTransactionByUserId()
  }

  UNSAFE_componentWillUpdate(nextProps, nextState) {
    if (nextState.isLoad !== this.state.isLoad) {
      this.getTransactionByUserId()
      this.setState({ isLoad: nextState.isLoad })
    }
  }

  getTransactionByUserId = async () => {
    const { userId } = this.state
    await axios.get(`https://assignment-api.dev.witsawa.com/transactions?user=${userId}`)
      .then(response => {
        this.setState({ transactions: response.data })
      })
      .catch(e => {
        console.log(e)
      })
  }

  handleSubmit = () => {
    const { date, amount, description, userId, type,isLoad } = this.state
    axios.post('https://assignment-api.dev.witsawa.com/transactions', { user: userId, date, amount, type, remark: description })
      .then(response => {
        console.log('success', response)
        this.setState({ confirmLoading: true })
        setTimeout(() => {
          this.setState({ visible: false, confirmLoading: false, isLoad: !isLoad })
        }, 2000)
      })
      .catch(function (error) {
        console.log('error', error)
      })
  }

  showModalIncome = () => {
    this.setState({ visible: true, type: 'income' })
  }

  showModalExpense = () => {
    this.setState({ visible: true, type: 'expense' })
  }

  handleCancel = () => {
    this.setState({ visible: false })
  }

  parentSetter = (obj) => {
    this.setState(obj)
  }


  render() {
    const columns = [
      {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
        align: 'center',
        render: (text) => (
          <div>{moment(text).format('DD MMM YYYY')}</div>
        )
      },
      {
        title: 'Remark',
        dataIndex: 'remark',
        key: 'remark',
        align: 'center'
      },
      {
        title: 'Amount',
        dataIndex: 'amount',
        key: 'amount',
        align: 'right',
        render: (text) => (
          format('#,##0.00', text)
        )
      },
      {
        title: 'Type',
        dataIndex: 'type',
        key: 'type',
        align: 'center'
      },
      {
        title: 'Action',
        dataIndex: 'action',
        key: 'action',
        align: 'center'
      }
    ]
    const { visible, confirmLoading, type, transactions } = this.state
    console.log('stt', this.state)
    console.log('props', this.props)
    return (
      <div style={{ ...styles.background }}>
        <Layout style={{ flex: 1, display: 'table' }}>
          <Header style={{ ...styles.headerStyle }}>
            <div style={{ ...styles.headerText }}>Income and Expense Recording</div>
            <SettingOutlined style={{ ...styles.settingIcon }} />
          </Header>
          <Content style={{ ...styles.contentBackground }}>
            <div style={{ display: 'flex', justifyContent: 'flex-end', flexDirection: 'row', paddingTop: '24px' }}>
              <div style={{ paddingRight: '16px' }}>
                <Button
                  type="primary"
                  size='large'
                  style={{ ...styles.normalText, ...styles.incomeBtn }}
                  onClick={this.showModalIncome}
                >
                  Income
                </Button>
              </div>
              <div style={{ paddingRight: '24px' }}>
                <Button
                  type="primary"
                  size='large'
                  style={{ ...styles.normalText, ...styles.expenseBtn }}
                  onClick={this.showModalExpense}
                >
                  Expense
                </Button>
              </div>
            </div>
            <div style={{ ...styles.line }} />
            <Table dataSource={transactions} columns={columns} />
          </Content>
        </Layout>
        <MyModal
          parentSetter={this.parentSetter}
          visible={visible}
          confirmLoading={confirmLoading}
          onCancel={'none'}
          handleOk={this.handleSubmit}
          handleCancel={this.handleCancel}
          titleText={
            <div style={{ display: 'flex', justifyContent: 'center', ...styles.modalHeaderText }}>
              {type === 'income' ? 'Income Recording' : 'Expense Recording'}
            </div>
          }
          handleOkText='Submit'
          handleCancelText='Cancel'
        />
      </div >
    )
  }
}
export default Main