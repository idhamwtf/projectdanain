import React from 'react';
import '../css/footer.css'
import {useSelector} from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { faTwitter, faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons'



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
                <FontAwesomeIcon icon={faFacebook} /> Facebook 
                </div>
                <div className='footer-box-content-social mr-4'>
                <FontAwesomeIcon icon={faTwitter} /> Twitter
                </div>
                <div className='footer-box-content-social mr-1'>
                <FontAwesomeIcon icon={faInstagram} /> Instagram
                </div>
               

            </div>
            <div className='footer-box'>
            <div className='footer-box-content'>
                    <span>About</span> <span style={{fontWeight:'700', fontSize:'16px', color:'#01579b'}}>DANA•IN</span>
                </div>
                <div className='footer-box-content' style={{fontSize:'12px'}}>
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