import React, {useEffect} from 'react';
import Jumbotron1 from '../pages/jumbotron1'
import Jumbotron2 from '../pages/jumbotron2'
import {useSelector, useDispatch} from 'react-redux'
import { changeHeaderAction, changeFooterAction} from '../redux/actions'


function Homepage(){

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(changeHeaderAction(0))
        dispatch(changeFooterAction(0))
    },[])

    return (
        <div>
            <Jumbotron1/>
            <Jumbotron2/>
        </div>
    )
}


export default Homepage;
