import React from 'react';
import '../../css/admin.css'
import MaterialTable from 'material-table';
import { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux'
import { changeHeaderAction, changeFooterAction, loginAction} from '../../redux/actions'
import { Button, Link } from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { useState } from 'react';
// import {dataProject, getbukti} from './redux/actions'
import Axios from 'axios';
import { APIURL, APIURLimage } from '../../helper/apiurl';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import Listbayar from './listbayar'
import ListProject from './listproject'
import ListUsers from './listusers'


export default function Admin(){

  const [list,setlist]=useState('')
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(changeFooterAction(1))
  })




return (
  <div className='admin'>
             <div className='d-flex flex-row admin-dashboard'>
                <div className='box-admin' style={{width:'15%'}}>
                  <div className='isi-dashboard'  onClick={()=>setlist('user')}>LIST USER</div>
                  <div className='isi-dashboard' onClick={()=>setlist('project')}>LIST PROJECT</div>
                  <div className='isi-dashboard' onClick={()=>setlist('payment')}>LIST PEMBAYARAN</div>
                </div>
              {
                list==='user'?
                <ListUsers/>:
                list==='project'?
                <ListProject/>:
                list==='payment'?
                <Listbayar/>:
                <div className='box-admin' style={{width:'100%', backgroundColor:'#e8eaf6', color:'black'}}> Welcome to admin dashboard</div>
              }
              </div>
  </div>
)

  
}



// const dispatch = useDispatch()

//   const [page,setPage]=useState(1)
//   const [pager,setpager]=useState({})
//   const [databukti,setdatabukti]=useState([])
//   const [list,setlist]=useState('')
//   const [proof,setproof]=useState(false)
//   const [linkgambar,setlinkgambar]=useState('')
  

//   // const databukti = useSelector(state=>state.admin)

//     useEffect(()=>{
//       dispatch(changeFooterAction(1))
//       // dispatch(getbukti(page))
//       Axios.get(`${APIURL}admin/getbukti/${page}`)
//       .then((res)=>{
//           setdatabukti(res.data.pageOfdata)
//           setpager(res.data.pager)
//       }).catch((err)=>{
//           console.log(err)
//       })
//     },[])

//     useEffect(()=>{
//       Axios.get(`${APIURL}admin/getbukti/${page}`)
//       .then((res)=>{
//           setdatabukti(res.data.pageOfdata)
//           setpager(res.data.pager)
//       }).catch((err)=>{
//           console.log(err)
//       })
//     },[page])

//     console.log(databukti)
    

//     const renderListbukti=()=>{
//       const tes =(image)=>{
//         setproof(true)
//         setlinkgambar(image)
//       }
//       return databukti.map((val,index)=>{
//         console.log(databukti)
//         if(page===1){
//           return (
//         <div className='box-list d-flex flex-row' style={{backgroundColor:'white', margin:'25px', height:'70px'}} key={index}>
//           <div>{index+1}. </div>
//           <div className='list-box-content'>{val.namaproject} </div>
//           <div className='list-box-content'>Donated by : {val.username} </div>
//           <div className='list-box-content'>Amount :Rp. {val.jumlahdonasi} </div>
//           {/* <div>Jumlah Donasi</div> */}
//           {/* <div style={{marginLeft:'200px'}}>Bukti Donasi</div> */}
//           <div className='d-flex flex-row' style={{marginTop:'10px',marginBottom:'15px', marginLeft:'auto', marginRight:'7px'}}>
//           <div style={{marginRight:'20px', marginTop:'3px'}} onClick={()=>tes(APIURLimage+val.buktidonasi)}>Donation Proof here <br></br> <VisibilityIcon/></div>
//           <Button variant="contained" color="primary" style={{width:'100px',height:'35px', textAlign:'center', marginLeft:'5px',marginBottom:'10px'}}>Confirm</Button>
//           <Button variant="contained" color="secondary" style={{width:'100px',height:'35px', textAlign:'center', marginLeft:'5px',marginBottom:'10px'}}>Decline</Button>
//           </div>
//        </div>
//         )
//       }else{
//         return(
//           <div className='box-list d-flex flex-row' style={{backgroundColor:'white', margin:'25px', height:'70px'}} key={index}>
//             <div>{(index+1*(page+10))-1}. </div>
//             <div className='list-box-content'>{val.namaproject} </div>
//             <div className='list-box-content'>Donated by : {val.username} </div>
//             <div className='list-box-content'>Amount :Rp. {val.jumlahdonasi} </div>
//             {/* <div>Jumlah Donasi</div> */}
//             {/* <div style={{marginLeft:'200px'}}>Bukti Donasi</div> */}
//             <div className='d-flex flex-row' style={{marginTop:'10px',marginBottom:'15px', marginLeft:'auto', marginRight:'7px'}}>
//             <div style={{marginRight:'20px', marginTop:'3px'}}>Donation Proof here <br></br> <VisibilityIcon/></div>
//             <Button variant="contained" color="primary" style={{width:'100px',height:'35px', textAlign:'center', marginLeft:'5px',marginBottom:'10px'}}>Confirm</Button>
//             <Button variant="contained" color="secondary" style={{width:'100px',height:'35px', textAlign:'center', marginLeft:'5px',marginBottom:'10px'}}>Decline</Button>
//             </div>
//           </div>
//           )
//       }
//       })
    
