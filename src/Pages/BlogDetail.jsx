import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { serverApi } from "../config";
import Loader from "../Components/Loader";
import moment from "moment";

const BlogDetail = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBlogData();
  }, []);

  const formatISODate = (isoDate, format = "YYYY-MM-DD") => {
    return moment(isoDate).format(format);
  };

  // Function to fetch blog data by ID
  async function getBlogData() {
    setLoading(true)
    try {
      const response = await axios.get(`${serverApi}/get-blog-by-id/${slug}`);
     
      if (response.data.success) {
        setBlog(response.data.blog[0]);
        setLoading(false)
      }
    } catch (error) {
      console.log("Error fetching blog details:", error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container my-5">
      {loading ? (
        <Loader /> // Show a loading spinner while fetching data
      ) : blog ? (
        <div className="card p-4">
          <img
            src={`${serverApi}${blog.fVideo || "/placeholder.png"}`}
            alt={blog.title}
            className="card-img-top mb-4"
            style={{ maxHeight: "400px", objectFit: "cover" }}
          />
          <h2 className="card-title">{blog.title}</h2>
          <div className="d-flex justify-content-between">
            <p className="text-muted">By {blog.author}</p>
            <p className="text-end">Date {formatISODate(blog.postedDate)}</p>
          </div>
          <div
            className="card-text"

            dangerouslySetInnerHTML={{ __html: blog.content }}
          ></div>
        </div>
      ) : (
        <p className="text-center">Blog not found.</p>
      )}
    </div>
  );
};

export default BlogDetail;
