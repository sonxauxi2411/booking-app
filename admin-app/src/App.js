import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import Admin from "./page/admin/Admin";
import "./App.css";
import Home from "./page/home/Home";
import Layout from "./compoments/layout/Layout";
import Dashboard from "./page/dashboard/Dashboard";
import User from "./page/user/User";
import Hotels from "./page/hotel/Hotels";
import Rooms from "./page/room/Rooms";
import Transaction from "./page/transaction/Transaction";
import NewHotels from "./page/hotel/NewHotels";
import NewRoom from "./page/room/NewRoom";

function App() {
  return (
    <div className="">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/dashboard"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />
        <Route
          path="/users"
          element={
            <Layout>
              <User />
            </Layout>
          }
        />
        <Route
          path="/hotels"
          element={
            <Layout>
              <Hotels />
            </Layout>
          }
        />
        <Route
          path="/rooms"
          element={
            <Layout>
              <Rooms />
            </Layout>
          }
        />
        <Route
          path="/transactions"
          element={
            <Layout>
              <Transaction />
            </Layout>
          }
        />
        <Route
          path="/add-hotel"
          element={
            <Layout>
              <NewHotels />
            </Layout>
          }
        />
        <Route
          path="/add-room"
          element={
            <Layout>
              <NewRoom />
            </Layout>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
