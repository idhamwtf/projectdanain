import React from 'react';
import './../../css/history.css'
import { useEffect } from 'react';
import Axios from 'axios';
import { useState } from 'react';
import { APIURL } from '../../helper/apiurl';
import {Link} from 'react-router-dom'
import NumberFormat from 'react-number-format'

const HistorySupporterProject=()=>{

    const [page,setPage]=useState(1)
    const [pager,setpager]=useState({})
    const [loading,setloading]=useState(true)
    const [datasupporter,setdatasupporter]=useState()

    useEffect(()=>{
        var id = localStorage.getItem('id')
        Axios.put(`${APIURL}product/gethistorysupporterproject/${id}/${page}`)
        .then((res)=>{
            // console.log(res.data)
            setdatasupporter(res.data.pageOfdata)
            setpager(res.data.pager)
            setloading(false)
        }).catch((err)=>{
            console.log(err)
        })
    },[])
    useEffect(()=>{
        var id = localStorage.getItem('id')
        Axios.put(`${APIURL}product/gethistorysupporterproject/${id}/${page}`)
        .then((res)=>{
            // console.log(res.data.pageOfdata,'data')
            setdatasupporter(res.data.pageOfdata)
            setpager(res.data.pager)
            setloading(false)
        }).catch((err)=>{
            console.log(err)
        })
    },[page])


    const renderSupporterProject=()=>{
        return datasupporter.map((val,index)=>{
            return(
            <div className='history-supporter-box' key={index}>
                <div style={{fontSize:'16px', fontWeight:'600',marginLeft:'10px'}}>
                    Username, <span style={{color:'red'}}>{val.username} </span>
                    have been donate to your project <Link to={`/projectdetail/${val.idproject}`} style={{textDecoration:'none', color:'black'}}><span style={{color:'#01579b'}}>{val.namaproject}</span></Link> <span style={{color:'green'}}>Rp. <NumberFormat value={val.jumlahdonasi} displayType={"text"} thousandSeparator={true} />.-</span>
                </div>
            </div>
            )
        })
    }


    if(loading){
        return(
            <div>Loading...</div>
        )
    }
    if(datasupporter<1){
        return(
            <div style={{fontSize:'40px',fontWeight:'600', width:'130vh', height:'85vh'}}>You got no History</div>
        )
    }
    return(
        <div style={{minHeight:'85vh', position:'relative'}}>
            {renderSupporterProject()}
            <div style={{ marginLeft: '35%', width: '350px',position:'absolute', bottom:'0px' }}>
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

export default HistorySupporterProject;