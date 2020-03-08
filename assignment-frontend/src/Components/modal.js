import React from 'react'
import { Form, Modal, Button, Input, DatePicker, InputNumber } from 'antd'
import { styles } from './generalStyle'
import { lebleRedStar } from './basicComponent'
import moment from 'moment'

export default class MyModal extends React.Component {
  onChangeDate = (value) => {
    const { parentSetter } = this.props
    const selectedDate = moment(value).format('YYYY-MM-DD')
    parentSetter({ date: selectedDate })
  }

  onChangeAmount = (value) => {
    const { parentSetter } = this.props
    parentSetter({ amount: value })
  }

  onChangeDescribe = (e) => {
    const { parentSetter } = this.props
    parentSetter({ description: e.target.value })
  }

  render() {
    return (
      <div>
        <Modal
          title={this.props.titleText}
          closable={false}
          footer={null}
          visible={this.props.visible}
          confirmLoading={this.props.confirmLoading}
        >
          <Form style={{ width: '100%' }} onFinish={this.handleSubmit}>
            {lebleRedStar('Date', true)}
            <Form.Item name='date' rules={[{ required: true, message: 'Please select date' }]}>
              <DatePicker
                style={{ width: '236px' }}
                onChange={value => this.onChangeDate(value)}
              />
            </Form.Item>
            {lebleRedStar('Amount', true)}
            <Form.Item name='amount' rules={[{ required: true, message: 'Please input amount' }]}>
              <InputNumber
                min={0}
                placeholder='0'
                onChange={value => this.onChangeAmount(value)} />
            </Form.Item>
            {lebleRedStar('Description')}
            <Form.Item>
              <Input placeholder="describe something" onChange={value => this.onChangeDescribe(value)} />
            </Form.Item>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                style={{ width: '115px', marginRight: '16px' }}
                size='large'
                onClick={this.props.handleCancel}>
                {this.props.handleCancelText}
              </Button>
              <Button
                style={{ ...styles.incomeBtn }}
                size='large'
                onClick={this.props.handleOk}
                type="primary"
              >
                {this.props.handleOkText}
              </Button>
            </div>
          </Form>
        </Modal>
      </div>
    )
  }
}
