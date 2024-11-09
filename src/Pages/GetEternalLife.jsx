import React, { useEffect, useState } from 'react';
import { serverApi } from '../config';
import axios from 'axios';
import Loader from '../Components/Loader'; // Import the Loader component

const GetEternalLife = () => {
    const [content, setContent] = useState({});
    const [loading, setLoading] = useState(true);
    const pageName = "get-eternal-life";

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
        <>
            {loading && (
                <div className="loader-overlay">
                    <Loader />
                </div>
            )}
            <div className={loading ? "content-opacity" : "content-visible"}>
                <div className='geteternalpage'>
                    <div className='contentSec'>
                        <div dangerouslySetInnerHTML={{ __html: content.content }} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default GetEternalLife;
