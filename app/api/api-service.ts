import axios from "axios";

 export  function search_assistants() {
    const options = {
        method: "POST",
        url: "http://localhost:2024/assistants/search",
        headers: { "Content-Type": "application/json" },
        data: { metadata: {}, graph_id: "agent", limit: 10, offset: 0 },
      };
  
      try {
        return  axios.request(options);
      } catch (error) {
        console.error(error);
      }
}
export function list_tools(){
  const options = {
    method: "GET",
    url: "/v2/v1/tools/list",
    headers: { "Content-Type": "application/json" },
  };

  try {
    return  axios.request(options);
  } catch (error) {
    console.error(error);
  }
}