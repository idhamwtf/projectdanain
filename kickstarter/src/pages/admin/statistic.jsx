import React from 'react';
import './../../css/admin.css'
import { useEffect } from 'react';
import Axios from 'axios';
import { APIURL } from '../../helper/apiurl';
import { useState } from 'react';
import moment from 'moment'
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));


const StatisticWeb=()=>{

    const classes = useStyles();

    const [countusers,setcountusers]=useState()
    const [countprojects,setcountprojects]=useState()
    const [countdonate,setcountdonate]=useState()
    const [loading,setloading]=useState(true)
    const [bulan,setbulan]=useState(moment().format('M'))
    const [tahun,settahun]=useState(moment().format('Y'))

    useEffect(()=>{
        Axios.put(`${APIURL}admin/getstatisticusers`,{bulan, tahun})
        .then((res)=>{
            setcountusers(res.data)
            Axios.put(`${APIURL}admin/getstatisticprojects`,{bulan, tahun})
            .then((res1)=>{
                setcountprojects(res1.data)
                Axios.put(`${APIURL}admin/getstatisticdonate`,{bulan, tahun})
                .then((res2)=>{
                    // console.log(res2.data)
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

    useEffect(()=>{
        Axios.put(`${APIURL}admin/getstatisticusers`,{bulan, tahun})
        .then((res)=>{
            setcountusers(res.data)
            Axios.put(`${APIURL}admin/getstatisticprojects`,{bulan, tahun})
            .then((res1)=>{
                setcountprojects(res1.data)
                Axios.put(`${APIURL}admin/getstatisticdonate`,{bulan, tahun})
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
    },[bulan,tahun])

    const handleChangeBulan = event => {
        setbulan(event.target.value);
      };
    const handleChangeTahun = event => {
    settahun(event.target.value);
    };
    
    
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
                <FormControl className={classes.formControl} style={{marginLeft:'20%', marginRight:'20%', marginTop:'15px'}}>
                    <InputLabel id="demo-simple-select-label">Month</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={bulan}
                    onChange={handleChangeBulan}
                    >
                    <MenuItem value={1}>January</MenuItem>
                    <MenuItem value={2}>February</MenuItem>
                    <MenuItem value={3}>March</MenuItem>
                    <MenuItem value={4}>April</MenuItem>
                    <MenuItem value={5}>May</MenuItem>
                    <MenuItem value={6}>June</MenuItem>
                    <MenuItem value={7}>July</MenuItem>
                    <MenuItem value={8}>August</MenuItem>
                    <MenuItem value={9}>September</MenuItem>
                    <MenuItem value={10}>October</MenuItem>
                    <MenuItem value={11}>November</MenuItem>
                    <MenuItem value={12}>December</MenuItem>
                    </Select>
                </FormControl>
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
                <FormControl className={classes.formControl} style={{marginLeft:'20%', marginRight:'20%', marginTop:'15px'}}>
                    <InputLabel id="demo-simple-select-label">Year</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={tahun}
                    onChange={handleChangeTahun}
                    >
                    <MenuItem value={2019}>2019</MenuItem>
                    <MenuItem value={2020}>2020</MenuItem>
                    <MenuItem value={2021}>2021</MenuItem>
                    <MenuItem value={2022}>2022</MenuItem>
                    <MenuItem value={2023}>2023</MenuItem>
                    <MenuItem value={2024}>2024</MenuItem>
                    </Select>
                </FormControl>
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