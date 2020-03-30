import React from 'react';
import '../css/headercategory.css';
import {useSelector} from 'react-redux'
import { Link } from 'react-router-dom';


function Headercategory(){

    const { header } = useSelector(state=>state.HeaderFooter)
    const {role} = useSelector(state=>state.auth)

    if(header===1 || role==='1'){
        return null
    }else
    return(
        <div className='main-headercaterogy d-flex flex-row'>
            <Link to={'/category/Arts'}><div className='box-category mx-5 mt-3'>Arts </div></Link>
            <Link to={'/category/Games'}><div className='box-category mx-5 mt-3'>Games</div></Link>
            <Link to={'/category/Film'}><div className='box-category mx-5 mt-3'>Film</div></Link>
        </div>
    )
}

export default Headercategory;