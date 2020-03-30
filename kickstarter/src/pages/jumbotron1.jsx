import React, {useEffect} from 'react';
import '../css/jumbotron1.css'
import Progressbar from '../components/progressbar'
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import Axios from 'axios';
import { APIURL, APIURLimage } from '../helper/apiurl';
import { useState } from 'react';
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter, faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons'

function Jumbotron1(){

    const [datafeatured,setdatafeatured] = useState([])
    const [page,setPage]=useState(1)
    const [pager,setpager]=useState({})
    const [datarecommend,setdatarecommend]=useState([])
    const [loading,setloading] = useState(true)

    useEffect(()=>{
        Axios.get(`${APIURL}product/getfeatured`)
        .then((res)=>{
            setdatafeatured(res.data)
            Axios.get(`${APIURL}product/getrecommend/${page}`)
            .then((res1)=>{
                setdatarecommend(res1.data.pageOfdata)
                setpager(res1.data.pager)
            }).catch((err1)=>{
                console.log(err1)
            })
        }).catch((err)=>{
            console.log(err)
        }).finally((fu)=>{
            setloading(false)
        })
    },[])

    useEffect(()=>{
            Axios.get(`${APIURL}product/getrecommend/${page}`)
            .then((res1)=>{
                setdatarecommend(res1.data.pageOfdata)
                setpager(res1.data.pager)
            }).catch((err1)=>{
                console.log(err1)
            }).finally((fu)=>{
            setloading(false)
        })
    },[page])

    const renderFeatured=()=>{
        return(
            datafeatured.map((val,index)=>{
                return(
                    <div key={index} style={{height:'60%', width:'75%', margin:'15px 10%'}} >
                    <Link to={`/projectdetail/${val.id}`} style={{textDecoration:'none', color:'black'}}>
                        <img style={{height:'100%',width:'100%'}} src={`${APIURLimage+val.gambarproject}`} alt=""/>
                        <Progressbar defaultValue={0} value={parseInt(parseInt(val.percentdonate))} height='15px' color='secondary' />
                    <div className='mt-3' style={{textAlign:'left', fontSize:'26px', fontWeight:'700'}}>{val.namaproject}</div>
                    <div className='mt-3' style={{textAlign:'left', fontSize:'20px', fontWeight:'600'}}>{val.shortdescproject}</div>
                    <div className='mt-3' style={{textAlign:'left', fontSize:'15px', fontWeight:'600', color:'#757575'}}>By {val.username}</div>
                    </Link>
                </div>
                )
            })
            )
    }
    
    const renderRecommend=()=>{
        return datarecommend.map((val,index)=>{
            return(
                <div className='minibox-jumobtron1 d-flex flex-row' key={index}>
                    <div className='mr-3' style={{width:'43%',borderBottom:'none'}}>
                    <Link to={`/projectdetail/${val.id}`} style={{textDecoration:'none', color:'black'}}>
                        <img  style={{width:'100%', height:'100%'}} src={`${APIURLimage+val.gambarproject}`} alt=""/>
                    </Link>
                    </div>
                    <div className='mr-3' style={{width:'57%'}}>
                        <div className='minibox-title' style={{ overflow:'hidden' , fontWeight:'bold',fontSize:'19px'}}>
                        <Link to={`/projectdetail/${val.id}`} style={{textDecoration:'none', color:'black'}}>
                            {val.namaproject}
                        </Link>
                        </div>                        
                        <div className='minibox-funded' style={{color:'green', fontWeight:'600'}} >
                            {parseInt(val.percentdonate)}% Funded
                        </div>
                        <div style={{color:'#757575', fontWeight:'500'}}>
                            By {val.username}
                        </div>
                        <div className='d-flex flex-row'>
                            <div className='mx-3'> <a href="https://www.facebook.com/" style={{textDecoration:'none',color:'black', marginRight:'7px', fontSize:'20px'}}><FontAwesomeIcon icon={faFacebook} /></a></div>
                            <div className='mx-3'> <a href="https://www.instagram.com/" style={{textDecoration:'none',color:'black', marginRight:'7px',fontSize:'20px'}}><FontAwesomeIcon icon={faInstagram} /></a></div>
                            <div className='mx-3' style={{marginBottom:'6px'}}><ThumbUpAltOutlinedIcon/></div>
                        </div>
                    </div>
                </div>
            )
        })
    }

    if(loading){
        return (
            <div>
                Loading...
            </div>
        )
    }
    return (
        <div className='jumbotron-1 d-flex flex-row'>
            <div className='box-jumbotron1 my-5' style={{borderRight:'1px silver solid'}} >
                <div style={{textAlign:'left', margin:'15px 10%', color:'#757575', fontWeight:'bold', fontSize:'18px'}}>Featured Project</div>
                {renderFeatured()}
            </div>
            <div className='box-jumbotron1 my-5'>
            <div style={{textAlign:'left', margin:'15px 10%', color:'#757575', fontWeight:'bold', fontSize:'18px'}}>Recommend for you</div>
                <div style={{height:'82%', width:'90%', margin:'15px 10%'}} >
                    {renderRecommend()}
                    <div style={{ marginLeft: '14%', width: '350px', marginTop:'25px' }}>
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
            </div>
        </div>
    )
}


export default Jumbotron1;