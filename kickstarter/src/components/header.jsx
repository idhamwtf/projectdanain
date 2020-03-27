import React, { useState, useEffect } from 'react';
import '../css/header.css';
import {Link} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Headeradmin from './headeradmin'
import {Logoutaction} from './../redux/actions'
import {DropdownToggle, DropdownMenu, DropdownItem, Dropdown } from "reactstrap";

function Header (){
    const dispatch = useDispatch()

    const {username,role,loginstatus} = useSelector(state=>state.auth)

    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleAccount = () => setDropdownOpen(prevState => !prevState);


    useEffect(()=>{

    },[])


    const Logoutuser=()=>{
        dispatch(Logoutaction())
        localStorage.removeItem('id')
        localStorage.removeItem('username')
    }

    if(role==='1'){
        return(
            <div>
                <Headeradmin/>
            </div>
        )
    }
    return (
        <div className='main-header'>
            <div className='d-flex flex-row '>
                <div className='box-header d-flex flex-row' style={{width:'40%'}}>
                    <Link to={'/explore'} style={{textDecoration:'none', color:'black'}}>
                        <div className='m-2'>Explore</div>
                    </Link>
                    <Link to={'/project'} style={{textDecoration:'none', color:'black'}}>
                        <div className='m-2' style={{textDecoration:'none', color:'black'}}>Start  a Project</div>
                    </Link>

                </div>
                <div className='box-header' style={{width:'20%'}}>
                <Link to={'/'} style={{textDecoration:'none'}}>
                    <span className= 'tes-font' style={{fontWeight:'900', fontSize:'42px', color:'#01579b ', textDecoration:'none'}}>DANA•IN</span>
                </Link>
                </div>
                <div className='box-header d-flex flex-row justify-content-end' style={{width:'40%'}}>
                        {loginstatus
                        ?
                        <div className='d-flex flex-row'>
                        <Dropdown style={{textDecoration:'none', marginTop:'9px'}} isOpen={dropdownOpen} toggle={toggleAccount}>
                            <DropdownToggle nav style={{color:'black'}}>
                            Hello, {username} <ArrowDropDownIcon style={{marginBottom:'8px'}} />
                            </DropdownToggle>
                            <DropdownMenu right>
                            <DropdownItem style={{ marginBottom: '10px' }}>
                            <Link to='/myproject' style={{textDecoration:'none', color:'black',fontSize:'18px'}}>My Project</Link>
                            </DropdownItem>
                            <DropdownItem>
                            <Link to='/myproject' style={{textDecoration:'none', color:'black',fontSize:'18px'}}>My Donate History</Link>   
                            </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        <Link to='/' style={{textDecoration:'none', color:'black'}} onClick={Logoutuser}><div className='my-3 mx-4'><span style={{textDecoration:'none', color:'black'}}>Logout</span></div></Link>
                        </div>
                        :
                        <div className='d-flex flex-row'>
                        <Link to='/register' style={{textDecoration:'none', color:'black'}}><div className='my-3 mx-4'><span style={{textDecoration:'none', color:'black'}}>Register</span></div></Link>
                        <Link to='/login' style={{textDecoration:'none', color:'black'}}><div className='my-3 mx-4'><span style={{textDecoration:'none', color:'black'}}>Login</span></div></Link>
                        </div>
                    }
                </div>
            </div>
            
        </div>
        
        )
    
    
}

export default Header;