import React, { cloneElement } from "react";
import useFetch from "../../hook/useFetch";

function TransactionItem({ item, index }) {
  const { data, loading, error } = useFetch(`/hotel/${item.hotel}`);
  //   console.log(data);
  const startDate = new Date(item.dateStart);
  const endDate = new Date(item.dateEnd);

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
  const checkDate = () => {
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
  // const a = [2332];
  //console.log(item);

  return (
    <tr className="border border-black-50 border-2">
      <td className="ps-2 border border-end border-2">0{index + 1}</td>
      <td className="ps-2 border border-end border-2">{data?.name}</td>
      <td className="ps-2 border border-end border-2">
        {item?.room?.map((r) => r.roomNumbers.join(", ")).join(", ")}
      </td>
      <td className="ps-2 border border-end border-2">
        {startDate.toLocaleDateString()} - {endDate.toLocaleDateString()}
      </td>
      <td className="ps-2 border border-end border-2">${item.price}</td>
      <td className="ps-2 border border-end border-2">{item.payment}</td>
      <td className="ps-2 border border-end border-2">
        <div>
          <span className={checkStatus(checkDate())}>{checkDate()}</span>
        </div>
      </td>
    </tr>
  );
}

export default TransactionItem;
