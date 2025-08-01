import "./navbar.css";
import { IoIosArrowDown } from "react-icons/io";

export const NavBar = () => {
  return (
    <div className="navbar">
      <h3>Dashboard</h3>
      <div className="navbar-menu-cont">
        <p>
          Mario Escorcia
        </p>
        <IoIosArrowDown color="var(--txt-color)"/>

      </div>
    </div>
  )
}
