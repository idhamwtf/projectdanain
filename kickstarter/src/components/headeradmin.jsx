import React from 'react';
import '../css/headeradmin.css'
import {useDispatch} from 'react-redux'
import {Logoutaction} from './../redux/actions'
import {Link} from 'react-router-dom'



export default function Headeradmin(){
    const dispatch = useDispatch()

    const Logoutuser=()=>{
        localStorage.removeItem('id')
        localStorage.removeItem('username')
        dispatch(Logoutaction())
    }
    
    return (
        <div className='d-flex flex-row adminheader'>
            <div className='header-kiri-admin'>
                Admin page
            </div>
            <div className='d-flex flex-row' style={{marginLeft:'68%'}}>
                <div style={{}} className='header-kanan-admin'>
                    Back to home
                </div>
                {/* <div style={{}} className='header-kanan-admin'>
                    Logout
                </div> */}
                <Link to='/' style={{textDecoration:'none', color:'#01579b', marginTop:'8px'}} onClick={Logoutuser}><div className=' header-kanan-admin my-3 mx-4'><span>Logout</span></div></Link>
            </div>
        </div>
    )
}