import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import { Button, Container, Row, Col, Alert } from "react-bootstrap";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { serverApi } from "../config";
import Loader from "../Components/Loader";
import Sliderimg from "../assets/images/volunteer.png";
import Videorecord from "../assets/images/video-record.svg";
import Virtualcalls from "../assets/images/virtual-calls.svg";
import Volunteerman from "../assets/images/volunteer-man.png";

const Volunteer = () => {
  const [loading, setLoading] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState("");
  const [phone, setPhone] = useState("");
  const [volunteerContentData, setVolunteerContentData] = useState();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    trigger,
  } = useForm();

  const validatePhoneNumber = (value) => {
    const phoneNumberLength = value ? value.replace(/\D/g, "").length : 0;
    if (phoneNumberLength > 15) {
      return "Phone number cannot exceed 15 digits.";
    }
    return true;
  };

  useEffect(() => {
    getVolunteerData();
  }, []);

  const getVolunteerData = async () => {
    try {
      const response = await axios.get(`${serverApi}/get-volunteer-content`);
      console.log(response.data.data[0]);
      setVolunteerContentData(response.data.data[0]);
    } catch (error) {
      console.log("Error ", error.message);
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    setSubmitSuccess("");
    const isValid = await trigger();
    if (!isValid) {
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `${serverApi}/add_volunteer_contact_us`,
        {
          name: data.fullName,
          email: data.email,
          phoneNumber: phone,
          message: data.message,
        }
      );
      console.log({ response });

      if (response.data.status === "success") {
        setSubmitSuccess("Form submitted successfully!");
        setPhone("");
        reset();
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
        <section className="hero-section custom-hero-section">
          <Container>
            <Row className="align-items-center">
              <Col md={6}>
                <h1>{volunteerContentData?.topHeading} </h1>
                <p>{volunteerContentData?.topParagraph}</p>
              </Col>
              <Col md={6} className="text-end">
                <img
                  className="img-fluid ms-2"
                  src={`${serverApi}` + volunteerContentData?.fVideo}
                  alt="Slider"
                />
              </Col>
            </Row>
          </Container>
        </section>

        <section className="volunteer-roles custom-volunteer-roles">
          <Container>
            <Row className="align-items-center" style={{ marginTop: "50px" }}>
              <Col md={12}>
                <h2>{volunteerContentData?.volunteerHeading}</h2>
                <p>{volunteerContentData?.volunteerParagraph1}</p>
              </Col>
            </Row>
            <Row className="align-items-center" style={{ marginTop: "50px" }}>
              <Col md={6}>
                <h3>
                  <img src={Videorecord} alt="Video Record" />{" "}
                  {volunteerContentData?.volunteerFeatureHeading1}
                </h3>
                <p>{volunteerContentData?.volunteerFeatureHeading1}</p>
              </Col>
              <Col md={6}>
                <h3>
                  <img src={Virtualcalls} alt="Virtual Calls" />{" "}
                  {volunteerContentData?.volunteerFeatureHeading2}
                </h3>

                <p>{volunteerContentData?.volunteerFeatureParagraph2}</p>
              </Col>
            </Row>
          </Container>
        </section>

        <section className="who-volunteer custom-who-volunteer">
          <Container>
            <Row style={{ marginTop: "50px" }}>
              <Col md={4} className="text-center">
                <img className="img-fluid" src={Volunteerman} alt="Volunteer" />
              </Col>
              <Col md={7}>
                <h2>{volunteerContentData?.section3Heading}</h2>
                <p>{volunteerContentData?.section3Paragraph}</p>
                <ul>
                  <li> {volunteerContentData?.feature1} </li>
                  <li>{volunteerContentData?.feature2}</li>
                  <li>{volunteerContentData?.feature3}</li>
                  <li>{volunteerContentData?.feature4}</li>
                </ul>
              </Col>
            </Row>
          </Container>
        </section>

        <section className="feedback-section custom-feedback-section">
          <Container>
            <div className="form-feedback">
              {submitSuccess && (
                <Alert
                  variant="info"
                  dismissible
                  onClose={() => setSubmitSuccess("")}
                >
                  {submitSuccess}
                </Alert>
              )}
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="form-lable-mangne"
              >
                <Row style={{ marginTop: "50px" }}>
                  <Col md={12}>
                    <div className="form-group">
                      <label>Full name <span style={{color:"red"}}>*</span></label>
                      <input
                        type="text"
                        {...register("fullName", {
                          required: "Full name is required.",
                        })}
                        placeholder="Enter full name"
                        className={`form-control ${
                          errors.fullName ? "is-invalid" : ""
                        }`}
                      />
                      {errors.fullName && (
                        <div className="invalid-feedback d-block">
                          {errors.fullName.message}
                        </div>
                      )}
                    </div>
                  </Col>
                  <Col md={12}>
                    <div className="form-group">
                      <label>Email <span style={{color:"red"}}>*</span></label>
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
                        className={`form-control ${
                          errors.email ? "is-invalid" : ""
                        }`}
                      />
                      {errors.email && (
                        <div className="invalid-feedback d-block">
                          {errors.email.message}
                        </div>
                      )}
                    </div>
                  </Col>
                  <Col md={12}>
                    <div className="form-group">
                      <label>Phone <span style={{color:"red"}}>*</span></label>
                      <Controller
                        control={control}
                        name="phone"
                        rules={{
                          required: "Phone number is required.",
                          validate: validatePhoneNumber,
                        }}
                        render={({ field }) => (
                          <PhoneInput
                            international
                            defaultCountry="IN"
                            value={phone}
                            onChange={(value) => {
                              setPhone(value);
                              field.onChange(value);
                            }}
                            className={`form-control custom-phone-input ${
                              errors.phone ? "is-invalid" : ""
                            }`}
                          />
                        )}
                      />
                      {errors.phone && (
                        <div className="invalid-feedback d-block">
                          {errors.phone.message}
                        </div>
                      )}
                    </div>
                  </Col>
                  <Col md={12}>
                    <div className="form-group">
                      <label>Tell us about yourself <span style={{color:"red"}}>*</span></label>
                      <textarea
                        {...register("message", {
                          required: "Message is required.",
                        })}
                        placeholder="Type your message"
                        rows="5"
                        className={`form-control ${
                          errors.message ? "is-invalid" : ""
                        }`}
                      />
                      {errors.message && (
                        <div className="invalid-feedback d-block">
                          {errors.message.message}
                        </div>
                      )}
                    </div>
                  </Col>
                  <Col md={12} className="text-center">
                    <Button type="submit" variant="danger" disabled={loading}>
                      {loading ? "Submitting..." : "Submit now"}
                    </Button>
                  </Col>
                </Row>
              </form>
            </div>
          </Container>
        </section>
      </div>
    </>
  );
};

export default Volunteer;
