import React from 'react';
import '../css/footer.css'
import {useSelector} from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter, faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons'
import { Link } from 'react-router-dom';


export default function Footer(){
    const { footer } = useSelector(state=>state.HeaderFooter)

    if(footer===1){
        return null
    }
    return ( 
        <div className='footertron d-flex flex-row'>
            <div className='footer-box'>
            <div className='footer-box-content'>
                    Follow Our Social Media
                </div>
                <div className='footer-box-content-social'>
                <a href="https://www.facebook.com/" style={{textDecoration:'none',color:'black', marginRight:'7px'}}><FontAwesomeIcon icon={faFacebook} /> Facebook </a>
                </div>
                <div className='footer-box-content-social mr-4'>
                <a href="https://www.twitter.com/" style={{textDecoration:'none',color:'black'}}><FontAwesomeIcon icon={faTwitter} /> Twitter</a>
                </div>
                <div className='footer-box-content-social mr-1'>
                <a href="https://www.instagram.com/" style={{textDecoration:'none',color:'black', marginRight:'7px'}}><FontAwesomeIcon icon={faInstagram} /> Instagram</a>
                </div>
               

            </div>
            <div className='footer-box'>
            <div className='footer-box-content'>
                    <span>About</span> <span style={{fontWeight:'700', fontSize:'16px', color:'#01579b'}}>DANA•IN</span>
                </div>
                <div className='footer-box-content' style={{fontSize:'14px'}}>
                    DANA•IN is crowd-funding website.<br></br>
                    the concept and design inspired by kickstarter.<br></br>
                    Created  forIndonesian people to help creative project <br></br>
                    asodkaosdaoskdoasdokasdoasdk<br></br>
                    oaksdoasdkoasdkaosdko<br></br>
                </div>
            </div>
            <div className='footer-box'>

            </div>
        </div>
    )
}