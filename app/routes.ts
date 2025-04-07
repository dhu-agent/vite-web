import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [route('/','routes/home.tsx',[
    index('Pages/Session.jsx'),
    route('gallery','./Pages/Gallery.tsx',[
        index('./Pages/Agent.tsx'),
        // route('llm','./Pages/LLM.tsx'),
        route('tools','./Pages/Tools.tsx')
    ]),
])] satisfies RouteConfig;
