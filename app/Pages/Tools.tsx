import { Button } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import { list_tools, search_assistants } from "../api/api-service";
import AgentConfigPanel, { AgentConfigForm } from "./AgentModal";
import { AddAgentModal } from "./AddAgentModal";
import ToolConfigPanel from "./ToolsModal";
import { AddToolModal } from "./AddToolsModal";

const Tools = () => {
  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [config, setConfig] = useState({
  });
  useEffect(() => {
    list_tools()?.then((res) => {
      console.log(res);
      setData(res.data);
    });
  }, []);
  const handleClick = () => {
    setVisible(true);
  };
  const handleSave = async (newConfig: any) => {
    const formData = new FormData();
    formData.append("name", newConfig.name);
    formData.append("description", newConfig.description);
    formData.append("inputs", newConfig.inputs);
    formData.append("output_type", newConfig.output_type);
    formData.append("code", newConfig.code);
    
    const options = {
      method: "POST",
      url: "/v2/v1/tools/add",
      headers: {
        // 这里不要手动设置 Content-Type，浏览器会自动处理 boundary
        // "Content-Type": "multipart/form-data",
      },
      data: formData,
    };
    
    try {
      const { data } = await axios.request(options);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className={"flex flex-col w-full"}>
      <div className={"flex justify-end pr-3 pt-3"}>
        <div>
          <Button size="large" type={"primary"} onClick={handleClick}>
            添加工具
          </Button>
          <AddToolModal
            visible={visible}
            onClose={() => setVisible(false)}
            config={config}
            onSave={handleSave}
          ></AddToolModal>
        </div>
      </div>
      <div className="flex flex-row w-full max-w-full">
        {data.map((item: any) => {
          return <ToolConfigPanel key={item.tool_id} data={item} />;
        })}
      </div>
    </div>
  );
};
export default Tools;
