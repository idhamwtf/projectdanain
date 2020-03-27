import React from 'react';
import '../../css/admin.css'
import { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {changeFooterAction} from '../../redux/actions'
import { useState } from 'react';
import 'react-image-lightbox/style.css';
import Listbayar from './listbayar'
import ListProject from './listproject'
import ListUsers from './listusers'
import Notfound from './../../components/notfound404'
import HistoryDonate from './historydonasi'
import StatisticWeb from './statistic'


export default function Admin(){

  const dispatch = useDispatch()

  const [list,setlist]=useState('')

  const {role} = useSelector(state=>state.auth)

  useEffect(()=>{
    dispatch(changeFooterAction(1))
  },[])

if(role==='1'){
  return (
    <div className='admin'>
             <div className='d-flex flex-row admin-dashboard'>
                <div className='box-admin' style={{width:'15%'}}>
                  <div className='isi-dashboard'  onClick={()=>setlist('user')}>LIST USER</div>
                  <div className='isi-dashboard' onClick={()=>setlist('project')}>LIST PROJECT</div>
                  <div className='isi-dashboard' onClick={()=>setlist('payment')}>LIST PEMBAYARAN</div>
                  <div className='isi-dashboard' onClick={()=>setlist('historydonate')}>HISTORY DONATE</div>
                  <div className='isi-dashboard' onClick={()=>setlist('statistic')}>STATISTIC</div>
                </div>
              {
                list==='user'?
                <ListUsers/>:
                list==='project'?
                <ListProject/>:
                list==='payment'?
                <Listbayar/>:
                list==='historydonate'?
                <HistoryDonate/>:
                list==='statistic'?
                <StatisticWeb/>:
                <div className='box-admin' style={{width:'100%', backgroundColor:'#e8eaf6', color:'black', paddingTop:'20px',fontSize:'50px'}}> Welcome to admin dashboard</div>
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