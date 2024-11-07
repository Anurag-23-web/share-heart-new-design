import React, { useEffect, useState } from 'react';
// import Footer from '../Components/Footer';
// import Header from '../Components/Header';
// import GetEternal from '../assets/image/getEternal.jpg';
import { serverApi } from '../config';
import axios from 'axios';

const GetEternalLife = () => {
    const [content, setContent] = useState({});
    const [loading, setLoading] = useState(true);
    const pageName = "get-eternal-life";

    useEffect(() => {
        getPageData();
    }, [])

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
        <div className='geteternalpage'>
            <div className='contentSec'>
                <div dangerouslySetInnerHTML={{ __html: content.content }} />
         
            </div>
        </div>
    );
}

export default GetEternalLife;
