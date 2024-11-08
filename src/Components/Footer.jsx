import React, { useEffect, useState } from 'react';
import FooterIC1 from '../assets/image/footerIC1.svg';
import FooterIC2 from '../assets/image/footerIC2.svg';
import FooterIC3 from '../assets/image/footerIC3.svg';
import FooterIC4 from '../assets/image/footerIC4.svg';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { serverApi } from '../config';

const Footer = () => {
    const [content, setContent] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getPageData();
    }, [])

    async function getPageData() {
        try {
            const response = await axios.get(`${serverApi}/web/setting-page-content`);
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
        <div className='footerSec'>
            <div className='footerSecin'>
                <p>if testimony already recorded ?  <Link to="/upload-story" style={{textDecoration:"none"}} >Upload here</Link> </p>
                <ul className='footerSocial'>
                    <li><Link to={content.facebookLink}><img src={FooterIC1} /></Link></li>
                    <li><Link to={content.instagramLink}><img src={FooterIC2} /></Link></li>
                    <li><Link to={content.tiktokLink}><img src={FooterIC3} /></Link></li>
                    <li><Link to={content.youtubeLink}><img src={FooterIC4} /></Link></li>
                </ul>
                <p className='footercopyright'>@2024 copyrights, All Right Reserved</p>
            </div>
        </div>
    );
}

export default Footer;
