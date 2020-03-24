import React from 'react';
import '../../css/admin.css'
// import MaterialTable from 'material-table';
import { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {changeFooterAction, changeHeaderAction} from '../../redux/actions'
// import { Button, Link } from '@material-ui/core';
// import VisibilityIcon from '@material-ui/icons/Visibility';
import { useState } from 'react';
// import {dataProject, getbukti} from './redux/actions'
// import Axios from 'axios';
// import { APIURL, APIURLimage } from '../../helper/apiurl';
// import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import Listbayar from './listbayar'
import ListProject from './listproject'
import ListUsers from './listusers'
import Notfound from './../../components/notfound404'


export default function Admin(){

  const [list,setlist]=useState('')
  const dispatch = useDispatch()
  const {role} = useSelector(state=>state.auth)

  useEffect(()=>{
    dispatch(changeFooterAction(1))
    
  })



if(role==='1'){
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
}else{
  return (
    <Notfound></Notfound>
  )
}
}