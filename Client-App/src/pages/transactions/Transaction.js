import React from "react";
import Header from "../../components/header/Header";
import HeaderTitle from "../../components/header/HeaderTitle";
import Navbar from "../../components/navbar/Navbar";
import useFetch from "../../hook/useFetch";
import { useSelector } from "react-redux";
import TransactionItem from "./TransactionItem";

function Transaction() {
  const userId = useSelector((state) => state.auth.login.currentUser).orther
    ._id;

  const { data, error, loading } = useFetch(`/transaction/user/${userId}`);
  // console.log(data);
  return (
    <div>
      <Navbar />
      <HeaderTitle />
      <div className="container">
        <h4>Your Transactions</h4>
        <div>
          <table className="table table-striped table-bordered border-black-50">
            <tr className="text-light  bg-info bg-gradient ">
              <th className="p-1 border-end border-2">#</th>
              <th className="p-1 border-end border-2">Hotel</th>
              <th className="p-1 border-end border-2">Room</th>
              <th className="p-1 border-end border-2">Date</th>
              <th className="p-1 border-end border-2">Price</th>
              <th className="p-1 border-end border-2">Payment Method</th>
              <th className="p-1 border-end border-2">Status</th>
            </tr>
            {data?.map((item, index) => {
              return (
                <TransactionItem key={item._id} item={item} index={index} />
              );
            })}
          </table>
        </div>
      </div>
    </div>
  );
}

export default Transaction;
