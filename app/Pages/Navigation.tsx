import React, { useState } from "react";
import {
  AppstoreOutlined,
  MailOutlined,
  OpenAIOutlined,
  SettingOutlined,
  ToolOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { redirect, useNavigate } from "react-router";
type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    label: "智能体",
    key: "/",
    icon: <OpenAIOutlined className={"scale-150"} />,
  },
  {
    label: "工具",
    key: "/tools",
    icon: <ToolOutlined className={"scale-150"} />,
    // icon: <MailOutlined />,
  },
  // {
  //   label: "大模型",
  //   key: "/llm",
  //   icon: <OpenAIOutlined className={"scale-150"} />,
  //   // icon: <MailOutlined />,
  // },
];

const App: React.FC = () => {
  const [current, setCurrent] = useState("mail");
  let navigate = useNavigate();
  const onClick: MenuProps["onClick"] = (e) => {
    navigate(`/gallery${e.key}`);
  };

  return (
    <Menu
      style={{
        fontSize: "18px", // 调整文字大小
        padding: "10px", // 调整内边距
        lineHeight: "50px", // 调整行高
      }}
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
    />
  );
};

export default App;
