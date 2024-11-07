import React, { useEffect, useState } from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import axios from 'axios';
import { serverApi } from '../config';

const PrivacyPolicy = () => {
    const [content, setContent] = useState({});
    const [loading, setLoading] = useState(true);
    const pageName = "privacy-policy";

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
        <div>
            {/* <Header /> */}
            <div className='contentSec'>
                <h3 className='contentHeading'>{content.title}</h3>
                <div className='contentitalic'>(Effective Date: April 2024)</div>
                <div dangerouslySetInnerHTML={{ __html: content.content }} />
                {/* <p>Welcome to ShareHeart, a digital platform dedicated to sharing and spreading the power of Christian faith through personal testimonies. This Privacy Policy outlines how we collect, use, protect, and share information about our users ("you") when you use our website, mobile application ("app"), and services (collectively, "Services").</p>
                    <h3 className='contentHeading'>Information We Collect</h3>
                    <p>Personal Information: When you register with ShareHeart, we may collect personal information such as your name, email address, and location. If you choose to record your testimony through our Services, we will also collect the video and any personal data you choose to include in it.</p>
                    <p>Technical Data: We automatically collect certain technical information from your device, including your IP address, browser type, device type, and usage data, such as how you interact with our Services.</p>
                    <h3 className='contentHeading'>How We Use Your Information</h3>
                    <div className='contentitalic'>We use your information to:</div>
                    <ul>
                        <li>Provide, maintain, and improve our Services;</li>
                        <li>Record, host, and stream your testimony videos;</li>
                        <li>Communicate with you about your account or our Services;</li>
                        <li>Enhance user experience and develop new features;</li>
                        <li>Comply with legal obligations and enforce our terms and policies.</li>
                    </ul>
                    <h3 className='contentHeading'>Sharing Your Information</h3>
                    <div className='contentitalic'>We do not sell your personal information. However, we may share your information with:</div>
                    <ul>
                        <li>Service providers who assist us in operating our Services, such as hosting and streaming services, subject to confidentiality agreements;</li>
                        <li>Law enforcement or other government agencies if required by law or to protect our rights and the safety of our users;</li>
                        <li>Third parties in connection with a merger, acquisition, or sale of our assets.</li>
                    </ul>
                    <h3 className='contentHeading'>Your Choices and Rights</h3>
                    <p>You have the right to access, correct, or delete your personal information stored with us. You can also object to or restrict certain processing of your data. To exercise these rights, please contact us at [contact information].</p>
                    <h3 className='contentHeading'>Data Security</h3>
                    <p>Our Services are not directed to individuals under the age of 13. We do not knowingly collect personal information from children under 13. If we become aware that we have collected personal information from a child under 13, we will take steps to delete such information from our files as soon as possible.</p>
                    <h3 className='contentHeading'>Children's Privacy</h3>
                    <p>Our Services are not directed to individuals under the age of 13. We do not knowingly collect personal information from children under 13. If we become aware that we have collected personal information from a child under 13, we will take steps to delete such information from our files as soon as possible.</p>
                    <h3 className='contentHeading'>Changes to This Privacy Policy</h3>
                    <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Effective date" at the top. We encourage you to review this Privacy Policy periodically for any changes.</p>
                    <h3 className='contentHeading'>Contact Us</h3>
                    <p>If you have any questions about this Privacy Policy or our privacy practices, please contact us at: Hello@shareheart.com</p> */}
            </div>
            {/* <Footer /> */}
        </div>
    );
}

export default PrivacyPolicy;
