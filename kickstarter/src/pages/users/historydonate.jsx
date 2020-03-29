import React from 'react';
import './../../css/history.css'
import { useEffect } from 'react';
import Axios from 'axios';
import { APIURL,APIURLimage } from '../../helper/apiurl';
import { useState } from 'react';
import {Link} from 'react-router-dom'
import NumberFormat from 'react-number-format'


const HistoryDonate=()=>{

    const [page,setPage]=useState(1)
    const [pager,setpager]=useState({})
    const [loading,setloading]=useState(true)
    const [datahistorydonate,setdatahistorydonate]=useState()

    useEffect(()=>{
        var id = localStorage.getItem('id')
        Axios.put(`${APIURL}product/gethistorydonate/${parseInt(id)}/${page}`)
        .then((res)=>{
            // console.log(res.data)
            setdatahistorydonate(res.data.pageOfdata)
            setpager(res.data.pager)
            setloading(false)
        }).catch((err)=>{
            console.log(err)
        })
    },[])

    useEffect(()=>{
        var id = localStorage.getItem('id')
        Axios.put(`${APIURL}product/gethistorydonate/${parseInt(id)}/${page}`)
        .then((res)=>{
            // console.log(res.data.pageOfdata)
            setdatahistorydonate(res.data.pageOfdata)
            setpager(res.data.pager)
            setloading(false)
        }).catch((err)=>{
            console.log(err)
        })
    },[page])

    const renderHistoryDonate=()=>{
        console.log(datahistorydonate)
        return datahistorydonate.map((val,index)=>{
            {
                return(
                val.confirm===0?
                <div className='history-content d-flex flex-row'>
                <div style={{maxWidth:'62vh', width:'47vh', borderRight:'1px silver solid'}}>
                    <div style={{fontSize:'20px', fontWeight:'600',justifyContent:'left', textAlign:'left'}}>
                        You've donated to this project
                    </div>
                    <div style={{fontSize:'15px', fontWeight:'500',justifyContent:'left', textAlign:'left', marginTop:'10px'}}>
                        You've Donate <span style={{color:'green'}}>Rp.<NumberFormat value={val.jumlahdonasi} displayType={"text"} thousandSeparator={true} />.-</span> to this project<br></br>
                        <span style={{color:'#f57f17'}}>But our staff still checking your donation</span><br></br>
                        Please kindly waiting for us and once again<br></br>
                        Thanks for trusting this project and <span style={{color:'#01579b', fontWeight:'700'}}>DANA•IN</span><br></br>
                        Glad to have you.
                    </div>
                    <div style={{fontSize:'14px', fontWeight:'600',justifyContent:'bottom', textAlign:'left', marginTop:'5%'}}>
                        Status : <span style={{color:'#f57f17'}}>Pending</span>
                    </div>

                </div>
                <div className='d-flex flex-row' style={{width:'100vh', marginLeft:'2%'}}>
                    <div>
                        <div style={{marginLeft:'2%' ,textAlign:'right',maxHeight:'100%',width:'300px',fontSize:'20px', fontWeight:'600'}}>
                            {val.namaproject}
                        </div>
                        <div style={{textAlign:"center",marginTop:'1.5%', fontWeight:'600'}}>
                            {val.shortdescproject}
                        </div>
                    </div>
                    <div>
                    <Link to={`/projectdetail/${val.id}`} style={{textDecoration:'none', color:'black'}}>
                        <img src = {`${APIURLimage+val.gambarproject}`} style={{height:'100%',maxWidth:'52vh',width:'51vh'}}/>
                    </Link>
                    </div>
                </div>
            </div>
            :
            val.confirm===1?
            <div className='history-content d-flex flex-row'>
                <div style={{maxWidth:'62vh', width:'47vh', borderRight:'1px silver solid'}}>
                    <div style={{fontSize:'20px', fontWeight:'600', justifyContent:'left', textAlign:'left'}}>
                        You've donated to this project
                    </div>
                    <div style={{fontSize:'15px', fontWeight:'500', justifyContent:'left', textAlign:'left', marginTop:'10px'}}>
                        You've Contributed <span style={{color:'green'}}>Rp.<NumberFormat value={val.jumlahdonasi} displayType={"text"} thousandSeparator={true} />.-</span> to this project<br></br>
                        {/* Thank to your contribution this project already <span style={{color:'green'}}>Funded 10% </span>of  project target :)<br></br> */}
                        Thanks for trusting this project and <span style={{color:'#01579b', fontWeight:'700'}}>DANA•IN</span><br></br>
                        Glad to have you.
                    </div>
                    <div style={{fontSize:'14px', fontWeight:'600', justifyContent:'bottom', textAlign:'left', marginTop:'16%'}}>
                        Status : <span style={{color:'green'}}>Confirmed</span>
                    </div>

                </div>
                <div className='d-flex flex-row' style={{width:'100vh', marginLeft:'2%'}}>
                    <div>
                        <div style={{marginLeft:'2%' ,textAlign:'right',maxHeight:'100%',width:'300px',fontSize:'20px', fontWeight:'600'}}>
                            {val.namaproject}
                        </div>
                        <div style={{textAlign:"center",marginTop:'1.5%', fontWeight:'600'}}>
                            {val.shortdescproject}
                        </div>
                    </div>
                    <div>
                        <Link to={`/projectdetail/${val.id}`} style={{textDecoration:'none', color:'black'}}>
                            <img src = {`${APIURLimage+val.gambarproject}`} style={{height:'100%',maxWidth:'52vh',width:'51vh'}}/>
                        </Link>
                    </div>
                </div>
            </div>
            :
            <div className='history-content d-flex flex-row'>
                <div style={{maxWidth:'62vh', width:'47vh', borderRight:'1px silver solid'}}>
                    <div style={{fontSize:'20px', fontWeight:'600', justifyContent:'left', textAlign:'left'}}>
                        You've donated to this project
                    </div>
                    <div style={{fontSize:'15px', fontWeight:'500', justifyContent:'left', textAlign:'left', marginTop:'10px'}}>
                        <span style={{color:'#d50000'}}>But our staff can't verify your donation</span><br></br>
                        If you think you've follow our rules and you think already donate properly please <span style={{color:'#3f51b5'}}>ask our staff here.</span><br></br>
                        Regards, <span style={{color:'#01579b', fontWeight:'700'}}>DANA•IN</span>.<br></br>
                        Glad to have you.
                    </div>
                    <div style={{fontSize:'14px', fontWeight:'600', justifyContent:'bottom', textAlign:'left', marginTop:'5%'}}>
                        Status : <span style={{color:'#d50000'}}>Declined</span>
                    </div>

                </div>
                <div className='d-flex flex-row' style={{width:'100vh', marginLeft:'2%'}}>
                    <div>
                        <div style={{marginLeft:'2%' ,textAlign:'right',maxHeight:'100%', width:'300px',fontSize:'20px', fontWeight:'600'}}>
                            {val.namaproject}
                        </div>
                        <div style={{textAlign:"center",marginTop:'1.5%', fontWeight:'600'}}>
                            {val.shortdescproject}
                        </div>
                    </div>
                        <div>
                    <Link to={`/projectdetail/${val.id}`} style={{textDecoration:'none', color:'black'}}>
                            <img src = {`${APIURLimage+val.gambarproject}`} style={{height:'100%',maxWidth:'52vh',width:'51vh'}}/>
                    </Link>
                        </div>
                </div>
            </div>
            )
            }
        })
    }
    

    if(loading){
        return(
            <div>Loading...</div>
        )
    }
    if(datahistorydonate<1){
        return (
            <div style={{fontSize:'40px',fontWeight:'600', width:'130vh', height:'85vh'}}>You got no History</div>
        )
    }
    return(
        <div className='teswoi' style={{minHeight:'85vh'}}>
            {renderHistoryDonate()}     
                    <div className='teswoi2' style={{ marginLeft: '35%', width: '350px'}}>
                    {pager.pages && pager.pages.length &&
                        <ul className="pagination">
                            <li className={`page-item first-item ${pager.currentPage === 1 ? 'disabled' : ''}`}>
                                <Link to={{ search: `?page=1` }} className="page-link" onClick={() => setPage(pager.startPage)}>First</Link>
                            </li>
                            <li className={`page-item previous-item ${pager.currentPage === 1 ? 'disabled' : ''}`}>
                                <Link to={{ search: `?page=${pager.currentPage - 1}` }} className="page-link" onClick={() => setPage(pager.currentPage - 1)}>Previous</Link>
                            </li>
                            {pager.pages.map(page =>
                                <li key={page} className={`page-item number-item ${pager.currentPage === page ? 'active' : ''}`}>
                                    <Link to={{ search: `?page=${page}` }} className="page-link" onClick={() => setPage(page)}>{page}</Link>
                                </li>
                            )}
                            <li className={`page-item next-item ${pager.currentPage === pager.totalPages ? 'disabled' : ''}`}>
                                <Link to={{ search: `?page=${pager.currentPage + 1}` }} className="page-link" onClick={() => setPage(pager.currentPage + 1)}>Next</Link>
                            </li>
                            <li className={`page-item last-item ${pager.currentPage === pager.totalPages ? 'disabled' : ''}`}>
                                <Link to={{ search: `?page=${pager.totalPages}` }} className="page-link" onClick={() => setPage(pager.totalPages)}>Last</Link>
                            </li>
                        </ul>
                        }
                    </div>
    </div>
    )
}

export default HistoryDonate;