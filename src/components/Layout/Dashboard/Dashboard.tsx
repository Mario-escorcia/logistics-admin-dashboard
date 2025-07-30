import { Outlet } from "react-router-dom"
import { NavBar } from "../NavBar/NavBar"
import { SideBar } from "../Sidebar/SideBar"
import "./dashboard.css"

export const Dashboard = () => {
  return (
    <section className="dashboard">


      <div className="sidebar-dashboard-cont">
        <SideBar />
      </div>
      <div className="navbar-dashboard-cont">
        <NavBar></NavBar>
        <div className="app-content">
        <Outlet></Outlet>
        </div>
      </div>

    </section>
  )
}
