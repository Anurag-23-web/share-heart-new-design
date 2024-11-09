import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Button } from "react-bootstrap";
import { serverApi } from "../config";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../Components/Loader";

const Login = () => {
  const navigate = useNavigate();
  const [showOtpField, setShowOtpField] = useState(false);
  const [timer, setTimer] = useState(60);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [otpExpired, setOtpExpired] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    clearErrors,
    watch,
  } = useForm();

  const otpValue = watch("otp", "");

  useEffect(() => {
    let intervalId;
    if (showOtpField && timer > 0) {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setOtpExpired(true);
      setResendDisabled(false);
    }
    return () => clearInterval(intervalId);
  }, [timer, showOtpField]);

  const startTimer = () => {
    setTimer(60);
    setOtpExpired(false);
    setResendDisabled(true);
  };

  const notifySuccess = (message) => toast.success(message);
  const notifyError = (message) => toast.error(message);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post(`${serverApi}/generate-otp`, {
        email: data.email,
      });

      if (response.data.status === "success") {
        setShowOtpField(true);
        notifySuccess(response.data.message || "OTP sent successfully.");
        startTimer();
      }
    } catch (error) {
      notifyError(error?.response?.data?.message || "User not found.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${serverApi}/verify-otp`, {
        email: getValues("email"),
        otp: otpValue,
      });
      if (response.data.status === "success") {
        notifySuccess("Login successful!");
        localStorage.setItem("userId", response.data.data._id);
        localStorage.setItem("firstName", response.data.data.firstName);
        localStorage.setItem("lastName", response.data.data.lastName || "");
        localStorage.setItem("email", response.data.data.local.email);
        navigate("/");
      } else {
        notifyError(response.data.message || "Invalid OTP.");
      }
    } catch (error) {
      notifyError(error?.response?.data?.message || "Error verifying OTP.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${serverApi}/generate-otp`, {
        email: getValues("email"),
      });
      if (response.data.status === "success") {
        notifySuccess(response.data.message || "OTP resent successfully.");
        startTimer();
      } else {
        notifyError("Failed to resend OTP.");
      }
    } catch (error) {
      notifyError(error?.response?.data?.message || "Error resending OTP.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="formSec mb-5">
      <ToastContainer />

      <div className="formheading">
        <h3>Login</h3>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="form-lable-mangne">
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Enter a valid email address",
              },
            })}
            placeholder="Enter your email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
          />
          {errors.email && (
            <div className="invalid-feedback d-block">
              {errors.email.message}
            </div>
          )}
        </div>

        {!showOtpField ? (
          <div className="d-flex justify-content-center">
            <Button type="submit" variant="danger" disabled={loading}>
              {loading ? <Loader/>: "Get OTP"}
            </Button>
          </div>
        ) : (
          <>
            <div className="form-group mt-3">
              <label>OTP</label>
              <input
                type="text"
                {...register("otp", {
                  required: "OTP is required",
                  pattern: {
                    value: /^\d{6}$/,
                    message: "OTP must be a 6-digit number",
                  },
                })}
                value={otpValue}
                onChange={(e) => {
                  setValue("otp", e.target.value);
                  clearErrors("otp");
                }}
                className={`form-control ${errors.otp ? "is-invalid" : ""}`}
                placeholder={`Enter OTP (${timer}s)`}
                maxLength="6"
              />
              {errors.otp && (
                <div className="invalid-feedback d-block">
                  {errors.otp.message}
                </div>
              )}
            </div>
            {otpExpired ? (
              <div className="d-flex justify-content-center">
                <Button
                  variant="danger"
                  onClick={handleResendOtp}
                  disabled={resendDisabled}
                >
                  {loading ? <Loader/> : "Resend OTP"}
                </Button>
              </div>
            ) : (
              <div className="d-flex justify-content-center">
                <Button
                  variant="danger"
                  onClick={handleSubmit(handleVerifyOtp)}
                  disabled={loading}
                >
                  {loading ? <Loader/> : "Verify OTP"}
                </Button>
              </div>
            )}
          </>
        )}
      </form>

      <div className="text-center mt-4">
        <p>
          Don’t have an account?
          <Link
            to="/signup"
            style={{ color: "darkblue", textDecoration: "none" }}
          >
            {" "}
            Sign up here
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default Login;
