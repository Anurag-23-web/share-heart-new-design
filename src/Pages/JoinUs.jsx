import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { serverApi } from "../config";
import axios from "axios";
import Loader from '../Components/Loader';  // Assuming you have a custom Loader component

const JoinUs = () => {
  // Manage loading state
  const [loading, setLoading] = useState(false);

  // Use the useForm hook to manage form data
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Handle form submission
  const onSubmit = async (data) => {
    setLoading(true);  // Start loading
    try {
      const response = await axios.post(`${serverApi}/add-join-us`, data);
      console.log(response);
      if (response.status === 201) {
        toast.success("Form submitted successfully");  // Show success toast
        reset(); // Reset form fields after successful submission
      } 
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Failed to submit the form. Please try again.");  // Show error toast on failure
    } finally {
      setLoading(false);  // End loading
    }
  };

  return (
    <div>
      {/* ToastContainer is rendered here to show toast messages */}
      <ToastContainer />
      
      <div className="formSec mb-5">
        <div className="formheading">
          <h4>Thanks for sharing your testimony</h4>
          <p>Please submit the consent form</p>
        </div>

        {/* Wrap the form with onSubmit handler */}
        <Form onSubmit={handleSubmit(onSubmit)} className="form-lable-mangne">
          {/* Full Name Field */}
          <Form.Group className="form-group">
            <Form.Label>Full name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter full name"
              {...register("fullName", {
                required: "Full name is required",
              })}
            />
            {errors.fullName && <p className="text-danger">{errors.fullName.message}</p>}
          </Form.Group>

          {/* Email Field */}
          <Form.Group className="form-group">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && <p className="text-danger">{errors.email.message}</p>}
          </Form.Group>

          {/* Recorded At Field */}
          <Form.Group className="form-group">
            <Form.Label>Recorded at</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter location"
              {...register("recordedAt", {
                required: "Recorded location is required",
              })}
            />
            {errors.recordedAt && <p className="text-danger">{errors.recordedAt.message}</p>}
          </Form.Group>

          {/* Phone Field */}
          <Form.Group className="form-group">
            <Form.Label>Phone</Form.Label>
            <InputGroup>
              <InputGroup.Text id="basic-addon1">+91</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Enter phone number"
                {...register("phone", {
                  required: "Phone number is required",
                  minLength: {
                    value: 10,
                    message: "Phone number must be at least 10 digits",
                  },
                  maxLength: {
                    value: 10,
                    message: "Phone number must be at most 10 digits",
                  },
                })}
              />
            </InputGroup>
            {errors.phone && <p className="text-danger">{errors.phone.message}</p>}
          </Form.Group>

          {/* Church Web Link Field */}
          <Form.Group className="form-group">
            <Form.Label>Your Church Web link</Form.Label>
            <Form.Select
              {...register("churchWebLink", {
                required: "Church web link is required",
              })}
            >
              <option value="">Select (or) Type here</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </Form.Select>
            {errors.churchWebLink && <p className="text-danger">{errors.churchWebLink.message}</p>}
          </Form.Group>

          {/* Checkbox Agreement Fields */}
          <Form.Group className="mb-3 checkbox-label-font">
            <div className="mb-3">
              <Form.Check
                type="checkbox"
                label="I agree to the unrestricted use and publication of my testimony video on shareheart.com and by my church"
                {...register("agreeToUseTestimony")}
              />
              <Form.Check
                type="checkbox"
                label="I agree to receive further communication regarding Free T-Shirt selection & Other Promotions"
                {...register("agreeToPromotions")}
              />
            </div>
          </Form.Group>

          {/* Submit Button */}
          <Form.Group className="mb-0">
            <div className="formBtn">
              <Button type="submit" variant="danger" disabled={loading}>
                {loading ? <Loader /> : "Submit now"} {/* Show loader while submitting */}
              </Button>
            </div>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
};

export default JoinUs;
