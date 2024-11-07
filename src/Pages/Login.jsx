import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Button } from "react-bootstrap";
import { serverApi } from "../config";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
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
  } = useForm();

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
        notifySuccess("OTP sent to your email.");
        startTimer();
      } else {
        notifyError("Failed to send OTP: " + response.data.message);
      }
    } catch (error) {
      notifyError("An error occurred: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setLoading(true);
    if (!otp.trim() || otp.trim().length !== 6 || isNaN(otp.trim())) {
      notifyError("Please enter a valid 6-digit OTP.");
      setLoading(false);
      return;
    }
    try {
      const response = await axios.post(`${serverApi}/verify-otp`, {
        email: getValues("email"),
        otp,
      });
      if (response.data.status === "success") {
        notifySuccess("Login successful!");
        localStorage.setItem("userId", response.data.data._id);
        localStorage.setItem("firstName", response.data.data.firstName);
        localStorage.setItem("lastName", response.data.data.lastName || "");
        localStorage.setItem("email", response.data.data.local.email);

        navigate("/");
      } else {
        notifyError(response.data.message);
      }
    } catch (error) {
      notifyError("Error verifying OTP: " + error.message);
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
        notifySuccess("OTP resent to your email.");
        startTimer();
      } else {
        notifyError("Failed to resend OTP: " + response.data.message);
      }
    } catch (error) {
      notifyError("Error resending OTP: " + error.message);
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
            {...register("email", { required: "Email is required" })}
            placeholder="Enter your email"
            className="form-control"
          />
          {errors.email && (
            <div className="invalid-feedback d-block">
              {errors.email.message}
            </div>
          )}
        </div>

        {!showOtpField ? (
          <div className="d-flex justify-content-center">
          <Button type="submit" variant="danger" disabled={loading} className="">
            {loading ? "Submitting..." : "Get OTP"}
          </Button>
          </div>
          
        ) : (
          <>
            <div className="form-group mt-3">
              <label>OTP</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="form-control"
                placeholder={`Enter OTP (${timer}s)`}
              />
            </div>
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
                variant="success"
                onClick={handleVerifyOtp}
                disabled={loading}
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </Button>
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
