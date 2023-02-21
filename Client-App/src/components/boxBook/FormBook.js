import { useFormik } from "formik";
import React, { useState, useEffect } from "react";
import { DateRange } from "react-date-range";
import { useDispatch, useSelector } from "react-redux";
import useFetch from "../../hook/useFetch";
import { bookingActions } from "../../redux/booking";
import ReserveInput from "../form/ReserveInpu";
import instance from "../../utils/axios";
import { Navigate, useNavigate } from "react-router-dom";

function FormBook({ hotelId }) {
  // console.log(hotelId);
  const total = useSelector((state) => state.booking.total);
  const rooms = useSelector((state) => state.booking.rooms);
  const dates = useSelector((state) => state.search.dates);
  const user = useSelector((state) => state.auth.login.currentUser).orther;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [payment, setPayment] = useState("Master Card ");
  const [date, setDate] = useState(
    //ref lại trang ko tim thấy search date thì đặt ngày mặc định
    dates.length === 0
      ? [
          {
            startDate: new Date(),
            endDate: new Date(),
            key: "selection",
          },
        ]
      : //lấy date search
        dates
  );

  const { data, error, loading } = useFetch(`/hotel/rooms/${hotelId}`);

  const endDate = new Date(date[0].endDate);
  const startDate = new Date(date[0].startDate);
  //tính tổng ngày booking
  const diffTime = endDate.getTime() - startDate.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  const handlerDateRange = (item) => {
    setDate([item.selection]);
  };

  //xử lý checked lấy room
  const handleSelect = (item, e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    console.log(rooms);
    dispatch(
      bookingActions.addRooms({
        value,
        checked,
        price: item.price,
        roomId: item._id,
        day: diffDays,
      })
    );
  };

  //sự dụng formik tạo form
  const reserveFrom = useFormik({
    initialValues: {
      fullName: user.fullName || "",
      email: user.email || "",
      phoneNumber: user.phoneNumber || "",
      cardNumber: "",
    },
    //submit add transaction
    onSubmit: async (values) => {
      try {
        //check rooms
        if (rooms.length === 0) {
          window.alert("selectd room");
        } else {
          // console.log(rooms);

          const sendData = await instance.post("/transaction", {
            userId: user._id,
            hotelId: hotelId,
            rooms: rooms,
            dateEnd: endDate,
            dateStart: startDate,
            price: total,
            payment: payment,
          });
          navigate("/transaction");
        }
      } catch (error) {
        console.log(error);
      }
    },
  });
  //data check room transaction date
  const { data: checkDate } = useFetch(
    `/transaction/hotel/?id=${hotelId}&dateStart=${startDate}&dateEnd=${endDate}`
  );

  return (
    <div className="d-flex flex-column gap-3">
      <div className="info-booking row justify-content-center align-items-center">
        <div className="col">
          <h4 className="fw-bold">Dates</h4>
          <DateRange
            editableDateInputs={true}
            onChange={handlerDateRange}
            moveRangeOnFirstSelection={false}
            ranges={date}
            minDate={new Date()}
          />
        </div>
        <div className="from col w-100">
          <h4 className="fw-bold">Reserve Info</h4>
          <from className="d-flex flex-column gap-2">
            <ReserveInput
              name="fullName"
              placeholder="Full Name"
              label="Your Full Name"
              formik={reserveFrom}
            />
            <ReserveInput
              name="email"
              placeholder="Email"
              label="Your Email"
              formik={reserveFrom}
            />
            <ReserveInput
              name="phoneNumber"
              placeholder="Phone Number"
              label="Your Phone Number"
              formik={reserveFrom}
            />
            <ReserveInput
              name="cardNumber"
              placeholder="Card Number "
              label="Your Identity Card Number"
              formik={reserveFrom}
            />
          </from>
        </div>
      </div>
      <div className="select-room">
        <h4 className="fw-bold">Select Rooms</h4>
        <div className="select-item d-flex gap-3 align-items-center gap-5 flex-wrap">
          {data?.map((item, index) => {
            return (
              <div key={index} className="d-flex gap-4">
                <div className="title d-flex flex-column ">
                  <span className="fw-semibold">{item.title}</span>
                  <span>
                    max people :{" "}
                    <span className="fw-semibold">{item.maxPeople}</span>{" "}
                  </span>
                  <span className="fw-semibold">${item.price}</span>
                </div>
                <div className="d-flex gap-2">
                  {/* sự dụng chekDate để tạo checkbox */}
                  {checkDate?.dataRooms
                    ?.filter((i) => {
                      return i.room_id.toString() === item._id.toString();
                    })[0]
                    .result?.map((e) => {
                      return (
                        <div key={index} className="check">
                          <div className="d-flex  flex-column">
                            <label className="text-dark">{e.roomNumber}</label>
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value={e.roomNumber}
                              onChange={(e) => handleSelect(item, e)}
                              disabled={!e.available}
                            />
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="d-flex gap-5 align-items-center">
        <div className="d-flex flex-column">
          <h4 className="fw-bold">Total Bill: ${total}</h4>
          <select value={payment} onChange={(e) => setPayment(e.target.value)}>
            <option value="credit card">credit card</option>
            <option value="Master Card ">Master Card </option>
            <option value="Paypal">Paypal</option>
          </select>
        </div>
        <div>
          <button
            onClick={reserveFrom.handleSubmit}
            className="btn btn-primary"
          >
            Reserve Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default FormBook;
