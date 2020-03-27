import React, {useEffect} from 'react';
import Jumbotron1 from '../pages/jumbotron1'
import Jumbotron2 from '../pages/jumbotron2'
import {useSelector, useDispatch} from 'react-redux'
import { changeHeaderAction, changeFooterAction} from '../redux/actions'
import { useState } from 'react';
import { Redirect } from 'react-router-dom';


function Homepage(){

    const dispatch = useDispatch()

    const [loading,setloading]=useState(true)
    const [roleredirect,setroleredirect]=useState(0)

    const {role} = useSelector(state=>state.auth)

    useEffect(()=>{
        dispatch(changeHeaderAction(0))
        dispatch(changeFooterAction(0))
        setroleredirect(role)
        setloading(false)
    },[])

    useEffect(()=>{
    setroleredirect(role)
    })

    if(loading){
        return (
            <div>
                Loading...
            </div>
        )
    }else if(roleredirect==='1'){
        return <Redirect to='/admin'/>
    }
        return (
            <div>
                <Jumbotron1/>
                <Jumbotron2/>
            </div>
    )
    
}


export default Homepage;
