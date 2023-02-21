import React, { useState } from "react";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import { useFormik } from "formik";
import * as Yup from "yup";
import Input from "../../components/form/InputForm";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../components/api/authApi";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //xử dụng formik để xử lý form
  const registerForm = useFormik({
    initialValues: {
      userName: "",
      fullName: "",
      email: "",
      password: "",
      phoneNumber: "",
    },
    //Yup để validation
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(6, "Password is too short")
        .required("Required"),
      userName: Yup.string()
        .required("Required")
        .min(3, "Name must be at least 3 characters"),
      fullName: Yup.string()
        .required("Required")
        .min(3, "Full name must be at least 3 characters"),
      phoneNumber: Yup.string()
        .required("Required")
        .matches(/^\d{10}$/, "Phone must be a number and 10 digits"),
    }),
    onSubmit: (values) => {
      registerUser(values, dispatch, navigate);
    },
  });

  return (
    <>
      <Navbar />
      <div className="d-flex flex-column justify-content-center align-items-center py-5">
        <h2>Register</h2>
        <div className="">
          <form
            style={{ width: "320px", height: "380px" }}
            className="d-flex flex-column justify-content-between"
            onSubmit={registerForm.handleSubmit}
          >
            <Input
              name="userName"
              placeholder="User Name"
              formik={registerForm}
            />
            <Input
              name="fullName"
              placeholder="Full Name"
              formik={registerForm}
            />

            <Input
              type="email"
              name="email"
              placeholder="email"
              formik={registerForm}
            />

            <Input
              type="password"
              name="password"
              placeholder="Password"
              formik={registerForm}
            />

            <Input
              name="phoneNumber"
              placeholder="phone Number"
              formik={registerForm}
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
