import React from 'react';
import '../../css/admin.css'
// import MaterialTable from 'material-table';
import { useEffect } from 'react';
import {useDispatch} from 'react-redux'
import {changeFooterAction} from '../../redux/actions'
import { Button, Link } from '@material-ui/core';
// import VisibilityIcon from '@material-ui/icons/Visibility';
import { useState } from 'react';
// import {dataProject, getbukti} from './redux/actions'
import Axios from 'axios';
import { APIURL} from '../../helper/apiurl';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { Table } from 'reactstrap';

const Listusers=()=>{
    const dispatch = useDispatch()

    const [page,setPage]=useState(1)
    const [pager,setpager]=useState({})
    const [datausers,setdatausers]=useState([])
    // const [list,setlist]=useState('')
    const [proof,setproof]=useState(false)
    const [linkgambar,setlinkgambar]=useState('')
    const [update,setupdate]=useState(true)

    useEffect(()=>{
        dispatch(changeFooterAction(1))
        // dispatch(getbukti(page))
        Axios.get(`${APIURL}admin/getlistusers/${page}`)
        .then((res)=>{
            setdatausers(res.data.pageOfdata)
            setpager(res.data.pager)
        }).catch((err)=>{
            console.log(err)
        })
      },[])
  
      useEffect(()=>{
        Axios.get(`${APIURL}admin/getlistusers/${page}`)
        .then((res)=>{
            setdatausers(res.data.pageOfdata)
            setpager(res.data.pager)
        }).catch((err)=>{
            console.log(err)
        })
      },[page])
  
      useEffect(()=>{
          Axios.get(`${APIURL}admin/getlistusers/${page}`)
          .then((res)=>{
              setdatausers(res.data.pageOfdata)
              setpager(res.data.pager)
              setupdate(false)
          }).catch((err)=>{
              console.log(err)
          })
        },[update])

        const onClickButtonDelete=(id)=>{
            Axios.put(`${APIURL}admin/deleteusers/${id}`)
            .then((res)=>{
                // console.log(res)
                setupdate(true)
            }).catch((err)=>{
                console.log(err)
            })
        }


        // console.log(datausers)
        const renderListUsersTable=()=>{
            return datausers.map((val,index)=>{
                if(page===1){
                    return(
                        <tr key={index}>
                        <td>{index+1}</td>
                        <td>{val.username}</td>
                        <td>{val.email}</td>
                        <td>{val.role==='1'?'admin':'user'}</td>
                        <td>{val.created}</td>
                        <td><Button onClick={()=>onClickButtonDelete(val.id)}variant="contained" color="secondary" style={{width:'100px',height:'35px', textAlign:'center', marginLeft:'5px',marginBottom:'10px'}}>DELETE</Button></td>
                    </tr>
                    )
                }else{
                    return(
                    <tr key={index}>
                        <td>{(index+1*(page+10))-1}</td>
                        <td>{val.username}</td>
                        <td>{val.email}</td>
                        <td>{val.role==='1'?'admin':'user'}</td>
                        <td>{val.created}</td>
                        <td><Button onClick={()=>onClickButtonDelete(val.id)}variant="contained" color="secondary" style={{width:'100px',height:'35px', textAlign:'center', marginLeft:'5px',marginBottom:'10px'}}>DELETE</Button></td>
                    </tr>
                )
                }
            })
        }

        const renderListUsers=()=>{
            console.log(datausers)
            return datausers.map((val,index)=>{
                return (
                    // <div className='box-admin' style={{width:'100%', backgroundColor:'#e8eaf6', color:'black'}} key={index}>
                        <div className='box-list d-flex flex-row' style={{backgroundColor:'white', margin:'25px', height:'70px'}} key={index}>
                            <div>{index+1}. </div>
                            <div className='list-box-content'>Username : {val.username}</div>
                            <div className='list-box-content'>Email : {val.email}</div>
                            <div className='list-box-content'>Role : {val.role==='1'?'admin':'user'}</div>
                            <div className='list-box-content'>Created : {val.created}</div>
                            <div className='d-flex flex-row' style={{marginTop:'10px',marginBottom:'15px', marginLeft:'auto', marginRight:'7px'}}>
                            <Button onClick={()=>onClickButtonDelete(val.id)}variant="contained" color="secondary" style={{width:'100px',height:'35px', textAlign:'center', marginLeft:'5px',marginBottom:'10px'}}>DELETE</Button>
                            </div>
                        </div>
                    // </div>
                )
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
                      {/* {renderListUsers()} */}
                      <Table striped>
                        <thead>
                          <tr>
                            <th>No</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Created</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {renderListUsersTable()}
                        </tbody>
                      </Table>
                    {/* ends    */}
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


export default Listusers;