import React, { Component } from 'react';
import { Drawer, Form, Button, Col, Row, Input, Select, Icon,Tooltip,Divider } from 'antd';

const { Option } = Select;

const { TextArea } = Input;


class DrawerForm extends Component {
    state = { visible: false,
              component:[],
              componentnum:0,
             };

    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };

    onClose = () => {
        this.setState(
            {
                visible: false,
            }
        );
    };

    onAdd = () => {
        const { getFieldDecorator } = this.props.form;
        const productrender=(
            <div>
                <Divider />
                <Row gutter={16}>
                    <Col span={8}>
                        <Form.Item label="产品名称">
                            {getFieldDecorator('name', {
                                rules: [{required: true, message: '产品名称'}],
                            })(<Input placeholder="产品名称"/>)}
                        </Form.Item>
                    </Col>
                    <Col span={16}>
                        <Form.Item label="数量">
                            {getFieldDecorator('number', {
                                rules: [{message: '数量'}],
                            })(<Input placeholder="数量"/>)}
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={8}>
                        <Form.Item label="快递公司">
                            {getFieldDecorator('company', {
                                rules: [{required: true, message: '快递公司'}],
                            })(<Select placeholder="快递公司" defaultValue="无">
                                <Option value="无">无</Option>
                                <Option value="4PX">4PX</Option>
                                <Option value="澳邮">澳邮</Option>
                                <Option value="迅达">迅达</Option>
                                <Option value="其他">其他</Option>
                            </Select>)}
                        </Form.Item>
                    </Col>
                    <Col span={16}>
                        <Form.Item label="付款情况">
                            {getFieldDecorator('finish', {
                                rules: [{message: '付款情况'}],
                            })(<Select placeholder="付款情况" >
                                <Option value="1">已付款</Option>
                                <Option value="0">未付款</Option>
                            </Select>)}
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item label="备注">
                            {getFieldDecorator('company', {
                                rules: [{required: true, message: 'remark'}],
                            })(<TextArea rows={2} placeholder="备注"/>)}
                        </Form.Item>
                    </Col>

                </Row>
            </div>

        )
        let data=this.state.component;
        let componentnum= this.state.componentnum
        componentnum++;
        data.push(productrender)
        this.setState(
            {
                component: data,
                componentnum:componentnum,
            }
        );
    };

    onDelete = () => {
        const { getFieldDecorator } = this.props.form;

        let data=this.state.component;
        let componentnum= this.state.componentnum
        componentnum--;
        data.pop()
        this.setState(
            {
                component: data,
                componentnum:componentnum,
            }
        );
    };



    render() {
        const { getFieldDecorator } = this.props.form;



        return (
            <div>
                <Button type="primary" onClick={this.showDrawer}>
                    <Icon type='plus'/>新订单
                </Button>
                <Drawer
                    title="新订单"
                    width={500}
                    placement="right"
                    onClose={this.onClose}
                    maskClosable={false}
                    visible={this.state.visible}
                    style={{
                        height: 'calc(100% - 55px)',
                        overflow: 'auto',
                        paddingBottom: 53,
                    }}
                >
                    <Form layout="vertical" hideRequiredMark>
                        <Row gutter={16}>
                            <Col span={8}>
                                <label>客户信息：</label>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={8}>
                                <Form.Item label="名称">
                                    {getFieldDecorator('name', {
                                        rules: [{ required: true, message: '用户名称' }],
                                    })(<Input placeholder="用户名称" />)}
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label="会员">
                                    {getFieldDecorator('member', {
                                        rules: [{ required: true, message: '是否为会员' }],
                                    })(

                                        <Select placeholder="是否为会员">
                                        <Option value="1">1</Option>
                                        <Option value="0">0</Option>
                                        </Select>
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label="地址">
                                    {getFieldDecorator('address', {
                                        rules: [{ required: true, message: '邮寄地址' }],
                                    })(<Input placeholder="邮寄地址" />)}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={8}>
                                <Form.Item label="订单号">
                                    {getFieldDecorator('ordernum', {
                                        rules: [{ required: true, message: '订单号' }],
                                    })(<Input placeholder="订单号" />)}
                                </Form.Item>
                            </Col>
                            <Col span={16}>
                                <Form.Item label="备注">
                                    {getFieldDecorator('remark', {
                                        rules: [{message: '备注' }],
                                    })(<Input placeholder="备注" />)}
                                </Form.Item>
                            </Col>
                        </Row>
                        <hr/>
                        <Row gutter={16}>
                            <Col span={8}>
                                <label>产品信息：</label>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={8}>
                                <Form.Item label="产品名称">
                                    {getFieldDecorator('name', {
                                        rules: [{required: true, message: '产品名称'}],
                                    })(<Input placeholder="产品名称"/>)}
                                </Form.Item>
                            </Col>
                            <Col span={16}>
                                <Form.Item label="数量">
                                    {getFieldDecorator('number', {
                                        rules: [{message: '数量'}],
                                    })(<Input placeholder="数量"/>)}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={8}>
                                <Form.Item label="快递公司">
                                    {getFieldDecorator('company', {
                                        rules: [{required: true, message: '快递公司'}],
                                    })(<Select placeholder="快递公司" defaultValue="无">
                                            <Option value="无">无</Option>
                                            <Option value="4PX">4PX</Option>
                                            <Option value="澳邮">澳邮</Option>
                                            <Option value="迅达">迅达</Option>
                                            <Option value="其他">其他</Option>
                                        </Select>)}
                                </Form.Item>
                            </Col>
                            <Col span={16}>
                                <Form.Item label="付款情况">
                                    {getFieldDecorator('finish', {
                                        rules: [{message: '付款情况'}],
                                    })(<Select placeholder="付款情况" >
                                        <Option value="1">已付款</Option>
                                        <Option value="0">未付款</Option>
                                    </Select>)}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item label="备注">
                                    {getFieldDecorator('company', {
                                        rules: [{required: true, message: 'remark'}],
                                    })(<TextArea rows={2} placeholder="备注"/>)}
                                </Form.Item>
                            </Col>

                        </Row>

                        <div>
                            {this.state.component}
                        </div>
                        <Tooltip placement="bottom" title="添加产品" arrowPointAtCenter>
                        <Button onClick={this.onAdd} type='primary' shape='circle'><Icon type='plus'/></Button>
                        </Tooltip>
                        {this.state.componentnum ?
                            (
                                <Tooltip placement="bottom" title="删除产品"  arrowPointAtCenter>
                                    <Button onClick={this.onDelete} type='danger' shape='circle' style={{'marginLeft':'5px'}}><Icon
                                        type='minus'/></Button>
                                </Tooltip>
                            ) :(<span/>)
                        }
                    </Form>
                    <div
                        style={{
                            position: 'absolute',
                            bottom: 0,
                            width: '100%',
                            borderTop: '1px solid #e8e8e8',
                            padding: '10px 16px',
                            textAlign: 'right',
                            left: 0,
                            background: '#fff',
                            borderRadius: '0 0 4px 4px',
                        }}
                    >

                        <Button
                            style={{
                                marginRight: 8,
                            }}
                            onClick={this.onClose}
                        >
                            Cancel
                        </Button>
                        <Button onClick={this.onClose} type="primary">Submit</Button>
                    </div>
                </Drawer>
            </div>
        );
    }
}

export default DrawerForm;