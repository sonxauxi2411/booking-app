/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import useFetch from "../../hook/useFetch";
import instance from "../../utils/axios";
import Table from "../layout/Table";
import Hotel from "./Hotel";
import Name from "./Name";

//title Table
const titleTable = [
  "ID",
  "User",
  "Hotel",
  "Room",
  "Date",
  "price",
  "Payment Method",
  "Status",
];

function ListTransaction({ fetchUrl }) {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await instance.get(`${fetchUrl}?page=${page}`);
        setData(res.data);
        // console.log(res.data);
      } catch (error) {
        // console.log(error);
      }
    };
    fetchData();
  }, [fetchUrl, page]);

  //style status
  const checkStatus = (text) => {
    let classe;
    if (text === "Checkout") {
      classe = " rounded-4 p-1 text-success bg-secondary bg-opacity-50";
    } else if (text === "Booked") {
      classe = " rounded-4 p-1 text-success bg-danger bg-opacity-50";
    } else if (text === "Checkin") {
      classe = "rounded-4 p-1 text-success bg-success   bg-opacity-50";
    }
    return classe;
  };

  //check status
  const checkDate = (startDate, endDate) => {
    //  console.log(startDate, endDate);
    let text = "";
    const date = new Date();
    if (date < startDate) {
      text = "Booked";
    } else if (date > endDate) {
      text = "Checkout";
    } else if (date > startDate && date < endDate) {
      text = "Checkin";
    }
    return text;
  };

  return (
    <div>
      <p>Latest Transactions</p>
      <div>
        <Table title={titleTable}>
          {data?.result?.map((item) => {
            //đổi date
            const startDate = new Date(item.dateStart);
            const endDate = new Date(item.dateEnd);
            //console.log(item);

            return (
              <>
                <tr key={item._id} className="border-bottom">
                  <td className="p-2">{item._id}</td>
                  <td>
                    <Name userId={item.user} />
                  </td>
                  <td>
                    <Hotel hotelId={item.hotel} />
                  </td>
                  <td>
                    {item.room.map((i) => i.roomNumbers.join(",")).join(", ")}
                  </td>
                  <td>
                    {startDate.toLocaleDateString()} -{" "}
                    {endDate.toLocaleDateString()}
                  </td>
                  <td>${item.price}</td>
                  <td>{item.payment}</td>
                  <td>
                    <div>
                      <span
                        className={checkStatus(checkDate(startDate, endDate))}
                      >
                        {checkDate(startDate, endDate)}
                      </span>
                    </div>
                  </td>
                </tr>
              </>
            );
          })}
        </Table>
      </div>
    </div>
  );
}

export default ListTransaction;
