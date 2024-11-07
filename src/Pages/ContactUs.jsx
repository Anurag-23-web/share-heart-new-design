import React, { useState } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button, InputGroup } from "react-bootstrap";
import { serverApi } from "../config";

const ContactUs = () => {
  const [loading, setLoading] = useState(false); // Loading state for submission
  const [submitSuccess, setSubmitSuccess] = useState(""); // Message for submission success or error

  // Validation schema using Yup
  const validationSchema = Yup.object({
    fullName: Yup.string().required("Full name is required."),
    email: Yup.string().email("Invalid email format").required("Email is required."),
    recordedAt: Yup.string().required("Recorded at is required."),
    phone: Yup.string()
      .matches(/^[0-9]+$/, "Phone number should only contain digits.")
      .required("Phone number is required."),
    message: Yup.string().required("Message is required."),
  });

  const handleSubmit = async (values, { resetForm }) => {
    setLoading(true); // Set loading to true during API call
    setSubmitSuccess(""); // Reset previous submission message
    try {
      const response = await axios.post(`${serverApi}/add_contact_us`, {
        name: values.fullName,
        email: values.email,
        recordedAt: values.recordedAt,
        phoneNo: values.phone,
        message: values.message,
      });

      if (response.data.status === "success") {
        setSubmitSuccess("Contact Us form submitted successfully!");
        resetForm(); // Reset form fields after successful submission
      } else {
        setSubmitSuccess("Failed to submit form: " + response.data.message);
      }
    } catch (error) {
      setSubmitSuccess("An error occurred: " + error.message);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div>
      <div className="formSec mb-5">
        <div className="formheading">
          <h3>Contact</h3>
          <p>Please submit the consent form</p>
        </div>
        
        <Formik
          initialValues={{
            fullName: "",
            email: "",
            recordedAt: "",
            phone: "",
            message: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="form-lable-mangne">
              <div className="form-group">
                <label>Full name</label>
                <Field
                  type="text"
                  name="fullName"
                  placeholder="Enter full name"
                  className="form-control"
                />
                <ErrorMessage name="fullName" component="div" className="invalid-feedback d-block" />
              </div>

              <div className="form-group">
                <label>Email</label>
                <Field
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  className="form-control"
                />
                <ErrorMessage name="email" component="div" className="invalid-feedback d-block" />
              </div>

              <div className="form-group">
                <label>Recorded at</label>
                <Field
                  type="text"
                  name="recordedAt"
                  placeholder="Enter recorded at"
                  className="form-control"
                />
                <ErrorMessage name="recordedAt" component="div" className="invalid-feedback d-block" />
              </div>

              <div className="form-group">
                <label>Phone</label>
                <InputGroup>
                  <InputGroup.Text id="basic-addon1">+91</InputGroup.Text>
                  <Field
                    name="phone"
                    placeholder="Phone number"
                    aria-label="phoneNumber"
                    aria-describedby="basic-addon1"
                    className="form-control"
                  />
                </InputGroup>
                <ErrorMessage name="phone" component="div" className="invalid-feedback d-block" />
              </div>

              <div className="form-group">
                <label>Type your message</label>
                <Field
                  as="textarea"
                  name="message"
                  placeholder="Type your message"
                  rows="3"
                  className="form-control"
                />
                <ErrorMessage name="message" component="div" className="invalid-feedback d-block" />
              </div>

              <div className="mb-0 formBtn">
                <Button type="submit" variant="danger" disabled={isSubmitting || loading}>
                  {loading ? "Submitting..." : "Submit now"}
                </Button>
              </div>
            </Form>
          )}
        </Formik>

        {submitSuccess && <div className="alert alert-info mt-3">{submitSuccess}</div>}
      </div>
    </div>
  );
};

export default ContactUs;
