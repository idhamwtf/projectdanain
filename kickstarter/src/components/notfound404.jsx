import React from 'react';
import './../css/notfound.css'
import { useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import {changeFooterAction, changeHeaderAction} from '../redux/actions'


const Notfound =()=>{
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(changeHeaderAction(1))
    },[])
    return(
    <div id="notfound">
    <div className="notfound">
        <div className="notfound-404">
            <h1>Oops!</h1>
            <h2>404 - The Page can't be found</h2>
        </div>
        <a href="/">Go TO Homepage</a>
    </div>
</div>
    )
}


export default Notfound