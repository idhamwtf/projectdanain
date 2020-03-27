import React from 'react';
import './../../css/admin.css'
import { useEffect } from 'react';
import Axios from 'axios';
import { APIURL } from '../../helper/apiurl';
import { useState } from 'react';


const StatisticWeb=()=>{

    const [countusers,setcountusers]=useState()
    const [countprojects,setcountprojects]=useState()
    const [countdonate,setcountdonate]=useState()
    const [loading,setloading]=useState(true)

    useEffect(()=>{
        Axios.put(`${APIURL}admin/getstatisticusers`)
        .then((res)=>{
            setcountusers(res.data)
            Axios.put(`${APIURL}admin/getstatisticprojects`)
            .then((res1)=>{
                setcountprojects(res1.data)
                Axios.put(`${APIURL}admin/getstatisticdonate`)
                .then((res2)=>{
                    console.log(res2.data)
                    setcountdonate(res2.data)
                    setloading(false)
                }).catch((err2)=>{
                    console.log(err2)
                })
            }).catch((err1)=>{
                console.log(err1)
            })
            
        }).catch((err)=>{
            console.log(err)
        })
       
    },[])
    
    if(loading){
        return (
            <div>Loading...</div>
            )
    }
    return(
        <div className='d-flex flex-row admin-dashboard'>
            <div className='box-admin d-flex flex-column' style={{width:'100%', backgroundColor:'#e8eaf6', color:'black'}}>
                {/* today report starts */}
                <div style={{height:'30px', fontSize:'30px  '}}>Today Report</div>
                <div className='d-flex flex-row'>
                    <div className='statistic-box'>
                        User Created
                        <div style={{fontSize:'100px'}}>{countusers.today[0].COUNTUSERS>=1?<span style={{color:'green'}}>{countusers.today[0].COUNTUSERS}</span>:<span>{countusers.today[0].COUNTUSERS}</span>}</div>
                    </div>
                    <div className='statistic-box'>
                        Project Created
                        <div style={{fontSize:'100px'}}>{countprojects.today[0].COUNTPROJECTS>=1?<span style={{color:'green'}}>{countprojects.today[0].COUNTPROJECTS}</span>:<span>{countprojects.today[0].COUNTPROJECTS}</span>}</div>
                    </div>
                    <div className='statistic-box'>
                        Donation Made
                     <div style={{fontSize:'100px'}}>{countdonate.today[0].COUNTDONATION>=1?<span style={{color:'green'}}>{countdonate.today[0].COUNTDONATION}</span>:<span>{countdonate.today[0].COUNTDONATION}</span>}</div>
                    </div>
                </div>
                {/* today report ends */}
                {/* monthly report starts */}
                <div style={{height:'30px', fontSize:'30px', marginTop:'2%'}}>Monthly Report</div>
                <div className='d-flex flex-row'>
                    <div className='statistic-box'>
                        User Created
                        <div style={{fontSize:'100px'}}>{countusers.monthly[0].COUNTUSERS>=1?<span style={{color:'green'}}>{countusers.monthly[0].COUNTUSERS}</span>:<span>{countusers.monthly[0].COUNTUSERS}</span>}</div>
                    </div>
                    <div className='statistic-box'>
                        Project Created
                    <div style={{fontSize:'100px'}}>{countprojects.monthly[0].COUNTPROJECTS>=1?<span style={{color:'green'}}>{countprojects.monthly[0].COUNTPROJECTS}</span>:<span>{countprojects.monthly[0].COUNTPROJECTS}</span>}</div>
                    </div>
                    <div className='statistic-box'>
                        Donation Made
                        <div style={{fontSize:'100px'}}>{countdonate.monthly[0].COUNTDONATION>=1?<span style={{color:'green'}}>{countdonate.monthly[0].COUNTDONATION}</span>:<span>{countdonate.monthly[0].COUNTDONATION}</span>}</div>
                    </div>
                </div>
                {/* monthly report ends */}
                {/* Yearly report starts */}
                <div style={{height:'30px', fontSize:'30px', marginTop:'2%'}}>Annual Report</div>
                <div className='d-flex flex-row'>
                    <div className='statistic-box'>
                        User Created
                        <div style={{fontSize:'100px'}}>{countusers.annual[0].COUNTUSERS>=1?<span style={{color:'green'}}>{countusers.annual[0].COUNTUSERS}</span>:<span>{countusers.annual[0].COUNTUSERS}</span>}</div>
                    </div>
                    <div className='statistic-box'>
                        Project Created
                        <div style={{fontSize:'100px'}}>{countprojects.annual[0].COUNTPROJECTS>=1?<span style={{color:'green'}}>{countprojects.annual[0].COUNTPROJECTS}</span>:<span>{countprojects.annual[0].COUNTPROJECTS}</span>}</div>
                    </div>
                    <div className='statistic-box'>
                        Donation Made
                        <div style={{fontSize:'100px'}}>{countdonate.annual[0].COUNTDONATION>=1?<span style={{color:'green'}}>{countdonate.annual[0].COUNTDONATION}</span>:<span>{countdonate.annual[0].COUNTDONATION}</span>}</div>
                    </div>
                </div>
                {/* Yearly report ends */}
            </div>
        </div>
    )
}


export default StatisticWeb;