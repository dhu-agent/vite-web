import React, { useState, useEffect } from "react";
import { Modal, Form, Input, InputNumber, Select, Button, message } from "antd";
import axios from "axios";

const { TextArea } = Input;
const { Option } = Select;

export const AddAgentModal = ({ visible, onClose, config, onSave }: any) => {
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
        title="配置 Agent 参数"
        open={visible}
        onOk={handleOk}
        onCancel={onClose}
        okText="保存配置"
        cancelText="取消"
        destroyOnClose
      >
        <Form form={form} layout="vertical" className="space-y-4">
          <Form.Item
            label="agent name"
            name="name"
            rules={[{ required: false, message: "请输入智能体的名称" }]}
          >
            <Input className="w-full shadow-md" />
          </Form.Item>
          <Form.Item
            label="Max Search Results"
            name="max_search_results"
            rules={[{ required: false, message: "请输入最大搜索结果数" }]}
          >
            <InputNumber min={1} className="w-full shadow-md" />
          </Form.Item>
          <Form.Item
            label="recursion_limit"
            name="recursion_limit"
            rules={[{ required: false, message: "最大循环次数" }]}
          >
            <InputNumber min={1} className="w-full shadow-md" />
          </Form.Item>
          <Form.Item
            label="Model"
            name="model"
            rules={[{ required: false, message: "请输入模型名称" }]}
          >
            <Input placeholder="例如 openai/qwen-max" className="shadow-md" />
          </Form.Item>
          <Form.Item
            label="Supervisor prompt"
            name="supervisor_prompt"
            rules={[{ required: false, message: "请输入 supervisor_prompt" }]}
          >
            <TextArea
              rows={4}
              placeholder="请输入 supervisor_prompt"
              className="shadow-md"
            />
          </Form.Item>
          <Form.Item
            label="Coder Prompt"
            name="coder_prompt"
            rules={[{ required: false, message: "请输入 coder_prompt" }]}
          >
            <TextArea
              rows={4}
              placeholder="请输入 coder_prompt"
              className="shadow-md"
            />
          </Form.Item>
          <Form.Item
            label="Paper Prompt"
            name="paper_prompt"
            rules={[{ required: false, message: "请输入 paper_prompt" }]}
          >
            <TextArea
              rows={4}
              placeholder="请输入 paper_prompt"
              className="shadow-md"
            />
          </Form.Item>

        </Form>
      </Modal>
    );
  };
  