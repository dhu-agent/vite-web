import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import Gallery from "../pages/Gallery"
import Session from "../pages/Session"
export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <Gallery />
  )
}
