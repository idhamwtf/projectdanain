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
    const {role} = useSelector(state=>state.auth)
    const [roleredirect,setroleredirect]=useState(0)

    useEffect(()=>{
        dispatch(changeHeaderAction(0))
        dispatch(changeFooterAction(0))
        setroleredirect(role)
        setloading(false)
    },[])

    useEffect(()=>{
    setroleredirect(role)
    })


    console.log(role)
    

    if(loading){
        return (
            <div>
                Loading...
            </div>
        )
    }else if(roleredirect==='1'){
        console.log('admin')
        return <Redirect to='/admin'/>
    }
    console.log('user')
    return (
        <div>
            <Jumbotron1/>
            <Jumbotron2/>
        </div>
    )
    
}


export default Homepage;
