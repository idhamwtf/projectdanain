import React, { useEffect,useState } from 'react';
import './../css/explore.css'
import './../css/searchbox.css'
import {changeHeaderAction} from './../redux/actions'
import { useDispatch } from 'react-redux';
import { APIURL,APIURLimage } from '../helper/apiurl';
import Axios from 'axios';
import {Link} from 'react-router-dom'
// import {  } from '@material-ui/core';
import NumberFormat from 'react-number-format'



const ExploreContent=(props)=>{
    const dispatch = useDispatch()

    const [page,setPage]=useState(1)
    const [pager,setpager]=useState({})
    const [datasearch,setdatasearch]=useState([])
    const [loading,setloading]=useState(true)

    const data = props

    useEffect(()=>{
        dispatch(changeHeaderAction(1))
            Axios.post(`${APIURL}product/getsearch/${page}`, {data})
            .then((res)=>{
                setpager(res.data.pager)
                setdatasearch(res.data.pageOfdata)
            }).catch((err)=>{
                console.log(err)
            }).finally((final)=>{
                setloading(false)
            })
    },[])
    useEffect(()=>{
        dispatch(changeHeaderAction(1))
        setloading(true)
            Axios.post(`${APIURL}product/getsearch/${page}`, {data})
            .then((res)=>{
                setdatasearch(res.data.pageOfdata)
                setpager(res.data.pager)
            }).catch((err)=>{
                console.log(err)
            }).finally((final)=>{
                setloading(false)
            }) 
    },[page,props.data])


    const renderSearch=()=>{
        return datasearch.map((val,index)=>{
            return (
                <div className='box-search-content-isi d-flex flex-row' key={index}>
                <div style={{height:'100%', width:'30%', border:'none'}}>
                    <Link to={`/projectdetail/${val.id}`} style={{textDecoration:'none', color:'black'}}>
                        <img src={`${APIURLimage+val.gambarproject}`} style={{width:'100%',height:'100%'}} />
                    </Link>
                </div>
                <div className='d-flex flex-column' style={{width:'66%', marginLeft:'0'}}>
                    <div style={{fontSize:'26px', fontWeight:'700'}}>
                    <Link to={`/projectdetail/${val.id}`} style={{textDecoration:'none', color:'black'}}>
                        {val.namaproject}
                    </Link>
                    </div>
                    <div style={{fontSize:'20px', fontWeight:'600'}}>
                        {val.shortdescproject}        
                    </div>
                    <div style={{fontSize:'18px', fontWeight:'600'}}>
                        Category : {val.category}
                    </div>
                    <div style={{fontSize:'18px', fontWeight:'600'}}>
                        Target : Rp. <NumberFormat value={val.targetuang} displayType={"text"} thousandSeparator={true} />
                    </div>
                    <div style={{fontSize:'18px', fontWeight:'600', color:'green'}}>
                        Funded : {parseInt(val.percentdonate)}%
                    </div>
                    <div style={{fontSize:'18px', fontWeight:'600'}}>
                        By : {val.username}
                    </div>
                </div>
            </div>
            )
        })
    }

    if(loading){
        return(
            <div>Loading..</div>
        )
    }else if(datasearch.length===0){
        return (
        <div>
            ga ada data
        </div>
        
        )
    }else{
        return(
        <div className='box-search-content d-flex flex-column'>
            {renderSearch()}
        <div style={{ marginLeft: '40%', width: '350px'}}>
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
                            <Link to={{ search: `?page=${page}` }}  className="page-link" onClick={() => setPage(page)}>{page}</Link>
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
}


export default ExploreContent;