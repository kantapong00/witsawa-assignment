import React from 'react'
import { Button, Layout, Table, Input, Form, DatePicker, InputNumber, Modal } from 'antd'
import 'antd/dist/antd.css'
import { styles } from '../Components/generalStyle'
import { SettingOutlined, EditOutlined, DeleteFilled, CheckOutlined, CloseOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import MyModal from '../Components/modal'
import moment from 'moment'
import format from 'number-format.js'
import _ from 'lodash'

const { confirm } = Modal
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
    onEdit: false,
    isLoad: false,
    selectedID: null
  }

  UNSAFE_componentWillMount() {
    this.getTransactionByUserId()
  }

  UNSAFE_componentWillUpdate(nextState) {
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
    const { date, amount, description, userId, type, isLoad } = this.state
    axios.post('https://assignment-api.dev.witsawa.com/transactions', { user: userId, date, amount, type, remark: description })
      .then((response, resolve, reject) => {
        setTimeout(Math.random() > 0.5 ? resolve : reject, 1000)
        this.setState({ visible: false, confirmLoading: false, isLoad: !isLoad })
      })
      .catch(function (error) {
        console.log('error', error)
      })
  }

  onSubmitEdit = (id) => {
    const { selectedID, transactions } = this.state
    const newData = _.find(transactions, { '_id': id })
    axios.put(`https://assignment-api.dev.witsawa.com/transactions/${selectedID}`, { ...newData })
      .then(response => {
        this.setState({ onClickEdit: false, selectedID: null })
      })
      .catch(function (error) {
        console.log('error', error)
      })
  }

  onDelete = (id) => {
    axios.delete(`https://assignment-api.dev.witsawa.com/transactions/${id}`)
      .then(response => {
        this.setState({ onClickEdit: false, selectedID: null })
      })
      .catch(function (error) {
        console.log('error', error)
      })
  }

  showConfirm = (id) => {
    const { isLoad } = this.state
    confirm({
      title: 'Do you want to delete these items?',
      icon: <ExclamationCircleOutlined />,
      content: 'When clicked the OK button, this dialog will be closed after 1 second',
      onOk: () => {
        return new Promise((resolve, reject) => {
          this.onDelete(id)
          this.setState({ isLoad: !isLoad })
          setTimeout(Math.random() > 0.5 ? resolve : reject, 100)
        }).catch((err) => console.log('Oops errors!', err))
      },
      onCancel() { },
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

  onClickEdit = (id) => {
    this.setState({ onClickEdit: true, selectedID: id })
  }

  onCloseEdit = () => {
    this.setState({ onClickEdit: false, selectedID: null })
  }

  onChangeDate = (date, value, index) => {
    const { transactions } = this.state
    const selectedDate = moment(date).format('YYYY-MM-DD')
    const arr = [...transactions]
    arr[index].date = selectedDate
    this.setState({ transactions: arr })
  }

  onChangeDescribe = (e, remark, index) => {
    const { transactions } = this.state
    const arr = [...transactions]
    arr[index].remark = e.target.value
    this.setState({ transactions: arr })
  }

  onChangeAmount = (value, index) => {
    const { transactions } = this.state
    const arr = [...transactions]
    arr[index].amount = value
    this.setState({ transactions: arr })
  }

  render() {
    const { selectedID } = this.state
    const columns = [
      {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
        align: 'center',
        render: (text, record, index) => {
          return (
            <div>
              {record._id !== selectedID ? <div>{moment(text).format('DD MMM YYYY')}</div>
                :
                <div>
                  <DatePicker
                    defaultValue={moment(text)}
                    style={{ width: '236px' }}
                    onChange={(date, value) => this.onChangeDate(date, value, index)}
                  />
                </div>}
            </div>)
        }
      },
      {
        title: 'Remark',
        dataIndex: 'remark',
        key: 'remark',
        align: 'center',
        render: (text, record, index) => {
          return (
            <div>
              {record._id !== selectedID ? <div>{text}</div>
                :
                <div>
                  <Input
                    defaultValue={text}
                    placeholder="describe something"
                    onChange={(e, remark) => this.onChangeDescribe(e, remark, index)} />
                </div>}
            </div>)
        }
      },
      {
        title: 'Amount',
        dataIndex: 'amount',
        key: 'amount',
        align: 'right',
        render: (text, record, index) => {
          return (
            <div>
              {record._id !== selectedID ? <div>{format('#,##0.00', text)}</div>
                :
                <div>
                  <InputNumber
                    defaultValue={text}
                    min={0}
                    placeholder='0'
                    onChange={value => this.onChangeAmount(value, index)} />
                </div>}
            </div>)
        }
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
        align: 'center',
        render: (text, record, index) => {
          return (
            <div>
              {onClickEdit !== true ?
                <div>
                  <EditOutlined style={{ ...styles.editIcon }} onClick={() => this.onClickEdit(record._id)} />
                  <DeleteFilled style={{ ...styles.deleteIcon }} onClick={() => this.showConfirm(record._id)} />
                </div>
                :
                <div>
                  <CheckOutlined style={{ ...styles.editIcon }} onClick={() => this.onSubmitEdit(record._id)} />
                  <CloseOutlined style={{ ...styles.deleteIcon }} onClick={this.onCloseEdit} />
                </div>}
            </div>
          )
        }
      }
    ]
    const { visible, confirmLoading, type, transactions, onClickEdit } = this.state
    console.log('state', this.state)
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
            <Form>
              <Table dataSource={transactions} columns={columns} rowKey="_id" />
            </Form>
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