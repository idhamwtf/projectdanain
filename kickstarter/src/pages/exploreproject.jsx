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
    const [datainput,setdatainput]=useState('')
    const [loading,setloading]=useState(true)

    useEffect(()=>{
        setloading(false)
    },[])


    const onChangeInput=(e)=>{
          setdatainput(e.target.value)
      }

      if(loading){
          return(
              <div>
                  Loading...
              </div>
          )
        }else{
            return(
            <div className='explore-box'>
                <div className='explore-search d-flex flex-row'>
                <TextField id="standard-basic" label="what are you looking for ?" style={{width:'100%'}} onChange={onChangeInput}/><SearchIcon style={{marginTop:'12px',fontSize:'36px'}}/>
                </div>
                <ExploreContent data={datainput}/>
            </div>
    )
}
}

export default Explore;