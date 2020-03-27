import React from 'react';
import '../../css/admin.css'
// import MaterialTable from 'material-table';
import { useEffect } from 'react';
import {useDispatch} from 'react-redux'
import {changeFooterAction} from '../../redux/actions'
import { Button, Link } from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { useState } from 'react';
// import {dataProject, getbukti} from './redux/actions'
import Axios from 'axios';
import { APIURL, APIURLimage } from '../../helper/apiurl';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { Table } from 'reactstrap';
import NumberFormat from 'react-number-format'

const ListBayar=()=>{


  const dispatch = useDispatch()

  const [page,setPage]=useState(1)
  const [pager,setpager]=useState({})
  const [databukti,setdatabukti]=useState([])
//   const [list,setlist]=useState('')
  const [proof,setproof]=useState(false)
  const [linkgambar,setlinkgambar]=useState('')
  const [update,setupdate]=useState(true)
  

  // const databukti = useSelector(state=>state.admin)

    useEffect(()=>{
      dispatch(changeFooterAction(1))
      // dispatch(getbukti(page))
      Axios.get(`${APIURL}admin/getbukti/${page}`)
      .then((res)=>{
          setdatabukti(res.data.pageOfdata)
          setpager(res.data.pager)
      }).catch((err)=>{
          console.log(err)
      })
    },[])

    useEffect(()=>{
      Axios.get(`${APIURL}admin/getbukti/${page}`)
      .then((res)=>{
          setdatabukti(res.data.pageOfdata)
          setpager(res.data.pager)
      }).catch((err)=>{
          console.log(err)
      })
    },[page])

    useEffect(()=>{
        Axios.get(`${APIURL}admin/getbukti/${page}`)
        .then((res)=>{
            setdatabukti(res.data.pageOfdata)
            setpager(res.data.pager)
            setupdate(false)
        }).catch((err)=>{
            console.log(err)
        })
      },[update])

    console.log(databukti)


    const onClickButtonConfirm=(id)=>{
        Axios.put(`${APIURL}admin/confirmdonate/${id}`)
        .then((res)=>{
            // console.log(res)
            setupdate(true)
        }).catch((err)=>{
            console.log(err)
        })
    }
    
    const onClickButtonDecline=(id)=>{
        Axios.put(`${APIURL}admin/declinedonate/${id}`)
        .then((res)=>{
            // console.log(res)
            setupdate(true)
        }).catch((err)=>{
            console.log(err)
        })
    }

    const renderListBayarTable=()=>{
      const tes =(image)=>{
        setproof(true)
        setlinkgambar(image)
      }

      return databukti.map((val,index)=>{
        if(page===1){

          return(
            <tr key={index}>
            <td>{index+1}</td>
            <td>{val.namaproject}</td>
            <td>           
            {val.username===null?
           'Anonymous':
           val.username} 
           </td>
            <td>Rp. <NumberFormat value={val.jumlahdonasi} displayType={"text"} thousandSeparator={true} /></td>
            <td><div onClick={()=>tes(APIURLimage+val.buktidonasi)}>Donation Proof here <br></br> <VisibilityIcon/></div></td>
            <td>  
            <Button onClick={()=>onClickButtonConfirm(val.id)} variant="contained" color="primary" style={{width:'100px',height:'35px', textAlign:'center', marginLeft:'5px',marginBottom:'10px'}}>Confirm</Button>
            <Button onClick={()=>{onClickButtonDecline(val.id)}} variant="contained" color="secondary" style={{width:'100px',height:'35px', textAlign:'center', marginLeft:'5px',marginBottom:'10px'}}>Decline</Button>
            </td>
          </tr>
        )
      }else{
        return(
        <tr key={index}>
          <td>{(index+1*(page+10))-1}</td>
          <td>{val.namaproject}</td>
          <td>           
          {val.username===null?
         'Anonymous':
         val.username} 
         </td>
          <td>Rp. <NumberFormat value={val.jumlahdonasi} displayType={"text"} thousandSeparator={true} /></td>
          <td><div onClick={()=>tes(APIURLimage+val.buktidonasi)}>Donation Proof here <br></br> <VisibilityIcon/></div></td>
          <td>
          <Button onClick={()=>onClickButtonConfirm(val.id)} variant="contained" color="primary" style={{width:'100px',height:'35px', textAlign:'center', marginLeft:'5px',marginBottom:'10px'}}>Confirm</Button>
          <Button onClick={()=>{onClickButtonDecline(val.id)}} variant="contained" color="secondary" style={{width:'100px',height:'35px', textAlign:'center', marginLeft:'5px',marginBottom:'10px'}}>Decline</Button>
          </td>
        </tr>
        )
      }
      })
    }

    // const renderListbukti=()=>{
    //   const tes =(image)=>{
    //     setproof(true)
    //     setlinkgambar(image)
    //   }
    //   return databukti.map((val,index)=>{
    //     console.log(databukti)
    //     if(page===1){
    //       return (
    //     <div className='box-list d-flex flex-row' style={{backgroundColor:'white', margin:'25px', height:'70px'}} key={index}>
    //       <div>{index+1}. </div>
    //       <div className='list-box-content'>{val.namaproject} </div>
    //       <div className='list-box-content'>Donated by :
    //        {val.username===null?
    //        'Anonymous':
    //        val.username} 
    //        </div>
    //       <div className='list-box-content'>Amount :Rp. {val.jumlahdonasi} </div>
    //       {/* <div>Jumlah Donasi</div> */}
    //       {/* <div style={{marginLeft:'200px'}}>Bukti Donasi</div> */}
    //       <div className='d-flex flex-row' style={{marginTop:'10px',marginBottom:'15px', marginLeft:'auto', marginRight:'7px'}}>
    //       <div style={{marginRight:'20px', marginTop:'3px'}} onClick={()=>tes(APIURLimage+val.buktidonasi)}>Donation Proof here <br></br> <VisibilityIcon/></div>
    //       <Button onClick={()=>onClickButtonConfirm(val.id)} variant="contained" color="primary" style={{width:'100px',height:'35px', textAlign:'center', marginLeft:'5px',marginBottom:'10px'}}>Confirm</Button>
    //       <Button onClick={()=>{onClickButtonDecline(val.id)}} variant="contained" color="secondary" style={{width:'100px',height:'35px', textAlign:'center', marginLeft:'5px',marginBottom:'10px'}}>Decline</Button>
    //       </div>
    //    </div>
    //     )
    //   }else{
    //     return(
    //       <div className='box-list d-flex flex-row' style={{backgroundColor:'white', margin:'25px', height:'70px'}} key={index}>
    //         <div>{(index+1*(page+10))-1}. </div>
    //         <div className='list-box-content'>{val.namaproject} </div>
    //         <div className='list-box-content'>Donated by : {val.username} </div>
    //         <div className='list-box-content'>Amount :Rp. {val.jumlahdonasi} </div>
    //         {/* <div>Jumlah Donasi</div> */}
    //         {/* <div style={{marginLeft:'200px'}}>Bukti Donasi</div> */}
    //         <div className='d-flex flex-row' style={{marginTop:'10px',marginBottom:'15px', marginLeft:'auto', marginRight:'7px'}}>
    //         <div style={{marginRight:'20px', marginTop:'3px'}}>Donation Proof here <br></br> <VisibilityIcon/></div>
    //         <Button onClick={()=>onClickButtonConfirm(val.id)} variant="contained" color="primary" style={{width:'100px',height:'35px', textAlign:'center', marginLeft:'5px',marginBottom:'10px'}}>Confirm</Button>
    //         <Button onClick={()=>{onClickButtonDecline(val.id)}} variant="contained" color="secondary" style={{width:'100px',height:'35px', textAlign:'center', marginLeft:'5px',marginBottom:'10px'}}>Decline</Button>
    //         </div>
    //       </div>
    //       )
    //   }
    //   })
    // }
    // console.log(pager,'pager')
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
                      {/* {renderListbukti()}    */}
                      <Table striped>
                        <thead>
                          <tr>
                            <th>NO</th>
                            <th>Title</th>
                            <th>Donated by</th>
                            <th>Amount</th>
                            <th>Proof</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {renderListBayarTable()}
                        </tbody>
                      </Table>
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