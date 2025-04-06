import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [route('/','routes/home.tsx',[
    index('Pages/Session.jsx'),
    route('gallery','./Pages/Gallery.jsx'),
])] satisfies RouteConfig;
