import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import Gallery from "../pages/Gallery"
import Session from "../pages/Session"
import Sidebar from '../Components/Sidebar/Sidebar';
import { DataProvider } from "../Contexts/DataContext";
import { Outlet } from "react-router";
export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <DataProvider className="flex flex-col">
      <div className="flex flex-row">
      <Sidebar/>
      <Outlet/>
      </div>
    </DataProvider>
  )
}
