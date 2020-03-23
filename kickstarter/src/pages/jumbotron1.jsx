import React, {useEffect} from 'react';
import '../css/jumbotron1.css'
import Progressbar from '../components/progressbar'
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import Axios from 'axios';
import { APIURL, APIURLimage } from '../helper/apiurl';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import {Link} from 'react-router-dom'
// import './../css/pagination.css'



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
            // console.log(fu)
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
                // console.log(fu)
            setloading(false)
        })
    },[page])

    const renderFeatured=()=>{
        return(
            datafeatured.map((val,index)=>{
                // console.log(val,index)
                return(
                    <div key={index} style={{height:'60%', width:'75%', margin:'15px 10%'}} >
                    <Link to={`/projectdetail/${val.id}`} style={{textDecoration:'none', color:'black'}}>
                        <img style={{height:'100%',width:'100%'}} src={`${APIURLimage+val.gambarproject}`} alt=""/>
                        <Progressbar defaultValue={0} value={parseInt(val.percentdonate)} height='15px' color='secondary' />
                    <div className='mt-3' style={{textAlign:'left', fontSize:'24px', fontWeight:'600'}}>{val.namaproject}</div>
                    <div className='mt-3' style={{textAlign:'left', fontSize:'18px', fontWeight:'500'}}>{val.shortdescproject}</div>
                    <div className='mt-3' style={{textAlign:'left', fontSize:'13px', fontWeight:'500', color:'#757575'}}>By {val.username}</div>
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
                    <div className='mr-3' style={{width:'43%'}}>
                    <Link to={`/projectdetail/${val.id}`} style={{textDecoration:'none', color:'black'}}>
                        <img  style={{width:'100%', height:'100%'}} src={`${APIURLimage+val.gambarproject}`} alt=""/>
                    </Link>
                    </div>
                    <div className='mr-3' style={{width:'57%'}}>
                        <div className='minibox-title' style={{ overflow:'hidden' , fontWeight:'bold'}}>
                        <Link to={`/projectdetail/${val.id}`} style={{textDecoration:'none', color:'black'}}>
                            {val.namaproject}
                        </Link>
                        </div>                        
                        <div className='minibox-funded' style={{color:'green', fontWeight:'600'}} >
                            {val.percentdonate}% Funded
                        </div>
                        <div style={{color:'#757575', fontWeight:'500'}}>
                            By {val.username}
                        </div>
                        <div className='d-flex flex-row'>
                            <div className='mx-3'>Icon</div>
                            <div className='mx-3'>Icon</div>
                            <div className='mx-3'><ThumbUpAltOutlinedIcon/></div>
                        </div>
                    </div>
                </div>
            )
        })
    }


    console.log(datarecommend)


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
                <div style={{textAlign:'left', margin:'15px 10%', color:'#757575', fontWeight:'bold'}}>Featured Project</div>
                {renderFeatured()}
                {/* <div style={{height:'60%', width:'75%', margin:'15px 10%'}} >
                    <img style={{height:'100%',width:'100%'}} src="https://ksr-static.imgix.net/8v9uwida-valor_anthology.png?ixlib=rb-2.1.0&auto=compress%2Cformat&w=1000&fit=min&s=4bcc268b184adad6cba9bb23fc75c1e7" alt=""/>
                    <Progressbar value='30' height='15px' color='secondary' />
                    <div className='mt-3' style={{textAlign:'left', fontSize:'24px', fontWeight:'600'}}>Valor Anthology : Volume 3</div>
                    <div className='mt-3' style={{textAlign:'left', fontSize:'18px', fontWeight:'500'}}>Fairy-tale comics starring courageous heroines</div>
                    <div className='mt-3' style={{textAlign:'left', fontSize:'13px', fontWeight:'500', color:'#757575'}}>By Megan Lavey-Heaton</div>
                </div> */}
            </div>
            <div className='box-jumbotron1 my-5'>
            <div style={{textAlign:'left', margin:'15px 10%', color:'#757575', fontWeight:'bold'}}>Recommend for you</div>
                <div style={{height:'82%', width:'90%', margin:'15px 10%'}} >
                    {renderRecommend()}
                    {/* <div className='minibox-jumobtron1 d-flex flex-row'>
                        <div className='mr-3' style={{width:'43%'}}>
                            <img  style={{width:'100%', height:'100%'}} src="https://ksr-ugc.imgix.net/assets/027/711/826/d3e9cb0a51a2c7b2a0f0177b37afda70_original.jpg?ixlib=rb-2.1.0&crop=faces&w=352&h=198&fit=crop&v=1578680880&auto=format&frame=1&q=92&s=a9f683ba0dcba5c5d605c820e2ade695" alt=""/>
                        </div>
                        <div className='mr-3' style={{width:'57%'}}>
                            <div className='minibox-title' style={{ overflow:'hidden' , fontWeight:'bold'}}>
                                MINA : The Creative Handcrafted Desk Organizer
                            </div>                        
                            <div className='minibox-funded' style={{color:'green', fontWeight:'600'}} >
                                1230123% Funded 
                            </div>
                            <div style={{color:'#757575', fontWeight:'500'}}>
                                By arcHITects
                            </div>
                            <div className='d-flex flex-row'>
                                <div className='mx-3'>Icon</div>
                                <div className='mx-3'>Icon</div>
                                <div className='mx-3'><ThumbUpAltOutlinedIcon/></div>
                            </div>
                        </div>
                        
                    </div> */}
                    {/* <div className='minibox-jumobtron1 d-flex flex-row'>
                    <div className='mr-3' style={{width:'43%'}}>
                            <img  style={{width:'100%', height:'100%'}} src="https://ksr-ugc.imgix.net/assets/027/711/826/d3e9cb0a51a2c7b2a0f0177b37afda70_original.jpg?ixlib=rb-2.1.0&crop=faces&w=352&h=198&fit=crop&v=1578680880&auto=format&frame=1&q=92&s=a9f683ba0dcba5c5d605c820e2ade695" alt=""/>
                        </div>
                        <div className='mr-3' style={{width:'57%'}}>
                            <div className='minibox-title' style={{overflow:'hidden', fontWeight:'bold'}}>
                                MINA : The Creative Handcrafted Desk Organizer
                            </div>                        
                            <div className='minibox-funded' style={{color:'green', fontWeight:'600'}} >
                                1230123% Funded 
                            </div>
                            <div style={{color:'#757575', fontWeight:'500'}}>
                                By arcHITects
                            </div>
                            <div className='d-flex flex-row'>
                                <div className='mx-3'>Icon</div>
                                <div className='mx-3'>Icon</div>
                                <div className='mx-3'><ThumbUpAltOutlinedIcon/></div>
                            </div>
                        </div>
                    </div> */}
                    {/* <div className='minibox-jumobtron1 d-flex flex-row'>
                        <div className='mr-3' style={{width:'43%'}}>
                            <img  style={{width:'100%', height:'100%'}} src="https://ksr-ugc.imgix.net/assets/027/711/826/d3e9cb0a51a2c7b2a0f0177b37afda70_original.jpg?ixlib=rb-2.1.0&crop=faces&w=352&h=198&fit=crop&v=1578680880&auto=format&frame=1&q=92&s=a9f683ba0dcba5c5d605c820e2ade695" alt=""/>
                        </div>
                        <div className='mr-3' style={{width:'57%'}}>
                            <div className='minibox-title' style={{overflow:'hidden', fontWeight:'bold'}}>
                                MINA : The Creative Handcrafted Desk Organizer
                            </div>                        
                            <div className='minibox-funded' style={{color:'green', fontWeight:'600'}}>
                                1230123% Funded 
                            </div>
                            <div style={{color:'#757575', fontWeight:'500'}}>
                                By arcHITects
                            </div>
                            <div className='d-flex flex-row'>
                                <div className='mx-3'>Icon</div>
                                <div className='mx-3'>Icon</div>
                                <div className='mx-3'><ThumbUpAltOutlinedIcon/></div>
                            </div>
                        </div>
                    </div> */}
                    <div style={{ marginLeft: '25%', width: '350px' }}>
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