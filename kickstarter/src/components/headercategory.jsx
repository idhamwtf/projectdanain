import React from 'react';
import '../css/headercategory.css';
import {useSelector} from 'react-redux'


function Headercategory(){

    const { header } = useSelector(state=>state.HeaderFooter)
    const {role} = useSelector(state=>state.auth)

    if(header===1 || role==='1'){
        return null
    }else
    return(
        <div className='main-headercaterogy d-flex flex-row'>
            <div className='box-category mx-5 mt-3'>Arts </div>
            <div className='box-category mx-5 mt-3'>Games</div>
            <div className='box-category mx-5 mt-3'>Film</div>
        </div>
    )
}

export default Headercategory;