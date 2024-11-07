import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "react-bootstrap";
import { serverApi } from "../config";
import { toast } from "react-toastify"; // Import toast
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false); // Loading state for submission
  const [showOtpField, setShowOtpField] = useState(false); // Flag for OTP field
  const [otp, setOtp] = useState(""); // OTP input value
  const [timer, setTimer] = useState(60); // OTP timer
  const [otpExpired, setOtpExpired] = useState(false); // OTP expiration flag
  const [resendDisabled, setResendDisabled] = useState(false); // Disable resend button
  const [errorMessage, setErrorMessage] = useState(""); // Error message
  const [successMessage, setSuccessMessage] = useState(""); // Success message
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
  }); // Store form data
  const navigate = useNavigate();

  // Function to start OTP timer
  const startTimer = () => {
    setTimer(60);
    const intervalId = setInterval(() => {
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
    }, 1000);
    setTimeout(() => {
      clearInterval(intervalId);
      setOtpExpired(true); // Mark OTP as expired
    }, 60000); // Stop timer after 60 seconds
  };

  const onSubmit = async (data) => {
    setLoading(true); // Set loading to true during API call

    // Set form data for email, first name, last name
    setFormData({
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
    });

    try {
      // Call OTP generation API with the form data
      const response = await axios.post(`${serverApi}/generate-otp-signup`, {
        email: data.email,
      });

      if (response.data.status === "success") {
        setSuccessMessage("OTP sent successfully!");
        setErrorMessage("");
        setShowOtpField(true);
        startTimer();
      } else {
        setErrorMessage(response.data.message);
        setSuccessMessage("");
      }
    } catch (error) {
      setErrorMessage("An error occurred: " + error.message);
      setSuccessMessage("");
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  const handleVerifyOtp = async () => {
    setLoading(true);

    try {
      // Send request to backend to verify OTP and complete the signup
      const response = await axios.post(`${serverApi}/signup`, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        otp: otp,
      });

      if (response.data.status === "success") {
        setSuccessMessage(response.data.message);

        localStorage.setItem("firstName", response.data.data.firstName);
        localStorage.setItem("lastName", response.data.data.lastName || "");
        localStorage.setItem("email", response.data.data.local.email);
        localStorage.setItem("userId", response.data.data._id);

        navigate("/"); // Redirect after successful signup
      } else {
        setErrorMessage(response.data.message);
        setSuccessMessage("");
      }
    } catch (error) {
      setErrorMessage("Error verifying OTP: " + error.message);
      setSuccessMessage("");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setResendDisabled(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await axios.post(`${serverApi}/generate-otp-signup`, {
        email: formData.email,
      });

      if (response.data.status === "success") {
        setSuccessMessage(response.data.message);
        setResendDisabled(false);
        setOtpExpired(false); // Reset OTP expiration flag
        startTimer(); // Start timer again
      } else {
        setErrorMessage(response.data.message);
        setResendDisabled(false);
      }
    } catch (error) {
      setErrorMessage("Error resending OTP: " + error.message);
      setResendDisabled(false);
    }
  };

  return (
    <div>
      <div className="formSec mb-5">
        <div className="formheading">
          <h3>Signup</h3>
        </div>

        {/* React Hook Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="form-lable-mangne">
          <div className="form-group">
            <label>First Name</label>
            <input
              type="text"
              className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
              placeholder="Enter first name"
              {...register("firstName", { required: "First name is required" })}
            />
            {errors.firstName && (
              <div className="invalid-feedback">{errors.firstName.message}</div>
            )}
          </div>

          <div className="form-group">
            <label>Last Name</label>
            <input
              type="text"
              className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
              placeholder="Enter last name"
              {...register("lastName", { required: "Last name is required" })}
            />
            {errors.lastName && (
              <div className="invalid-feedback">{errors.lastName.message}</div>
            )}
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              placeholder="Enter email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Invalid email format",
                },
              })}
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email.message}</div>
            )}
          </div>

          <div className="mb-0 formBtn">
            <Button type="submit" variant="danger" disabled={loading}>
              {loading ? "Submitting..." : "Generate OTP"}
            </Button>
          </div>
        </form>

        {showOtpField && (
          <>
            <div className="form-group mt-4">
              <label>Enter OTP</label>
              <input
                type="text"
                className={`form-control ${errors.otp ? "is-invalid" : ""}`}
                placeholder={`Enter OTP (${timer}s)`}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              {errors.otp && (
                <div className="invalid-feedback">{errors.otp.message}</div>
              )}
            </div>

            <div className="mb-0 formBtn">
              {otpExpired ? (
                <Button
                  variant="danger"
                  onClick={handleResendOtp}
                  disabled={resendDisabled}
                >
                  Resend OTP
                </Button>
              ) : (
                <Button
                  variant="danger"
                  onClick={handleVerifyOtp}
                  disabled={loading}
                >
                  Verify OTP
                </Button>
              )}
            </div>
          </>
        )}

        {/* Display error or success message */}
        {errorMessage && (
          <div className="alert alert-danger mt-3">{errorMessage}</div>
        )}
        {successMessage && (
          <div className="alert alert-success mt-3">{successMessage}</div>
        )}

        {/* Login prompt */}
        <div className="text-center mt-4">
          <p>
            If you already have an existing account
            <Link
              to="/login"
              style={{ color: "darkblue", textDecoration: "none" }}
            >
              {" "}
              click here to login
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
