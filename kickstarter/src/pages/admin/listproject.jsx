import React from 'react';
import '../../css/admin.css'
// import MaterialTable from 'material-table';
import { useEffect } from 'react';
import {useDispatch} from 'react-redux'
// import { changeHeaderAction, changeFooterAction, loginAction} from '../../redux/actions'
import { Button, Link } from '@material-ui/core';
// import VisibilityIcon from '@material-ui/icons/Visibility';
import { useState } from 'react';
// import {dataProject, getbukti} from './redux/actions'
import Axios from 'axios';
import { APIURL, APIURLimage } from '../../helper/apiurl';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import NumberFormat from 'react-number-format'


const ListBayar=()=>{


    // const dispatch = useDispatch()

  const [page,setPage]=useState(1)
  const [pager,setpager]=useState({})
  const [dataproject,setdataproject]=useState([])
//   const [list,setlist]=useState('')
  const [proof,setproof]=useState(false)
  const [linkgambar,setlinkgambar]=useState('')
  const [update,setupdate]=useState(true)
  

  // const dataproject = useSelector(state=>state.admin)
    // const dispatch = useDispatch()

    useEffect(()=>{
    //   dispatch(changeFooterAction(1))
      // dispatch(getbukti(page))
      Axios.get(`${APIURL}admin/getlistproject/${page}`)
      .then((res)=>{
          setdataproject(res.data.pageOfdata)
          setpager(res.data.pager)
      }).catch((err)=>{
          console.log(err)
      })
    },[])

    useEffect(()=>{
      Axios.get(`${APIURL}admin/getlistproject/${page}`)
      .then((res)=>{
          setdataproject(res.data.pageOfdata)
          setpager(res.data.pager)
      }).catch((err)=>{
          console.log(err)
      })
    },[page])

    useEffect(()=>{
        Axios.get(`${APIURL}admin/getlistproject/${page}`)
        .then((res)=>{
            setdataproject(res.data.pageOfdata)
            setpager(res.data.pager)
            setupdate(false)
        }).catch((err)=>{
            console.log(err)
        })
      },[update])

      console.log(dataproject)
      const onClickButtonDelete=(id)=>{
        Axios.put(`${APIURL}admin/deleteprojectadmin/${id}`)
        .then((res)=>{
            // console.log(res)
            setupdate(true)
        }).catch((err)=>{
            console.log(err)
        })
    }
      

      const renderList=()=>{
          return dataproject.map((val,index)=>{
              if(page===1){

                  return(
                      <div className='box-list d-flex flex-row asu' style={{backgroundColor:'white', margin:'25px', height:'300px'}} key={index}>
                    <div>{index+1}.</div>
                    <div style={{marginLeft:'20px', marginTop:'20px'}}>
                        <img src={`${APIURLimage+val.gambarproject}`} style={{width:'300px'}}/>
                    </div>
                    <div className='d-flex flex-column' style={{marginLeft:'30px', textAlign:'left'}}>
                        <div style={{marginBottom:'1px'}}>Title : {val.namaproject} </div>
                        <div style={{marginBottom:'1px'}}>Short Desc : {val.shortdescproject}</div>
                        <div style={{marginBottom:'1px'}}>Category : {val.category}</div>
                        <div style={{marginBottom:'1px', color:'green'}}>Target : Rp. <NumberFormat value={val.targetuang} displayType={"text"} thousandSeparator={true} /></div>
                        <div style={{marginBottom:'1px', color:'green'}}>Funded : {parseInt(val.percentdonate)}%</div>
                        <div style={{marginBottom:'1px',fontWeight:'500'}}>By user : {val.username}</div>
                        <div style={{marginBottom:'1px',fontWeight:'500'}}>Tanggal post : {val.datepost}</div>
                    </div>
                    {/* <div>Jumlah Donasi</div> */}
                    {/* <div style={{marginLeft:'200px'}}>Bukti Donasi</div> */}
                    <div className='d-flex flex-row' style={{marginTop:'10px',marginBottom:'15px', marginLeft:'auto', marginRight:'7px'}}>
                    {/* <Button variant="contained" color="primary" style={{width:'100px',height:'35px', textAlign:'center', marginLeft:'5px',marginBottom:'10px'}}>Confirm</Button> */}
                    <Button onClick={()=>onClickButtonDelete(val.id)} variant="contained" color="secondary" style={{width:'200px',height:'85px', textAlign:'center', marginRight:'10px',marginTop:'70px'}}>DELETE PROJECT</Button>
                    </div>
                </div>
              )
            }else{
                return(
                    <div className='box-list d-flex flex-row asu' style={{backgroundColor:'white', margin:'25px', height:'300px'}} key={index}>
                    <div>{(index+1*(page+5))-1}.</div>
                    <div style={{marginLeft:'20px', marginTop:'20px'}}>
                        <img src={`${APIURLimage+val.gambarproject}`} style={{width:'300px'}}/>
                    </div>
                    <div className='d-flex flex-column' style={{marginLeft:'30px', textAlign:'left'}}>
                        <div style={{marginBottom:'1px'}}>Title : {val.namaproject} </div>
                        <div style={{marginBottom:'1px'}}>Short Desc : {val.shortdescproject}</div>
                        <div style={{marginBottom:'1px'}}>Category : {val.category}</div>
                        <div style={{marginBottom:'1px', color:'green'}}>Target : Rp. <NumberFormat value={val.targetuang} displayType={"text"} thousandSeparator={true} /></div>
                        <div style={{marginBottom:'1px', color:'green'}}>Funded : {parseInt(val.percentdonate)}%</div>
                        <div style={{marginBottom:'1px',fontWeight:'500'}}>By user : {val.username}</div>
                        <div style={{marginBottom:'1px',fontWeight:'500'}}>Tanggal post : {val.datepost}</div>
                    </div>
                    {/* <div>Jumlah Donasi</div> */}
                    {/* <div style={{marginLeft:'200px'}}>Bukti Donasi</div> */}
                    <div className='d-flex flex-row' style={{marginTop:'10px',marginBottom:'15px', marginLeft:'auto', marginRight:'7px'}}>
                    {/* <Button variant="contained" color="primary" style={{width:'100px',height:'35px', textAlign:'center', marginLeft:'5px',marginBottom:'10px'}}>Confirm</Button> */}
                    <Button onClick={()=>onClickButtonDelete(val.id)} variant="contained" color="secondary" style={{width:'200px',height:'85px', textAlign:'center', marginRight:'10px',marginTop:'70px'}}>DELETE PROJECT</Button>
                    </div>
                </div>
              )
            }
            })
      }

    return(
        <div style={{width:'100%'}}>
          {
            proof?
            <div><Lightbox mainSrc={`${linkgambar}`} onCloseRequest={()=>setproof(false)}></Lightbox></div>
            :
            null
          }
           <div className='d-flex flex-row admin-dashboard'>
               <div className='box-admin' style={{width:'100%', backgroundColor:'#e8eaf6', color:'black'}}>

                   {/* start */}
                      {renderList()}   
                    {/* end */}
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




export default ListBayar