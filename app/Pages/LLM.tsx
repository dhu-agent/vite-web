import { Button } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import {search_assistants} from '../api/api-service'
import AgentConfigPanel, { AgentConfigForm } from "./AgentModal";
import { AddAgentModal } from "./AddAgentModal";

const LLM = () => {
  const [data,setData]=useState([])
  const [visible, setVisible] = useState(false);
  const [config, setConfig] = useState({
    "name":"new agent",
    "recursion_limit":25
  });
  useEffect( () => {
   search_assistants()?.then(res=>{
    console.log(res)
    setData(res.data)
   })
  }, []);
  const handleClick = () => {
    setVisible(true);
  };
  const handleSave = (config: any) => {
  };
  return (
    <div className={"flex flex-col w-full"}>
      <div className={"flex justify-end pr-3 pt-3"}>
        <div>
        <Button size="large" type={"primary"} onClick={handleClick}>
            添加工具
          </Button>
          <AddAgentModal visible={visible} onClose={() => setVisible(false)} config={config} onSave={handleSave}></AddAgentModal>
        </div>
        
      </div>
      <div className="flex flex-row w-full max-w-full">
        {
          data.map((item:any)=>{
            return <AgentConfigPanel key={item.assistant_id} data={item}/>
          })
        }
      </div>
    </div>
  );
};
export default LLM;
