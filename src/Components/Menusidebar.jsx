import React from 'react';
import UploadIc from '../assets/image/uploadIc.svg';
import ShopIc from '../assets/image/shopIc.svg';
import EternalIc from '../assets/image/eternalIc.svg';
import CrossIc from '../assets/image/crossIc.svg';
import { Link } from 'react-router-dom';

const Menusidebar = () => {
    return (
        <div className='menusidebar'>
            <div className='crossMenu'><img src={CrossIc}/></div>
            <div className='menusidebarin'>
                <div className='topMenu'>
                    <ul>
                        <li className='topMenuitm'><Link to="/"><img src={UploadIc}/> <span>Upload</span></Link></li>
                        <li className='topMenuitm'><Link to="/"><img src={ShopIc}/> <span>Shop</span></Link></li>
                        <li className='topMenuitm'><Link to="/get-eternal-life"><img src={EternalIc}/> <span>Get Eternal Life</span></Link></li>
                    </ul>
                    <div className='topMenulink'><Link to="/">Watch Real Stories</Link></div>
                </div>
                <div className='menuLinks'>
                    <div className='menulnkHeading'>Company</div>
                    <ul>
                        <li><Link to="/about-us">About</Link></li>
                        <li><Link to="/contact-us">Contact</Link></li>
                        <li><Link to="/join-us">Join US</Link></li>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/help-desk">Helpdesk</Link></li>
                        <li><Link to="/install-app">Install App</Link></li>
                    </ul>
                    <div className='menulnkHeading'>Legal</div>
                    <ul>
                        <li><Link to="/terms-service">Terms of Service</Link></li>
                        <li><Link to="/privacy-policy">Privacy Policy</Link></li>
                    </ul>
                </div>
            </div>
            <div className='menucopyright'>@ 2024 WowSquare LLC</div>
        </div>
    );
}

export default Menusidebar;
