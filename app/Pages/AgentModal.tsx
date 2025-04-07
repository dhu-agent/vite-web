import React, { useState, useEffect } from "react";
import { Modal, Form, Input, InputNumber, Select, Button, message } from "antd";
import axios from "axios";

const { TextArea } = Input;
const { Option } = Select;

// 模拟从后端加载版本数据的函数
const fetchVersions = async ({ assistant_id }: any) => {
  console.log("id", assistant_id);
  const options = {
    method: "POST",
    url: `http://localhost:2024/assistants/${assistant_id}/versions`,
    data: {}, // 添加一个空对象作为请求体
  };

  try {
    const { data } = await axios.request(options);
    console.log(data);
    return data;
  } catch (error) {
    return [1, 2, 3, 4, 5, 6];
    console.error(error);
  }
};

export const AgentConfigForm = ({ visible, onClose, config, onSave }: any) => {
  const [form] = Form.useForm();
  const [versions, setVersions] = useState([]);

  useEffect(() => {
    // 加载版本数据
    (async () => {
      try {
        const v = await fetchVersions(config);
        setVersions(v);
      } catch (err) {
        console.error("加载版本失败", err);
      }
    })();
  }, [config]);

  useEffect(() => {
    if (visible) {
      // 打开弹窗时，重置表单数据
      form.resetFields();
      form.setFieldsValue(config);
      console.log("versions", config);
    }
  }, [visible, config, form]);
  const handleVersionChange = async (version: any) => {
    const newconfig = versions[versions[0].version - version];
    console.log("newconfig", newconfig);
    if (newconfig) {
      form.setFieldsValue(newconfig);
      message.success(`已加载版本 ${newconfig.version} 的配置`);
    } else {
      message.error("加载版本数据失败");
    }
  };
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

        <Form.Item
          label="版本"
          name="version"
          rules={[{ required: false, message: "请选择版本" }]}
        >
          <Select
            placeholder="请选择版本"
            className="shadow-md"
            onChange={handleVersionChange}
          >
            {versions.map((ver: any) => (
              <Option key={ver.version} value={ver.version}>
                Version {ver.version}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

const AgentConfigPanel = ({ data }: any) => {
  const [config, setConfig] = useState({
    name: "Agent",
    assistant_id: "123456",
    coder_prompt: "请输入 coder_prompt 配置内容",
    max_search_results: 10,
    model: "openai/qwen-max",
    paper_prompt: "请输入 paper_prompt 配置内容",
    supervisor_prompt: "请输入 supervisor_prompt 配置内容",
    version: 18,
  });
  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    console.log("data", data);
    setConfig((preState) => ({
      assistant_id: data.assistant_id,
      name: data.name,
      coder_prompt: data.config.configurable
        ? data.config.configurable.coder_prompt
        : null,
      max_search_results: data.config.configurable
        ? data.config.configurable.max_search_results
        : null,
      model: data.config.configurable ? data.config.configurable.model : null,
      paper_prompt: data.config.configurable
        ? data.config.configurable.paper_prompt
        : null,
      supervisor_prompt: data.config.configurable
        ? data.config.configurable.supervisor_prompt
        : null,
      version: data.version,
    }));
  }, [data]);
  const handleCardClick = () => {
    setModalVisible(true);
  };

  const handleSave = async (newConfig: any) => {
    console.log("newConfig", newConfig);

    const options = {
      method: "PATCH",
      url: `http://localhost:2024/assistants/${config.assistant_id}`,
      headers: { "Content-Type": "application/json" },
      data: {
        graph_id: "agent",
        config: {
          configurable: {
            coder_prompt: newConfig.coder_prompt,
            max_search_results: newConfig.max_search_results,
            model: newConfig.model,
            paper_prompt: newConfig.paper_prompt,
            supervisor_prompt: newConfig.supervisor_prompt,
          },
        },
        metadata: {},
        name: newConfig.name,
      },
    };

    try {
      const { data } = await axios.request(options);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
    setConfig(newConfig);
  };

  return (
    <div className="p-4">
      {/* 展示配置的卡片 */}
      <div
        onClick={handleCardClick}
        className="max-w-xs bg-gradient-to-br from-green-50 to-white border border-gray-200 rounded-xl shadow-lg p-4 m-2 transform transition duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer"
      >
        <h3 className="text-xl font-bold text-green-800">{config.name}</h3>
        <p className="text-sm text-gray-600">模型: {config.model}</p>
        <p className="text-sm text-gray-600">
          最大搜索结果: {config.max_search_results}
        </p>
        <p className="text-sm text-gray-600">版本: {config.version}</p>
        <p className="text-gray-700 mt-2">点击此卡片查看或修改配置参数</p>
      </div>

      <AgentConfigForm
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        config={config}
        onSave={handleSave}
      />
    </div>
  );
};

export default AgentConfigPanel;