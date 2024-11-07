import React, { useState } from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

import logo1 from '../assets/image/mychurch.svg';
import Geteternallife from '../assets/image/get-eternal-life.svg';
import TruthShine from '../assets/image/truthShine.mp4';
import FooterIC1 from '../assets/image/footerIC1.svg';
import FooterIC2 from '../assets/image/footerIC2.svg';
import FooterIC3 from '../assets/image/footerIC3.svg';
import FooterIC4 from '../assets/image/youtube-1.svg';


import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const VideoDetail = () => {

    const [rangeValues, setRangeValues] = useState({
        range1: 5, // Initial value of first slider
        range2: 74, // Initial value of second slider
    });

    // Function to handle slider value changes
    const handleRangeChange = (e) => {
        const { name, value } = e.target;
        setRangeValues((prevState) => ({
            ...prevState,
            [name]: Number(value),
        }));
    };

    // Function to calculate the background size for track styles
    const getTrackStyle = (value, min = 0, max = 100) => {
        const perc = max ? Math.round((100 * (value - min)) / (max - min)) : value;
        return {
            backgroundSize: `${perc}% 100%`,
        };
    };



    return (
        <>
            <section className='video-reels'>
                <div className='video-scroll'>
                    <video className="videoreal" autoPlay muted loop>
                        <source src={TruthShine} type="video/mp4" />
                    </video>

                </div>
                <div className=''>
                    <h3>Lorem Ipsum</h3>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting ind<span>...more</span></p>
                </div>
                <div className='video-dtl-share'>
                    <ul className='footerSocial'>
                        <li className='flt-img'><Link to="/"><img src={FooterIC3} /></Link></li>
                        <li className='flt-img'><Link to="/"><img src={FooterIC1} /></Link></li>
                        <li className='flt-img'><Link to="/"><img src={FooterIC2} /></Link></li>
                        <li className='flt-img'><Link to="/"><img src={FooterIC4} /></Link></li>
                        <li><Link to="/"><img src={logo1} /></Link></li>
                        <li><Link to="/"><img src={Geteternallife} /></Link></li>
                    </ul>
                </div>
            </section>

        </>
    );
}

export default VideoDetail;