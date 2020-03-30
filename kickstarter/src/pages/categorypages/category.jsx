import React from 'react';
import './../../css/category.css'
import { useEffect,useState } from 'react';
import { useDispatch } from 'react-redux';
import {changeHeaderAction} from './../../redux/actions'
import Axios from 'axios';
import { APIURL,APIURLimage } from '../../helper/apiurl';
import {Link} from 'react-router-dom'


const CategoryPage=(props)=>{

    const dispatch=useDispatch()

    var category=props.match.params.category

    const [page,setPage]=useState(1)
    const [pager,setpager]=useState({})
    const [datacategory,setdatacategory]=useState()
    const[loading,setloading]=useState(true)

    useEffect(()=>{
        dispatch(changeHeaderAction(1))
        Axios.get(`${APIURL}product/getprojectcategory/${category}/${page}`)
        .then((res)=>{
            setdatacategory(res.data.pageOfdata)
            setpager(res.data.pager)
            setloading(false)
        }).catch((err)=>{
            console.log(err)
        })
    },[])

    useEffect(()=>{
        dispatch(changeHeaderAction(1))
        setloading(true)
        console.log('masukupdate')
        Axios.get(`${APIURL}product/getprojectcategory/${category}/${page}`)
        .then((res)=>{
            setdatacategory(res.data.pageOfdata)
            setpager(res.data.pager)
            setloading(false)
        }).catch((err)=>{
            console.log(err)
        })
    },[page])

    // console.log(props,'props')

    const renderDataCategory=()=>{
        return datacategory.map((val,index)=>{
            return(
                <div className="grid-item" style={{position:'relative'}} key={index}>
                    <Link to={`/projectdetail/${val.id}`} style={{textDecoration:'none', color:'black'}}>
                    <div>
                        <img src = {`${APIURLimage+val.gambarproject}`} style={{width:'100%',height:'25vh'}} />
                    </div>
                    <div style={{minHeight:'8vh', maxHeight:'8vh', overflow:'hidden',fontWeight:'600'}}>
                        {val.namaproject}
                    </div>
                    </Link>
                    <div style={{fontWeight:'600'}}>
                        Story
                    </div>
                    <div style={{minHeight:'10vh', maxHeight:'10vh', overflow:'hidden',maxWidth:'100%' }}>
                        {val.shortdescproject}
                    </div>
                    <div style={{fontWeight:'600',textAlign:'left', position:'absolute', bottom:'30px', width:'100%'}}>
                        By {val.username}
                    </div>
                    <Link to={`/projectdetail/${val.id}`} style={{textDecoration:'none', color:'black'}}>
                    <div style={{fontWeight:'600',color:'blue',position:'absolute', bottom:'0px'}}>
                        Here for more details
                    </div>
                    </Link>
                </div>
            )
        })
    }

    console.log(datacategory)


    if(loading){
        return(
            <div>
                Loading..
            </div>
        )
    }
    return(
        <div className ='teswoi' style={{minHeight:'89vh', position:'relative'}}>
            <div style={{fontSize:'60px',marginLeft:'50%', fontWeight:'200'}}>{props.match.params.category}</div>
            <div className="grid-container" style={{marginBottom:'50px'}}>
                {renderDataCategory()}
            </div>
            <div className ='teswoi2' style={{width: '50%',marginLeft:'62%', position:'absolute', bottom:'0px'}}>
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

export default CategoryPage;