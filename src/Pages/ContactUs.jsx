import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Button, InputGroup } from "react-bootstrap";
import { serverApi } from "../config";
import Loader from "../Components/Loader"; // Import the Loader component

const ContactUs = () => {
  const [loading, setLoading] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    setSubmitSuccess("");

    try {
      const response = await axios.post(`${serverApi}/add_contact_us`, {
        name: data.fullName,
        email: data.email,
        recordedAt: data.recordedAt,
        phoneNo: data.phone,
        message: data.message,
      });

      if (response.data.status === "success") {
        setSubmitSuccess("Contact Us form submitted successfully!");
        reset();

        // Remove success message after 2 seconds
        setTimeout(() => {
          setSubmitSuccess("");
        }, 2000);
      } else {
        setSubmitSuccess("Failed to submit form: " + response.data.message);
      }
    } catch (error) {
      setSubmitSuccess("An error occurred: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && (
        <div className="loader-overlay">
          <Loader />
        </div>
      )}
      <div className={loading ? "content-opacity" : "content-visible"}>
        <div className="formSec mb-5">
          {submitSuccess && (
            <div className="alert alert-info mt-3">{submitSuccess}</div>
          )}
          <div className="formheading">
            <h3>Contact</h3>
            <p>Please submit the consent form</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="form-lable-mangne">
            <div className="form-group">
              <label>Full name</label>
              <input
                type="text"
                {...register("fullName", { required: "Full name is required." })}
                placeholder="Enter full name"
                className={`form-control ${errors.fullName ? "is-invalid" : ""}`}
              />
              {errors.fullName && (
                <div className="invalid-feedback d-block">
                  {errors.fullName.message}
                </div>
              )}
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                {...register("email", {
                  required: "Email is required.",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Invalid email format",
                  },
                })}
                placeholder="Enter email"
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
              />
              {errors.email && (
                <div className="invalid-feedback d-block">
                  {errors.email.message}
                </div>
              )}
            </div>

            <div className="form-group">
              <label>Recorded at</label>
              <input
                type="text"
                {...register("recordedAt", {
                  required: "Recorded at is required.",
                })}
                placeholder="Enter recorded at"
                className={`form-control ${
                  errors.recordedAt ? "is-invalid" : ""
                }`}
              />
              {errors.recordedAt && (
                <div className="invalid-feedback d-block">
                  {errors.recordedAt.message}
                </div>
              )}
            </div>

            <div className="form-group">
              <label>Phone</label>
              <InputGroup>
                <InputGroup.Text id="basic-addon1">+91</InputGroup.Text>
                <input
                  type="text"
                  {...register("phone", {
                    required: "Phone number is required.",
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "Phone number should only contain digits.",
                    },
                  })}
                  placeholder="Phone number"
                  aria-label="phoneNumber"
                  aria-describedby="basic-addon1"
                  className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                />
              </InputGroup>
              {errors.phone && (
                <div className="invalid-feedback d-block">
                  {errors.phone.message}
                </div>
              )}
            </div>

            <div className="form-group">
              <label>Type your message</label>
              <textarea
                {...register("message", { required: "Message is required." })}
                placeholder="Type your message"
                rows="3"
                className={`form-control ${errors.message ? "is-invalid" : ""}`}
              />
              {errors.message && (
                <div className="invalid-feedback d-block">
                  {errors.message.message}
                </div>
              )}
            </div>

            <div className="mb-0 formBtn">
              <Button type="submit" variant="danger" disabled={loading}>
                {loading ? "Submitting..." : "Submit now"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
