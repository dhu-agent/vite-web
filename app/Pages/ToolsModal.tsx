import React, { useState, useEffect } from "react";
import {
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
  Button,
  message,
  Popconfirm,
  type PopconfirmProps,
} from "antd";
import axios from "axios";
const { TextArea } = Input;
const { Option } = Select;

const ToolConfigPanel = ({ data }: any) => {
  const [config, setConfig] = useState({
    tool_id: 1,
    name: "xxx",
    description: "xxx",
    inputs: "xxx",
    output_type: "xxx",
    update_time: "xxx",
  });
  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    console.log("data", data);
    setConfig((preState) => ({
      tool_id: data.tool_id,
      name: data.name,
      description: data.description,
      inputs: data.inputs,
      output_type: data.output_type,
      update_time: data.update_time,
    }));
  }, [data]);
  const handleCardClick = () => {};

  const handleDelete = async () => {
    const options = {
      method: "POST",
      url: `/v2/v1/tools/delete/${config.tool_id}`,
      headers: { "Content-Type": "application/json" },
    };

    try {
      const { data } = await axios.request(options);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
  const confirm: PopconfirmProps["onConfirm"] = async (e) => {
    await handleDelete();
    message.success("Click on Yes");
  };

  const cancel: PopconfirmProps["onCancel"] = (e) => {
    message.error("Click on No");
  };
  return (
    <div className="p-4">
      <Popconfirm
        title="Delete the task"
        description="Are you sure to delete this task?"
        onConfirm={confirm}
        onCancel={cancel}
        okText="Yes"
        cancelText="No"
        overlayStyle={{ maxWidth: '200px', whiteSpace: 'normal', wordWrap: 'break-word' }}
      >
        {/* 展示配置的卡片 */}
        <div
          onClick={handleCardClick}
          className="max-w-xs bg-gradient-to-br from-green-50 to-white border border-gray-200 rounded-xl shadow-lg p-4 m-2 transform transition duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer"
        >
          <h3 className="text-xl font-bold text-green-800">{config.name}</h3>
          <p className="text-sm text-gray-600">描述: {config.description}</p>
          <p className="text-sm text-gray-600">
            输出类型: {config.output_type}
          </p>
          <p className="text-sm text-gray-600">版本: {config.update_time}</p>
          <p className="text-gray-700 mt-2">点击此卡片查看或删除</p>
        </div>
      </Popconfirm>
    </div>
  );
};

export default ToolConfigPanel;
