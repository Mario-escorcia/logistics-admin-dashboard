import "./sidebar.css";
import { FaHome } from "react-icons/fa";
import { AiOutlineDropbox } from "react-icons/ai";
import { GoGraph } from "react-icons/go";
import { AiOutlineUser } from "react-icons/ai";
import { HiOutlineMapPin } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export const SideBar = () => {
  const navigate = useNavigate();
  const [currentPath, setCurrentPath] = useState("");
  const redirect = (path: string) => {
    const basePath = "/app/";

    if (path == "/app") {
      navigate(path);
    } else {
      navigate(basePath + path);
    }
  };

  useEffect(() => {
    let location = window.location;
    setCurrentPath(location.pathname);
  }, [window.location.pathname]);

  return (
    <section className="sidebar">
      <span>MT</span>
      <div className="sidebar-icons-cont">
        <span
          style={{
            background: currentPath == "/app" ? "var(--glass-bg)" : "",
          }}
          onClick={() => {
            redirect("/app");
          }}
        >
          <FaHome color="var(--txt-color)"></FaHome>
        </span>
        <span
          style={{
            background: currentPath == "/app/orders" ? "var(--glass-bg)" : "",
          }}
          onClick={() => {
            redirect("orders");
          }}
        >
          <AiOutlineDropbox color="var(--txt-color)" />
        </span>
        <span
          style={{
            background:
              currentPath == "/app/statistics" ? "var(--glass-bg)" : "",
          }}
          onClick={() => {
            redirect("statistics");
          }}
        >
          <GoGraph color="var(--txt-color)" />
        </span>
        <span
          style={{
            background: currentPath == "/app/users" ? "var(--glass-bg)" : "",
          }}
          onClick={() => {
            redirect("users");
          }}
        >
          <AiOutlineUser color="var(--txt-color)" />
        </span>
        <span
          style={{
            background:
              currentPath == "/app/live-tracking" ? "var(--glass-bg)" : "",
          }}
          onClick={() => {
            redirect("live-tracking");
          }}
        >
          <HiOutlineMapPin color="var(--txt-color)" />
        </span>
      </div>
    </section>
  );
};
