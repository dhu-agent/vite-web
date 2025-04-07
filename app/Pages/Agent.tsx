import { Button } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import { search_assistants } from "../api/api-service";
import AgentConfigPanel, { AgentConfigForm } from "./AgentModal";
import { AddAgentModal } from "./AddAgentModal";

const Agent = () => {
  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [config, setConfig] = useState({
    name: "new agent",
    recursion_limit: 25,
  });
  useEffect(() => {
    search_assistants()?.then((res) => {
      console.log(res);
      setData(res.data);
    });
  }, []);
  const handleClick = () => {
    setVisible(true);
  };
  const handleSave = async (newConfig: any) => {
    const options = {
      method: "POST",
      url: "http://localhost:2024/assistants",
      headers: { "Content-Type": "application/json" },
      data: {
        assistant_id: "",
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
        if_exists: "raise",
        name:newConfig.name,
      },
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
            添加智能体
          </Button>
          <AddAgentModal
            visible={visible}
            onClose={() => setVisible(false)}
            config={config}
            onSave={handleSave}
          ></AddAgentModal>
        </div>
      </div>
      <div className="flex flex-row w-full max-w-full">
        {data.map((item: any) => {
          return <AgentConfigPanel key={item.assistant_id} data={item} />;
        })}
      </div>
    </div>
  );
};
export default Agent;
