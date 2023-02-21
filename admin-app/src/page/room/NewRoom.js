import React, { useState } from "react";
import { useFormik } from "formik";
import InputForm from "../../compoments/form/InputForm";
import * as Yup from "yup";
import useFetch from "../../hook/useFetch";
import instance from "../../utils/axios";
import { useLocation, useNavigate } from "react-router-dom";

function NewRoom() {
  const location = useLocation();
  const dataUpdate = location?.state?.item;
  const { data, error, loading } = useFetch("/hotel/all");
  const [hotelId, setHotelId] = useState("");

  //console.log(data);
  const navigate = useNavigate();
  const roomFormik = useFormik({
    initialValues: {
      title: dataUpdate?.title || "",
      price: dataUpdate?.price || "",
      desc: dataUpdate?.desc || "",
      maxPeople: dataUpdate?.maxPeople || "",
      rooms: dataUpdate?.roomNumbers.join(",") || "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required(),
      price: Yup.number().required(),
      desc: Yup.string().required(),
      maxPeople: Yup.number().required(),
      rooms: Yup.string().required(),
    }),
    onSubmit: async (values) => {
      try {
        const roomNumbers = values.rooms.split(",");
        //update room
        if (dataUpdate) {
          await instance.put(`/room/${dataUpdate._id}`, {
            ...values,
            roomNumbers: [...roomNumbers],
          });
        } else {
          //add rooms
          await instance.post(`/room/${hotelId}`, {
            ...values,
            roomNumbers: [...roomNumbers],
          });
        }
        navigate("/rooms");
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <div>
      <span>Add New Hotel</span>
      <div
        className="container p-3"
        style={{ boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px" }}
      >
        <form className="row row-cols-2 align-items-center ">
          <InputForm
            label="Title"
            name="title"
            placeholder="2 bed room"
            formik={roomFormik}
          />
          <InputForm
            label="Description"
            name="desc"
            placeholder="king size bed 1 bathroom"
            formik={roomFormik}
          />
          <InputForm
            label="Price"
            name="price"
            type="number"
            placeholder="100"
            formik={roomFormik}
          />
          <InputForm
            label="Max People"
            name="maxPeople"
            placeholder="2"
            type="number"
            formik={roomFormik}
          />
          <InputForm
            label="Rooms"
            name="rooms"
            placeholder="ex: 201,202,203"
            type="text"
            formik={roomFormik}
          />
          <div className="d-flex flex-column">
            <label>Choose a hotel</label>
            <select onChange={(e) => setHotelId(e.target.value)}>
              {data?.map((item) => {
                return (
                  <option key={item._id} value={item._id}>
                    {item.title}
                  </option>
                );
              })}
            </select>
          </div>
        </form>
        <div className="container mt-4">
          <div className="mt-3 ">
            <button
              type="submit"
              onClick={roomFormik.handleSubmit}
              className="btn btn-success w-25"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewRoom;
