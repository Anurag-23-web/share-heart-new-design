import React, { useEffect, useState } from "react";
import { Accordion, Container, Row, Col, Tabs, Tab } from "react-bootstrap";
import { Link } from "react-router-dom";
import Background from "../assets/image/background-patterns.svg";
import Mail from "../assets/image/mail-icon.svg";
import Call from "../assets/image/ca1l-icon.svg";
import { serverApi } from "../config";
import axios from "axios";
import Loader from "../Components/Loader"; // Import the Loader component

const HelpDesk = () => {
  const [faqList, setFaqList] = useState([]);
  const [helpDeskData, setHelpDeskData] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    getFaq();
    getHelpDeskContent();
  }, []);

  async function getFaq() {
    try {
      const response = await axios.get(
        `${serverApi}/web/get_faq_with_category`
      );
      if (response.data.status === "success") {
        setFaqList(response.data.data);
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  async function getHelpDeskContent() {
    try {
      const response = await axios.get(`${serverApi}/get_content`);
      const helpDeskData = response?.data?.data;

      // Check if the title is "Help Desk" and filter the data
      if (helpDeskData && Array.isArray(helpDeskData)) {
        const helpDeskContent = helpDeskData.filter(item => item.title === "Help Desk");

        // Clean the HTML tags and &nbsp; before setting it to state
        if (helpDeskContent.length > 0) {
          const cleanedContent = removeHtmlTagsAndSpaces(helpDeskContent[0].content);
          setHelpDeskData([{ ...helpDeskContent[0], content: cleanedContent }]);
        }
      }
    } catch (error) {
      console.log("Error fetching help desk content:", error.message);
    } finally {
      setLoading(false); // Set loading to false once data is fetched
    }
  }

  function removeHtmlTagsAndSpaces(str) {
    // Remove HTML tags
    let cleanedStr = str.replace(/<[^>]*>/g, '');
    
    // Replace &nbsp; with regular space
    cleanedStr = cleanedStr.replace(/&nbsp;/g, ' ');

    return cleanedStr;
  }

  return (
    <>
      {loading && (
        <div className="loader-overlay">
          <Loader />
        </div>
      )}
      <div className={loading ? "content-opacity" : "content-visible"}>
        <section className="hero-section">
          <Container>
            <div className="section-heading text-center">
              <h2>Help Desk</h2>
              <p>
                {helpDeskData.length > 0 ? helpDeskData[0].content : "Loading..."}
              </p>
            </div>
          </Container>
        </section>

        <section className="faq-section">
          <Container>
            <div className="section-heading text-center">
              <h2>Frequently Asked Questions (FAQs)</h2>
            </div>
            <div className="faq-tabs">
              <Tabs defaultActiveKey={0} id="faq-tabs">
                {faqList.map((item, i) => (
                  <Tab eventKey={i} title={item.name} key={i}>
                    <Accordion defaultActiveKey={0}>
                      {item.faqData.map((faq, j) => (
                        <Accordion.Item eventKey={j} key={j}>
                          <Accordion.Header>
                            {j + 1}. {faq.question}
                          </Accordion.Header>
                          <Accordion.Body>
                            <p>{faq.answer}</p>
                          </Accordion.Body>
                        </Accordion.Item>
                      ))}
                    </Accordion>
                  </Tab>
                ))}
              </Tabs>
            </div>
          </Container>
        </section>

        <section className="contact-section">
          <Container>
            <Row>
              <Col md={12} className="text-center">
                <h2>Contact Support</h2>
                <p>
                  If you didn't find the answer to your question or need
                  additional assistance, our support team is here to help.
                </p>
              </Col>
              <Col md={6}>
                <div className="reach-box">
                  <div className="icon-box">
                    <img className="img-fluid" src={Mail} alt="mail icon" />
                  </div>
                  <h3>
                    <span>For support inquiries, email us at:</span>
                    <Link to="/">Hello@shareheart.com</Link>
                  </h3>
                </div>
              </Col>
              <Col md={6}>
                <div className="reach-box">
                  <div className="icon-box">
                    <img className="img-fluid" src={Call} alt="call icon" />
                  </div>
                  <h3>
                    <span>
                      Call us @ Monday through Friday from 9 AM to 5 PM Central
                      time
                    </span>
                    <Link to="/">+1 (914) 282 9994</Link>
                  </h3>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </div>
    </>
  );
};

export default HelpDesk;
