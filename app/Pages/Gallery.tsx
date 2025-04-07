import Nav from './Navigation'
import {Outlet} from "react-router";

const Gallery = () => {
  return (
      <div className={"flex flex-col w-full"}>
        <Nav />
          <Outlet></Outlet>
      </div>
  )
 }
 export default Gallery