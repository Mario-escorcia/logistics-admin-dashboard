import { AiOutlineDropbox, AiOutlineUser } from "react-icons/ai";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { VscError } from "react-icons/vsc";
import { LineLayerMap } from "../Graphs/LineLayerMap";
import "./homeData.css";
import { GaugeChart } from "../Graphs/GaugeChart";
import { LineChartComponent } from "../Graphs/LineChartComponent";
import { ShipmentsTable } from "../Tables/ShipmentsTable";

export const HomeData = () => {
  const generateRadomNumber = () => {
    const number: number = Math.ceil(Math.random() * 1000);
    return number;
  };

  return (
    <section className="home-data">
      <section className="home-data-cont-top">
        <div className="glass-bg">
          <div>
            <span
              style={{
                width: "1.8rem",
                height: "1.8rem",
                justifyContent: "center",
                alignItems: "center",
              }}
              className="home-data-cont-top-icon"
            >
              <AiOutlineDropbox color="var(--txt-color)" />
            </span>
          </div>
          <div>
            <p>shipements made this month</p>
            <span>
              <p>total shipments</p>
              {generateRadomNumber()}k
            </span>
          </div>
        </div>

        <div>
          <div>
            <span
              style={{
                width: "1.8rem",
                height: "1.8rem",
                justifyContent: "center",
                alignItems: "center",
              }}
              className="home-data-cont-top-icon"
            >
              <IoIosCheckmarkCircleOutline color="var(--txt-color)" />
            </span>
          </div>
          <div>
            <p>shipements completed this month</p>
            <span>
              <p>completed shipments</p>
              {generateRadomNumber()}k
            </span>
          </div>
        </div>
        <div>
          <div>
            <span
              style={{
                width: "1.8rem",
                height: "1.8rem",
                justifyContent: "center",
                alignItems: "center",
              }}
              className="home-data-cont-top-icon"
            >
              <AiOutlineUser color="var(--txt-color)" />
            </span>
          </div>
          <div>
            <p> new users this month</p>
            <span>
              <p>total users</p>
              {generateRadomNumber()}k
            </span>
          </div>
        </div>
        <div>
          <div>
            <span
              style={{
                width: "1.8rem",
                height: "1.8rem",
                justifyContent: "center",
                alignItems: "center",
              }}
              className="home-data-cont-top-icon"
            >
              <VscError color="var(--txt-color)" />
            </span>
          </div>
          <div>
            <p> returns made this month</p>
            <span>
              <p>total returns</p>
              {generateRadomNumber()}k
            </span>
          </div>
        </div>
      </section>
      <section className="home-data-cont-middle">
        <div
          style={{
            width: "75%",
            padding: "0",
          }}
        >
          <p>Live Shipment Tracking</p>
          <LineLayerMap></LineLayerMap>
        </div>
        <div
          style={{
            width: "25%",
          }}
        >
          <p>profit margin</p>

          <div>
            <GaugeChart></GaugeChart>
          </div>
        </div>
      </section>
      <section className="home-data-cont-bottom">
        <div
          style={{
            width: "35%",
            paddingBottom : ".6rem 0 0 0"
          }}
        >
          <p>shipment error summary</p>
          <div>
            <LineChartComponent/>
          </div>
        </div>
        <div
          style={{
            width: "65%",
          }}
        >
          <p>Recent shipements</p>

          <div>
            <ShipmentsTable/>
          </div>
        </div>
      </section>
    </section>
  );
};
