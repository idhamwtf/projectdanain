import React from 'react';
import '../css/jumbotron2.css'
import Progressbar from '../components/progressbar'
import Slider from "react-slick";
import { useEffect } from 'react';
import Axios from 'axios';
import { APIURL, APIURLimage } from '../helper/apiurl';
import { useState } from 'react';
import {Link} from 'react-router-dom'



export default function Jumbotron2(){

    const [newproject,setnewproject]=useState()
    const [loading,setloading]=useState(true)

    useEffect(()=>{
        Axios.get(`${APIURL}product/getnewest`)
        .then((res)=>{
            // console.log(res.data)
            setnewproject(res.data)
            setloading(false)
        }).catch((err)=>{
            console.log(err)
        })
    },[])

    const renderNewProject=()=>{
        return newproject.map((val,index)=>{
            return(
            <div className='jumbotron2-box' style={{marginLeft:'5%'}}>
                <Link to={`/projectdetail/${val.id}`} style={{textDecoration:'none', color:'black'}}>
                <div style={{maxWidth:'40vh',height:'26vh'}}>
                <img style={{width:'100%',height:'100%'}} src={`${APIURLimage+val.gambarproject}`} alt=""/>
                    <Progressbar value={val.percentdonate} height='7px' color='secondary' />
                </div>
                </Link>
                <div style={{fontWeight:'700', margin:'3px'}}>
                    {val.namaproject}
                </div>
                <div style={{fontWeight:'400',margin:'10px 3px 40px 3px', fontSize:'14px', maxHeight:'30vh', overflow:'hidden'}}>
                    {val.shortdescproject}<br></br>
                    <span style={{fontWeight:'bold'}}>Story</span><br></br>
                    <span style={{maxHeight:'10px'}}>{val.aboutproject}</span>
                    {/* Little Apple started off as a live-action sci-fi drama series following a 9-year-old claircognizant (all-knowing) Black girl growing up in Harlem, N.Y. Now, it is so much more and I'm excited to expand this universe with you! */}
                </div>
                <div style={{fontWeight:'400', fontSize:'14px',position:'absolute', bottom:'0px'}}>
                    By {val.username}
                </div>
            </div>
            )
        })
    }

      
    if(loading){
        return(
            <div>
                Loading...
            </div>
        )
    }
    return (
        <div className='jumbotron-2 d-flex flex-row' style={{marginTop:'25px'}}>
            <div>
                <div style={{textAlign:'left', margin:'20px 5% 0% 5%', color:'#757575', fontWeight:'bold', fontSize:'18px'}}>New on DANA•IN</div>
                <div className='d-flex flex-row'>
                    {renderNewProject()}
                 </div>
            </div>
        </div>
    )
}