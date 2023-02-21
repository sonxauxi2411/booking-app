import React from "react";
import { Outlet } from "react-router-dom";
import BoxTitle from "../../compoments/title/BoxTitle";
import {
  BsPersonFill,
  BsCartFill,
  BsCurrencyDollar,
  BsWallet,
} from "react-icons/bs";
import ListTransaction from "../../compoments/transaction/ListTransaction";
//Endpoints
const resquest = {
  fetchUser: "/users",
  fetchTransactions: "/transaction/all",
  fetchEarnings: "/transaction/earnings",
  fetchAvgMonth: "/transaction/avgmonth",
};

function Dashboard() {
  return (
    <div className="d-flex flex-column gap-3">
      <div className="d-flex justify-content-between gap-3 pt-3 ">
        <BoxTitle
          fetchUrl={resquest.fetchUser}
          title="users"
          icon={<BsPersonFill />}
        />
        <BoxTitle
          fetchUrl={resquest.fetchTransactions}
          title="orders"
          icon={<BsCartFill />}
        />
        <BoxTitle
          fetchUrl={resquest.fetchEarnings}
          title="earnings"
          icon={<BsCurrencyDollar />}
        />
        <BoxTitle
          fetchUrl={resquest.fetchAvgMonth}
          title="balance"
          icon={<BsWallet />}
        />
      </div>
      <ListTransaction fetchUrl={resquest.fetchTransactions} />
      <Outlet />
    </div>
  );
}

export default Dashboard;
