import React, { useEffect, useState } from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import Loader from '../Components/Loader'; // Assuming you have a Loader component
import axios from 'axios';
import { serverApi } from '../config';

const TermService = () => {
    const [content, setContent] = useState({});
    const [loading, setLoading] = useState(true);
    const pageName = "terms-condition"; // Adjust this to the correct page name for your API

    useEffect(() => {
        getPageData();
    }, []);

    async function getPageData() {
        try {
            const response = await axios.get(`${serverApi}/web/page-content/${pageName}`);
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
            <div className='contentSec'>
                {!loading && (
                    <>
                        {/* Page Title */}
                        <h3 className='contentHeading'>{content.title}</h3>
                        <div className='contentitalic'>(Effective Date: {content.effective_date || 'April 2024'})</div>

                        {/* Dynamically Rendering Content */}
                        <div dangerouslySetInnerHTML={{ __html: content.content }} />
                    </>
                )}
            </div>
            {/* <Footer /> */}
        </div>
    );
}

export default TermService;
