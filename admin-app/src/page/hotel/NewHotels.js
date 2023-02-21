import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import InputForm from "../../compoments/form/InputForm";
import useFetch from "../../hook/useFetch";
import CreatableSelect from "react-select/creatable";
import * as Yup from "yup";
import instance from "../../utils/axios";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function NewHotels() {
  const location = useLocation();
  const dataUpdate = location.state;

  console.log(dataUpdate);

  const { data, error, loading } = useFetch("/room/all");
  const [valueSelect, setValueSelect] = useState([]);
  const [image, setImage] = useState(null);
  const [featured, setFeatured] = useState(false);

  const navigate = useNavigate();
  //lấy rooms
  // const roomData = data?.map((room) => {
  //   return {
  //     _id: room._id,
  //     value: room.title,
  //     label: room.title,
  //   };
  // });
  // console.log(data);
  // const defaultRoom = dataUpdate?.rooms?.map((roomId) => {
  //   let found = roomData?.find((r) => r._id === roomId);
  //   console.log(found);
  //   return found;
  // });
  // console.log(roomData);

  //console.log(defaultValueRoom);

  const hotelFormik = useFormik({
    initialValues: {
      name: dataUpdate?.name || "",
      city: dataUpdate?.city || "",
      distance: dataUpdate?.distance || "",
      desc: dataUpdate?.desc || "",
      type: dataUpdate?.type || "",
      address: dataUpdate?.address || "",
      title: dataUpdate?.title || "",
      cheapestPrice: dataUpdate?.cheapestPrice || "",
      image: dataUpdate?.photos || null,
    },
    //valida required
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      city: Yup.string().required("Required"),
      title: Yup.string().required("Required"),
      cheapestPrice: Yup.number().required("Required"),
      distance: Yup.string().required("Required"),
      type: Yup.string().required("Required"),
      address: Yup.string().required("Required"),
      desc: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        const image = values.image;
        // console.log(valueSelect);
        const listImage = await Promise.all(
          //lập qua các image vừa thêm
          Object.values(image).map(async (file) => {
            const formData = new FormData();
            //  console.log(file);
            formData.append("file", file);
            formData.append("upload_preset", "uazrkxzi");
            formData.append("cloud_name", "dqmhwqfvz");
            //post image lên cloudinary
            const res = await axios.post(
              "https://api.cloudinary.com/v1_1/dqmhwqfvz/image/upload",
              formData
            );
            // console.log(res.data);

            const { url } = res.data;

            return url || "";
          })
        );
        //update hotel
        if (dataUpdate) {
          console.log(valueSelect);
          await instance.put(`/hotel/${dataUpdate._id}`, {
            ...values,
            ...featured,
            rooms: valueSelect,
            photos: listImage,
          });
        } else {
          //add hotel
          await instance.post("/hotel/add", {
            ...values,
            ...featured,
            rooms: valueSelect,
            photos: listImage,
          });
        }

        navigate("/hotels");
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
            label="Name"
            name="name"
            placeholder="My Hotel"
            formik={hotelFormik}
          />
          <InputForm
            label="Type"
            name="type"
            placeholder="Hotel"
            formik={hotelFormik}
          />
          <InputForm
            label="City"
            name="city"
            placeholder="Nha Trang"
            formik={hotelFormik}
          />
          <InputForm
            label="Address"
            name="address"
            placeholder="Tran Phu st"
            formik={hotelFormik}
          />
          <InputForm
            label="Title"
            placeholder="The Best Hotel"
            name="title"
            formik={hotelFormik}
          />
          <InputForm
            label="Desctiption"
            placeholder="Desctiption"
            name="desc"
            formik={hotelFormik}
          />
          <InputForm
            label="Price"
            placeholder="100"
            type="number"
            name="cheapestPrice"
            formik={hotelFormik}
          />
          <div style={{ cursor: "pointer" }}>
            <label>Image</label>
            <input
              className={`form-control ${
                hotelFormik.errors.image && "is-invalid"
              }`}
              type="file"
              name="image"
              multiple
              // onChange={(e) => {
              //   setImage(e.target.files);
              // }}
              onChange={(e) => {
                hotelFormik.setFieldValue("image", e.target.files);
              }}
            />
          </div>
          <InputForm
            label="Distance Form City Center"
            placeholder="500"
            type="text"
            name="distance"
            formik={hotelFormik}
          />
          <div className="d-flex flex-column">
            <span>Featured</span>
            <div>
              <select
                defaultValue={dataUpdate?.featured || false}
                id="featured"
                onChange={(e) =>
                  setFeatured((prev) => ({
                    ...prev,
                    [e.target.id]: e.target.value,
                  }))
                }
              >
                <option value={false}>No</option>
                <option value={true}>Yes</option>
              </select>
            </div>
          </div>
        </form>
        <div className="container mt-4">
          <label>Rooms</label>
          {/* react-select  */}
          {/* <CreatableSelect
            defaultValue={defaultRoom}
            isMulti
            options={roomData}
            onChange={(e) => {
              //e là array lập qua để lấy _id
              setValueSelect(e.map((v) => v._id));
            }}
          /> */}

          <select
            className="form-select "
            multiple
            aria-label="multiple select example"
            defaultValue="6310dd998cfecfd90b30ca28"
            onChange={(e) => {
              //new array selected
              const value = Array.from(
                e.target.selectedOptions,
                (option) => option.value
              );
              setValueSelect(value);
            }}
            style={{ height: "300px" }}
          >
            {data?.map((item) => {
              return (
                <option
                  key={item._id}
                  selected={dataUpdate?.rooms?.includes(item._id)}
                  value={item._id}
                >
                  {item.title}
                </option>
              );
            })}
          </select>
        </div>
        <div className="mt-3 ">
          <button
            type="submit"
            onClick={hotelFormik.handleSubmit}
            className="btn btn-success w-25"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default NewHotels;
