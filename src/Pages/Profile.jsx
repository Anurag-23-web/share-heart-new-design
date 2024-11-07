import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import axios from "axios";
import {toast } from "react-toastify";
import { serverApi } from "../config";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const [userDetails, setUserDetails] = useState({
    firstName: localStorage.getItem("firstName") || "John",
    lastName: localStorage.getItem("lastName") || "Doe",
    email: localStorage.getItem("email") || "john.doe@example.com",
    userId: localStorage.getItem("userId") || "defaultUserId", // Default if no userId in localStorage
  });

  const navigate = useNavigate()

  useEffect(() => {
    // Set initial values for form inputs
    setValue("firstName", userDetails.firstName);
    setValue("lastName", userDetails.lastName);
    setValue("email", userDetails.email);
  }, [setValue, userDetails]);

  const handleEditProfile = async (formData) => {
    // Add userId to the data before sending it to the server
    const data = { ...formData, userId: userDetails.userId };

    try {
      const response = await axios.post(`${serverApi}/update_user_profile`, data);
      console.log(response);
      if (response.data.status === "success") {
        setUserDetails(data);
        localStorage.setItem("firstName", data.firstName);
        localStorage.setItem("lastName", data.lastName);
        localStorage.setItem("email", data.email);
        localStorage.setItem("userId", data.userId); // Update userId if needed
        toast.success("Profile updated successfully");
        navigate("/")
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="container mt-5">
      <div className="formSec mb-5">
        <div className="formheading text-center">
          <h3>Edit Profile</h3>
        </div>

        <form onSubmit={handleSubmit(handleEditProfile)} className="form-lable-mangne">
          <div className="form-group">
            <label>First Name</label>
            <input
              type="text"
              className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
              {...register("firstName", { required: "First Name is required" })}
            />
            {errors.firstName && <p className="text-danger">{errors.firstName.message}</p>}
          </div>

          <div className="form-group">
            <label>Last Name</label>
            <input
              type="text"
              className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
              {...register("lastName", { required: "Last Name is required" })}
            />
            {errors.lastName && <p className="text-danger">{errors.lastName.message}</p>}
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email address",
                },
              })}
            />
            {errors.email && <p className="text-danger">{errors.email.message}</p>}
          </div>

          <div className="mb-0 formBtn text-center">
            <Button variant="danger" type="submit" className="mt-4">
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
