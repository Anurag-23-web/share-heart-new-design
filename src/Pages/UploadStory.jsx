import React, { useState, useRef } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { Button } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { serverApi } from "../config";

const UploadStory = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    watch,
    control,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      churchLink: "",
      recordedAt: "",
      description: "",
      youtubeLink: "",
      facebookLink: "",
      tiktokLink: "",
      instagramLink: "",
      YTShortLink: "",
      video: null,
      // thumbnail: null,
    },
  });

  const videoRef = useRef();
  // const thumbnailRef = useRef();
  const [videoFiles, setVideoFiles] = useState([]);
  // const [thumbnailFile, setThumbnailFile] = useState(null);
  const [selectedFeature, setSelectedFeature] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [slug, setSlug] = useState("");

  const watchFormValues = watch();

  const generateSlug = (text) => {
    const slug = text
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "")
      .replace(/--+/g, "-")
      .replace(/^-+/, "")
      .replace(/-+$/, "");
    setValue("name", text);
    setSlug(slug);
  };
  const handleVideoChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("video/")) {
      toast.error("Please select a video file.");
      videoRef.current.value = "";
      return;
    }

    const fileSizeInMb = file.size / (1024 * 1024);
    if (fileSizeInMb > 500) {
      toast.error("File size exceeds 500 MB limit.");
      videoRef.current.value = "";
      return;
    }

    setVideoFiles([file]);
    setValue("video", file); // Update the form state with the selected video file
  };

  // const handleThumbnailChange = (event) => {
  //   const file = event.target.files[0]; // Get the first file
  //   if (file) {
  //     if (!file.type.startsWith("image/")) {
  //       toast.error("Only image files are allowed for thumbnail.");
  //       thumbnailRef.current.value = ""; // Reset the file input
  //       return;
  //     }
  //     setThumbnailFile(file); // Set the thumbnail file in state
  //     setValue("thumbnail", file); // Update the react-hook-form state with the file
  //   }
  // };

  const onSubmit = async (formData) => {
    if (!watchFormValues.name || !slug || !selectedFeature) {
      toast.error("Please fill all required fields");
      return;
    }

    if (formData.description && formData.description.length > 200) {
      toast.error("Description should not exceed 200 characters");
      return;
    }

    if (!videoFiles[0]) {
      toast.error("Please upload a video.");
      return;
    }

    // if (!thumbnailFile) {
    //   toast.error("Please upload a thumbnail.");
    //   return;
    // }

    setIsSubmitting(true);

    const submitFormData = new FormData();
    submitFormData.append("name", formData.name);
    submitFormData.append("email", formData.email);
    submitFormData.append("phone", formData.phone);
    submitFormData.append("slug", slug);
    submitFormData.append("description", formData.description || "");
    submitFormData.append("hastags", JSON.stringify(selectedFeature));
    submitFormData.append("youtubeLink", formData.youtubeLink || "");
    submitFormData.append("facebookLink", formData.facebookLink || "");
    submitFormData.append("tiktokLink", formData.tiktokLink || "");
    submitFormData.append("instagramLink", formData.instagramLink || "");
    submitFormData.append("YTShortLink", formData.YTShortLink || "");
    submitFormData.append("churchLink", formData.churchLink);
    submitFormData.append("recordedAt", formData.recordedAt);
    submitFormData.append("file", videoFiles[0]);
    // submitFormData.append("thumbnail", thumbnailFile);

    try {
      const response = await axios.post(
        `${serverApi}/add_video`,
        submitFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const progress = Math.round(
              (progressEvent.loaded / progressEvent.total) * 100
            );
            setUploadProgress(progress);
          },
        }
      );

      if (response.data.status === "success") {
        toast.success("Story uploaded successfully!");
        // Reset form
        reset();
        setSlug("");
        setSelectedFeature([]);
        setVideoFiles([]);
        // setThumbnailFile(null);
        setUploadProgress(0);
        if (videoRef.current) videoRef.current.value = "";
        // if (thumbnailRef.current) thumbnailRef.current.value = "";
      } else {
        toast.error(response.data.message || "Upload failed");
      }
    } catch (error) {
      console.error("Error uploading:", error);
      toast.error(error.response?.data?.message || "Upload failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className="formSec mb-5">
        <div className="formheading">
          <h3>Upload your Story</h3>
        </div>

        {uploadProgress > 0 && uploadProgress < 100 && (
          <div className="progress mb-3">
            <div
              className="progress-bar"
              role="progressbar"
              style={{ width: `${uploadProgress}%` }}
              aria-valuenow={uploadProgress}
              aria-valuemin="0"
              aria-valuemax="100"
            >
              {uploadProgress}%
            </div>
          </div>
        )}

        <Form className="form-lable-mangne" onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="form-group">
            <Form.Label>Name *</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              {...register("name", {
                required: "Name is required",
                onChange: (e) => generateSlug(e.target.value),
              })}
            />
            {errors.name && (
              <p className="text-danger">{errors.name.message}</p>
            )}
          </Form.Group>

          <Form.Group className="form-group">
            <Form.Label>Email *</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email format",
                },
              })}
            />
            {errors.email && (
              <p className="text-danger">{errors.email.message}</p>
            )}
          </Form.Group>

          <Form.Group className="form-group">
            <Form.Label>Recorded At *</Form.Label>
            <Form.Control
              type="date"
              {...register("recordedAt", {
                required: "Recorded date is required",
              })}
            />
            {errors.recordedAt && (
              <p className="text-danger">{errors.recordedAt.message}</p>
            )}
          </Form.Group>

          <Form.Group className="form-group">
            <Form.Label>Phone *</Form.Label>
            <InputGroup>
              <InputGroup.Text id="basic-addon1">+91</InputGroup.Text>
              <Form.Control
                placeholder="Phone number"
                aria-label="Phone number"
                aria-describedby="basic-addon1"
                {...register("phone", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^[0-9]{9,10}$/,
                    message: "Phone number should be 9-10 digits",
                  },
                })}
              />
            </InputGroup>
            {errors.phone && (
              <p className="text-danger">{errors.phone.message}</p>
            )}
          </Form.Group>

          <Form.Group className="form-group">
            <Form.Label>Church Link *</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter church link"
              {...register("churchLink", {
                required: "Church link is required",
              })}
            />
            {errors.churchLink && (
              <p className="text-danger">{errors.churchLink.message}</p>
            )}
          </Form.Group>

          <Form.Group className="form-group">
            <Form.Label>Upload Video *</Form.Label>
            <Controller
              name="video"
              control={control}
              render={({ field }) => (
                <Form.Control
                  type="file"
                  ref={videoRef}
                  accept="video/*"
                  onChange={(e) => {
                    handleVideoChange(e);
                    field.onChange(e); // Trigger react-hook-form's onChange
                  }}
                />
              )}
            />
            {errors.video && (
              <p className="text-danger">{errors.video.message}</p>
            )}
          </Form.Group>

          {/* <Form.Group className="form-group">
            <Form.Label>Thumbnail *</Form.Label>
            <Controller
              name="thumbnail"
              control={control}
              rules={{
                required: "Thumbnail is required", // Add required validation
              }}
              render={({ field }) => (
                <Form.Control
                  type="file"
                  ref={thumbnailRef}
                  accept="image/*"
                  onChange={(e) => {
                    handleThumbnailChange(e);
                    field.onChange(e); // Trigger react-hook-form's onChange
                  }}
                />
              )}
            />
            {errors.thumbnail && (
              <p className="text-danger">{errors.thumbnail.message}</p>
            )}
          </Form.Group> */}

          <Form.Group className="mb-3 checkbox-label-font">
            <div className="mb-3">
              <Form.Check
                type="checkbox"
                label="I agree to the unrestricted use and publication of my testimony video on shareheart.com and by my church"
              />
              <Form.Check
                type="checkbox"
                label="I agree to receive further communication regarding Free T-Shirt selection & Other Promotions"
              />
            </div>
          </Form.Group>

          <div className="formBtn">
            <Button type="submit" variant="danger" disabled={isSubmitting}>
              {isSubmitting ? "Uploading..." : "Submit"}
            </Button>
          </div>
        </Form>
      </div>

      <ToastContainer />
    </div>
  );
};

export default UploadStory;
