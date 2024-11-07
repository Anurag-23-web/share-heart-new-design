import React, { useEffect, useState } from 'react';
// import Header from '../Components/Header';
// import Footer from '../Components/Footer';
import Facebook from '../assets/image/facebook.svg';
import TikTok from '../assets/image/tiktok.svg'; // Fixed typo: Tikttok -> TikTok
import Instagram from '../assets/image/instagram.svg';
import YouTube from '../assets/image/youTube.svg';
import Location from '../assets/image/location.svg';
import Eternal from '../assets/image/eternal.svg';
import FreeTag from '../assets/image/freeTag.svg';
import { Link, useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { serverApi } from '../config';

const Home = () => {
    const navigate = useNavigate();
    const [content, setContent] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getPageData();
    }, [])

    async function getPageData() {
        try {
            const response = await axios.get(`${serverApi}/web/home-page-content`);
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

    const goToAboutPage = () => {
        navigate('/video-reels'); // Navigate to the About page
    };

    // Utility function to render media based on file type
    const renderMedia = (fileUrl) => {
        if (!fileUrl) {
            return <p>No media available</p>;
        }

        // Check if the file is a video
        if (fileUrl.match(/\.(mp4|webm|ogg)$/i)) {
            return (
                <video onClick={goToAboutPage} className="videoreal" autoPlay muted loop>
                    <source src={fileUrl} type="video/mp4" />
                </video>
            );
        }

        // Check if the file is an image
        if (fileUrl.match(/\.(jpg|jpeg|png|gif|bmp|svg)$/i)) {
            return <img className='Imageprt' alt='Share Girl' src={fileUrl} />;
        }

        // Unsupported file type
        return <p>Unsupported file type</p>;
    };

    return (
        <div>
            <section className='shareStory'>
                <div className='shareStoryIn'>
                    <div className='headingSec'>
                        <h3 className='headingtype1'>{content.fTopHeading}</h3>
                        <p className='subheadingtype1'>{content.fTopSubHeading}</p>
                    </div>
                    <div className='videoPart'>
                        <div className='videoPartin'>
                            {renderMedia(serverApi + content.fVideo)}
                            {/* <img className='Imageprt' alt='Share Girl' src={ShareGirl} /> */}
                        </div>
                    </div>
                    <div className='shareStoryCon'>
                        <h4>{content.fBottomHeading}</h4>
                        <p>{content.fBottomSubHeading}</p>
                    </div>
                </div>
            </section>
            <section className='shareStory shareReel'>
                <div className='shareStoryIn'>
                    <div className='headingSec'>
                        <h3 className='headingtype1'>{content.sTopHeading}</h3>
                        <p className='subheadingtype1'>{content.sTopSubHeading}</p>
                    </div>
                    <div className='videoPart'>
                        <div className='videoPartin'>
                            {renderMedia(serverApi + content.sVideo)}
                        </div>
                        <div className='shareReelmeta'>
                            <ul>
                                <li><Link to="/"><img src={TikTok} alt="TikTok" /></Link></li> {/* Fixed typo: Tikttok -> TikTok */}
                                <li><Link to="/"><img src={Facebook} alt="Facebook" /></Link></li>
                                <li><Link to="/"><img src={Instagram} alt="Instagram" /></Link></li>
                                <li><Link to="/"><img src={YouTube} alt="YouTube" /></Link></li>
                                <li><Link to="/"><span>My Crush</span><img src={Location} alt="Location" /></Link></li> {/* Fixed typo: Chrush -> Crush */}
                                <li><Link to="/"><span>Get Eternal Life</span><img src={Eternal} alt="Eternal Life" /></Link></li> {/* Fixed typo: Et ernal -> Eternal */}
                            </ul>
                        </div>
                    </div>
                    <div className='shareStoryCon'>
                        <h4>{content.sBottomHeading}</h4>
                    </div>
                </div>
            </section>
            <section className='shareStory sharesld'>
                <div className='shareStoryIn'>
                    <div className='headingSec mobilemarg'>
                        <h3 className='headingtype1'>{content.tTopHeading}</h3>
                        <p className='subheadingtype1'>{content.tTopSubHeading}</p>
                    </div>
                </div>

                <div className='shareslder'>
                    <Swiper
                        slidesPerView={1.5}
                        spaceBetween={40}
                        loop={true}
                        navigation={false}
                        pagination={{ clickable: true }}
                        autoplay={{ delay: 2500, disableOnInteraction: false }}
                        modules={[Pagination, Autoplay]} // Include Autoplay module
                    >
                        {content.tImages?.map((item, i) => {
                            return (
                                <SwiperSlide>
                                    <div className='sliderItm'><img src={serverApi + item} alt="Slide 1" /></div>
                                </SwiperSlide>
                            )
                        })}
                    </Swiper>
                </div>
                <div className='shareStoryCon'>
                    <h4>{content.tBottomHeading}</h4>
                </div>
            </section>
            <section className='shareStory shareOffer'>
                <div className='shareStoryIn'>
                    <div className='headingSec'>
                        <h3 className='headingtype1'>{content.forthTopHeading}</h3>
                        <p className='subheadingtype1'>{content.forthTopSubHeading}</p>
                    </div>
                    <div className='shareOfferIn'>
                        <div className='shareOfferimg'><img src={serverApi+content.forthImage} /></div>
                        <div className='shareOffertag'><img src={FreeTag} /></div>
                        <div className='shareStoryCon'>
                            <h4>{content.forthBottomHeading}</h4>
                        </div>
                    </div>
                </div>
            </section>

            <section className='homesubmit'>
                <div className='homesubmitin'>
                    <h2 className='headingtype2'>Submit your story now</h2>
                    <Button type='submit' variant='danger'>Submit now</Button>
                </div>
            </section>
        </div>
    );
}

export default Home;