import React, { useState, useEffect } from "react";
import { Modal, Form, Input, InputNumber, Select, Button, message } from "antd";
import axios from "axios";

const { TextArea } = Input;
const { Option } = Select;

export const AddToolModal = ({ visible, onClose, config, onSave }: any) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible) {
      // 打开弹窗时，重置表单数据
      form.resetFields();
      form.setFieldsValue(config);
      console.log("versions", config);
    }
  }, [visible, config, form]);
  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      console.log("保存的配置:", values);
      // 触发保存回调，保存后后端生成新版本
      onSave(values);
      message.success("配置保存成功");
      onClose();
    } catch (errorInfo) {
      console.error("保存失败:", errorInfo);
    }
  };

  return (
    <Modal
      title="创建工具配置"
      open={visible}
      onOk={handleOk}
      onCancel={onClose}
      okText="保存配置"
      cancelText="取消"
      destroyOnClose
    >
      <Form form={form} layout="vertical" className="space-y-4">
        {/* 工具名称 */}
        <Form.Item
          label="Tool Name"
          name="name"
          rules={[{ required: true, message: "请输入工具名称" }]}
        >
          <Input placeholder="请输入工具名称" className="w-full shadow-md" />
        </Form.Item>
        {/* 工具描述 */}
        <Form.Item
          label="Tool Description"
          name="description"
          rules={[{ required: true, message: "请输入工具描述" }]}
        >
          <TextArea
            rows={3}
            placeholder="请输入工具描述"
            className="shadow-md"
          />
        </Form.Item>
        {/* 工具输入 */}
        <Form.Item
          label="Tool Inputs"
          name="inputs"
          rules={[{ required: true, message: "请输入工具输入" }]}
        >
          <Input placeholder="请输入工具输入" className="w-full shadow-md" />
        </Form.Item>
        {/* 工具输出类型 */}
        <Form.Item
          label="Tool Output Type"
          name="output_type"
          rules={[{ required: true, message: "请输入工具输出类型" }]}
        >
          <Input
            placeholder="请输入工具输出类型，例如 json, text 等"
            className="w-full shadow-md"
          />
        </Form.Item>
        {/* 工具代码 */}
        <Form.Item
          label="Tool Code"
          name="code"
          rules={[{ required: true, message: "请输入工具代码" }]}
        >
          <TextArea
            rows={6}
            placeholder="请输入工具代码，或通过文件上传方式提交代码，例如: 
{
  'name': 'print_hello',
  'description': '输出 hello world',
  'inputs: '任意字符串',
  'output_type': 'text',
  'code': 'print(\'Hello World!\')'
}"
            className="shadow-md"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
