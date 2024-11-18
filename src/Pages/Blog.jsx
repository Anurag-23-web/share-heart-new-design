import React, { useEffect, useState } from "react";
import { serverApi } from "../config";
import axios from "axios";
import Loader from "../Components/Loader"; // Assuming you have a Loader component
import { Link } from "react-router-dom";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBlogsData();
  }, []);

  // Fetch all blogs
  async function getBlogsData() {
    setLoading(true);
    try {
      const response = await axios.get(`${serverApi}/get-blogs`);
      console.log(response)
      if (response.data?.status === "success") {
        setBlogs(response.data.data.blogs);
      } else {
        console.log("Failed to fetch blogs: No success flag");
      }
    } catch (error) {
      console.log("Error fetching blogs:", error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">All Blogs</h2>

      {loading ? (
        <div className="loader-overlay">
          <Loader />
        </div>
      ) : (
        <div className="row justify-content-center">
          {blogs.length > 0 ? (
            blogs.map((blog, index) => (
              <div
                key={index}
                className="col-md-6 mb-4 d-flex justify-content-center"
              >
                <div
                  className="card"
                  style={{
                    maxWidth: "500px",
                    maxHeight: "600px",
                    width: "100%",
                  }}
                >
                  <img
                    src={`${serverApi}${blog.fVideo || "/placeholder.png"}`}
                    className="card-img-top"
                    alt={blog.title}
                    loading="lazy" // Lazy loading attribute
                    style={{
                      minHeight: "300px",
                      maxHeight: "300px",
                      objectFit: "cover",
                    }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{blog.title}</h5>

                    <Link
                      to={`/blog-details/${blog.slug}`}
                      className="btn btn-primary"
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12">
              <p className="text-center">No blogs found.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Blog;
