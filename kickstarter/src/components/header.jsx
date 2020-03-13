import React, { useState, useEffect } from 'react';
import '../css/header.css';
import SearchIcon from '@material-ui/icons/Search';
import {Link} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import Headeradmin from './headeradmin'
import {Logoutaction} from './../redux/actions'

function Header (){
    const [loading,setloading] = useState(true)

    const {username,id,role} = useSelector(state=>state.auth)

    const dispatch = useDispatch()


    useEffect(()=>{
    },[])

    const Logoutuser=()=>{
        localStorage.removeItem('id')
        localStorage.removeItem('username')
        dispatch(Logoutaction)
    }
    
    // console.log(role,'role')

    if(role==='1'){
        return(
            <div>
                <Headeradmin/>
            </div>
        )
    }
    // console.log(role)
    return (
        <div className='main-header'>
            <div className='d-flex flex-row '>
                <div className='box-header d-flex flex-row' style={{width:'40%'}}>
                    <div className='m-2'>Explore</div>
                    <Link to={'/project'}>
                    <div className='m-2' style={{textDecoration:'none', color:'black'}}>Start  a Project</div>
                    </Link>

                </div>
                <div className='box-header' style={{width:'20%'}}>
                <Link to={'/'}>
                    {/* <img src="https://theme.zdassets.com/theme_assets/7902/7a63b03d352488898e3a870d14a103ddffe4b5fe.png" alt="" style={{width:'90%', height:'90%', padding:'20px'}} /> */}
                    <span className= 'tes-font' style={{fontWeight:'900', fontSize:'42px', color:'#01579b ', textDecoration:'none'}}>DANA•IN</span>
                </Link>
                </div>
                <div className='box-header d-flex flex-row justify-content-end' style={{width:'40%'}}>
                    <div className='mt-3 mx-2'>Search</div>
                    <div className='mt-3 mr-3'><SearchIcon/></div>
                    {
                        username===''?
                        <div className='d-flex flex-row'>
                        <Link to='/register'><div className='my-3 mx-4'><span style={{textDecoration:'none', color:'black'}}>Register</span></div></Link>
                        <Link to='/login'><div className='my-3 mx-4'><span style={{textDecoration:'none', color:'black'}}>Login</span></div></Link>
                        </div>
                        :
                        <div className='d-flex flex-row'>
                        <Link to='/'><div className='my-3 mx-4'><span style={{textDecoration:'none', color:'black'}}>Hello, {username}</span></div></Link>
                        <Link to='/myproject'><div className='my-3 mx-4'><span style={{textDecoration:'none', color:'black'}}>My Project</span></div></Link>
                        <Link to='/' onClick={Logoutuser}><div className='my-3 mx-4'><span style={{textDecoration:'none', color:'black'}}>Logout</span></div></Link>
                        </div>
                        // null
                    }
                </div>
            </div>
        </div>
    )
}


export default Header;