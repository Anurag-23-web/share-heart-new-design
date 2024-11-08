import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "react-bootstrap";
import { serverApi } from "../config";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors,
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [showOtpField, setShowOtpField] = useState(false);
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(60);
  const [otpExpired, setOtpExpired] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Automatically clear success message after 2 seconds
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(""), 2000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const startTimer = () => {
    setTimer(60);
    const intervalId = setInterval(() => {
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
    }, 1000);
    setTimeout(() => {
      clearInterval(intervalId);
      setOtpExpired(true);
    }, 60000);
  };

  const onSubmit = async (data) => {
    setLoading(true);
    setFormData({
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
    });

    try {
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
      setErrorMessage(error.response.data.message);
      setSuccessMessage("");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setLoading(true);

    if (otp.length !== 6) {
      setErrorMessage("OTP must be exactly 6 digits");
      setLoading(false);
      return;
    }

    try {
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

        navigate("/");
      } else {
        setErrorMessage(response.data.message);
        setSuccessMessage("");
      }
    } catch (error) {
      setErrorMessage("Error verifying OTP: " + error.response.data.message);
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
        setOtpExpired(false);
        startTimer();
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
        {errorMessage && (
          <div className="alert alert-danger mt-3">{errorMessage}</div>
        )}
        {successMessage && (
          <div className="alert alert-success mt-3">{successMessage}</div>
        )}

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

          {!showOtpField && (
            <div className="mb-0 formBtn">
              <Button type="submit" variant="danger" disabled={loading}>
                {loading ? "Submitting..." : "Generate OTP"}
              </Button>
            </div>
          )}
        {showOtpField && (
          <>
            <div className="form-group mt-4">
              <label>OTP</label>
              <input
                type="text"
                className={`form-control ${errors.otp ? "is-invalid" : ""}`}
                placeholder={`Enter OTP (${timer}s)`}
                value={otp}
                onInput={(e) => {
                  const inputValue = e.target.value.replace(/\D/g, ""); // Only allow numeric input
                  setOtp(inputValue);
                  if (inputValue.length === 6)
                    setErrorMessage(""); // Clear error on exact 6 digits
                  else setErrorMessage("OTP must be exactly 6 digits");
                }}
                maxLength={6} // Ensure OTP is at most 6 digits
              />
         
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
        </form>


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