//     }
//     console.log(pager,'pager')

//     return(
//         <div className='admin'>
//           {
//             proof?
//             <div><Lightbox mainSrc={`${linkgambar}`} onCloseRequest={()=>setproof(false)}></Lightbox></div>
//             :
//             null
//           }
//            <div className='d-flex flex-row admin-dashboard'>
//                <div className='box-admin' style={{width:'15%'}}>
//                    <div className='isi-dashboard'  onClick={()=>setlist('user')}>LIST USER</div>
//                    <div className='isi-dashboard' onClick={()=>setlist('project')}>LIST PROJECT</div>
//                    <div className='isi-dashboard' onClick={()=>setlist('payment')}>LIST PEMBAYARAN</div>
//                </div>
//                <div className='box-admin' style={{width:'85%', backgroundColor:'#e8eaf6', color:'black'}}>
//                   {list==='user'?
//                   <div>
//                     user
//                   </div>:
//                   list==='project'?
//                   <div>
//                     project
//                   </div>:
//                   list==='payment'?
//                   <div>                 
//                       {renderListbukti()}   
//                     <div style={{ marginLeft: '25%', width: '350px' }}>
//                     {pager.pages && pager.pages.length &&
//                     <ul className="pagination">
//                         <li className={`page-item first-item ${pager.currentPage === 1 ? 'disabled' : ''}`}>
//                             <Link to={{ search: `?page=1` }} className="page-link" onClick={() => setPage(pager.startPage)}>First</Link>
//                         </li>
//                         <li className={`page-item previous-item ${pager.currentPage === 1 ? 'disabled' : ''}`}>
//                             <Link to={{ search: `?page=${pager.currentPage - 1}` }} className="page-link" onClick={() => setPage(pager.currentPage - 1)}>Previous</Link>
//                         </li>
//                         {pager.pages.map(page =>
//                             <li key={page} className={`page-item number-item ${pager.currentPage === page ? 'active' : ''}`}>
//                                 <Link to={{ search: `?page=${page}` }} className="page-link" onClick={() => setPage(page)}>{page}</Link>
//                             </li>
//                         )}
//                         <li className={`page-item next-item ${pager.currentPage === pager.totalPages ? 'disabled' : ''}`}>
//                             <Link to={{ search: `?page=${pager.currentPage + 1}` }} className="page-link" onClick={() => setPage(pager.currentPage + 1)}>Next</Link>
//                         </li>
//                         <li className={`page-item last-item ${pager.currentPage === pager.totalPages ? 'disabled' : ''}`}>
//                             <Link to={{ search: `?page=${pager.totalPages}` }} className="page-link" onClick={() => setPage(pager.totalPages)}>Last</Link>
//                         </li>
//                     </ul>
//                     }
//                   </div>
//                 </div>
//                   :
//                   <div>
//                     welcome to admin dashboard please choose the menu on the left bar
//                   </div>
//                 }
//               </div>
//            </div>
//         </div>
//     )