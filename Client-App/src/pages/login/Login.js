import React, { useState } from "react";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import { useFormik } from "formik";
import * as Yup from "yup";
import Input from "../../components/form/InputForm";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../../components/api/authApi";

function Register() {
  

  const dispatch = useDispatch();
  const navigate = useNavigate();
  //xử dụng formik để xử lý form
  const loginFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(6, "Password is too short")
        .required("Required"),
    }),

    onSubmit: (values) => {
      loginUser(values, dispatch, navigate);
      //console.log(error);
    },
  });

  return (
    <>
      <Navbar />
      <div className="d-flex flex-column justify-content-center align-items-center py-5">
        <h2>Login</h2>
        <div className="">
          <form
            style={{ width: "320px", height: "150px" }}
            className="d-flex flex-column justify-content-between"
            onSubmit={loginFormik.handleSubmit}
          >
            <Input
              type="email"
              name="email"
              placeholder="email"
              formik={loginFormik}
            />

            <Input
              type="password"
              name="password"
              placeholder="Password"
              formik={loginFormik}
            />

            <button className="btn btn-primary" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Register;
