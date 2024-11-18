import React, { useEffect, useState } from "react";
import Loader from "../Components/Loader";
import axios from "axios";
import { serverApi } from "../config";
import moment from "moment";

const PrivacyPolicy = () => {
  const [content, setContent] = useState({});
  const [loading, setLoading] = useState(true);
  const pageName = "privacy-policy";

  useEffect(() => {
    getPageData();
  }, []);

  async function getPageData() {
    try {
      const response = await axios.get(
        `${serverApi}/web/page-content/${pageName}`
      );
      if (response.data.status === "success") {
        setContent(response.data.data);
        setLoading(false);
      } else {
        console.log(response.data.message);
        setLoading(false);
      }
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  }

  return (
    <div>
      {/* Show loader overlay while loading */}
      {loading && (
        <div className="loader-overlay">
          <Loader />
        </div>
      )}

      {/* Page Content */}
      <div className="contentSec">
        {!loading && (
          <>
            <h3 className="contentHeading">{content.title}</h3>
            <div className="contentitalic">
              (Effective Date:{" "}
              {content.effectiveDate
                ? moment(content.effectiveDate).format("DD-MM-YY")
                : "N/A"}
              )
            </div>

            <div dangerouslySetInnerHTML={{ __html: content.content }} />
          </>
        )}
      </div>
    </div>
  );
};

export default PrivacyPolicy;
