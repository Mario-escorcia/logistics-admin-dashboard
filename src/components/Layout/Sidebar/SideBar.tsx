import "./sidebar.css";
import { FaHome } from "react-icons/fa";
import { AiOutlineDropbox } from "react-icons/ai";
import { GoGraph } from "react-icons/go";
import { AiOutlineUser } from "react-icons/ai";
import { HiOutlineMapPin } from "react-icons/hi2";

export const SideBar = () => {
  return (
    <section className="sidebar">
      <span>MT</span>
      <div className="sidebar-icons-cont">
        <span><FaHome color="var(--txt-color)"></FaHome></span>
        <span><AiOutlineDropbox color="var(--txt-color)" /></span>
        <span><GoGraph color="var(--txt-color)" /></span>
        <span><AiOutlineUser color="var(--txt-color)" /></span>
        <span><HiOutlineMapPin color="var(--txt-color)" /></span>


      </div>
    </section>
  )
}
