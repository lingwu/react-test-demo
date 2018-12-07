import { Component } from 'react';
import { Modal, Form, Input } from 'antd';
// import { getFileItem } from '_antd@3.11.0@antd/lib/upload/utils';

const FormItem = Form.Item;

class UserEditModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    }
  }

  showModalHandle = (e) => {
    if (e) e.stopPropagation();
    this.setState({
      visible: true
    })
  }

  hideModalHandle = () => {
    this.setState({
      visible: false
    })
  }

  okHandle = () =>{
    const {onOk} =this.props;
    this.props.form.validateFields((err,values)=>{
      if(!err){
        onOk(values);
        this.hideModalHandle();
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        span: 6
      },
      wrappweCol: {
        span: 14
      }
    };
    const {name,email,website} = this.props.record;
    const {children} = this.props;



    return (
      <span>
        <span onClick={this.showModalHandle}>
          {children}
        </span>
        <Modal title='Edit User' visible={this.state.visible}>
          <Form horizonal>
            <FormItem label='Name' {...formItemLayout}>
              {
                getFieldDecorator('name', {
                  initialValue: name
                })(<Input />)
              }
            </FormItem>
            <FormItem label='Email' {...formItemLayout}>
              {
                getFieldDecorator('email', {
                  initialValue: email
                })(<Input />)
              }
            </FormItem>
            <FormItem label='Website' {...formItemLayout}>
              {
                getFieldDecorator('website', {
                  initialValue: website
                })(<Input />)
              }
            </FormItem>
          </Form>
        </Modal>
      </span>
    )
  }
}

export default Form.create()(UserEditModal)
