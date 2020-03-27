import React, { useEffect,useState } from 'react';
import './../css/explore.css'
import './../css/searchbox.css'
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import {changeHeaderAction} from './../redux/actions'
import { useDispatch } from 'react-redux';
import { APIURL } from '../helper/apiurl';
import Axios from 'axios';
import {Link} from 'react-router-dom'
import ExploreContent from './explorecontent'



const Explore=()=>{
    const dispatch = useDispatch()
    const [page,setPage]=useState(1)
    const [pager,setpager]=useState({})
    const [datasearch,setdatasearch]=useState([])
    const [datainput,setdatainput]=useState('')
    const [loading,setloading]=useState(true)

    useEffect(()=>{
        setloading(false)
    },[])


    const onChangeInput=(e)=>{
          setdatainput(e.target.value)
          console.log(datainput)
      }

      if(loading){
          return(
              <div>
                  Loading...
              </div>
          )
        }else{
            // console.log(pager)
            return(
            <div className='explore-box'>
                <div className='explore-search d-flex flex-row'>
                <TextField id="standard-basic" label="what are you looking for ?" style={{width:'98%'}} onChange={onChangeInput}/><SearchIcon style={{marginTop:'12px', borderBottom:'1px #c6c6c6 solid',fontSize:'36px'}}/>
                </div>
                <ExploreContent data={datainput}/>
            </div>
    )
}
}

export default Explore;