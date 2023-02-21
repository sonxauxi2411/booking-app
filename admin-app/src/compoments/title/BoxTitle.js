import React, { useEffect, useState } from "react";
import instance from "../../utils/axios";

function BoxTitle({ fetchUrl, title, icon }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await instance.get(fetchUrl);
        console.log(res.data);
        setData(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [fetchUrl]);

  const styleIcon = () => {
    let classe = "p-1 rounded-2 bg-opacity-50";
    if (title === "users") return classe.concat(" ", "text-danger bg-danger");
    else if (title === "orders")
      return classe.concat(" ", "text-warning bg-warning");
    else if (title === "earnings")
      return classe.concat(" ", "text-success bg-success");
    else if (title === "balance")
      return classe.concat(" ", "text-info bg-info");
  };

  const textBody = () => {
    let text;
    if (title === "users") return (text = `0${data.length}`);
    else if (title === "orders") return (text = data.totalTransaction);
    else if (title === "earnings" || title === "balance")
      return (text = `$${data[0]?.total}`);

    return text;
  };

  return (
    <div
      className="card p-2 w-25"
      style={{
        border: "none",
        boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
      }}
    >
      <div className=" d-flex flex-column ">
        <span className="card-title text-uppercase text-black-50 fw-bold">
          {title}
        </span>
        <p className="card-text">{textBody()}</p>
        <div className="text-end d-flex justify-content-end">
          <span className={styleIcon() + "  p-1 d-flex "}>{icon}</span>
        </div>
      </div>
    </div>
  );
}

export default BoxTitle;
