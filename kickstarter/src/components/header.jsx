import React, { useState, useEffect } from 'react';
import '../css/header.css';
import SearchIcon from '@material-ui/icons/Search';
import {Link, Redirect} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Headeradmin from './headeradmin'
import {Logoutaction} from './../redux/actions'
import { Collapse, Navbar, NavbarToggler, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Dropdown } from "reactstrap";

function Header (){
    const [loading,setloading] = useState(true)

    const {username,id,role,loginstatus} = useSelector(state=>state.auth)

    const dispatch = useDispatch()

    const [isOpen, setIsOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggleAccount = () => setDropdownOpen(prevState => !prevState);


   


    const Logoutuser=()=>{
        localStorage.removeItem('id')
        localStorage.removeItem('username')
        dispatch(Logoutaction)
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
                    <div className='m-2'>Explore</div>
                    <Link to={'/project'} style={{textDecoration:'none', color:'black'}}>
                    <div className='m-2' style={{textDecoration:'none', color:'black'}}>Start  a Project</div>
                    </Link>

                </div>
                <div className='box-header' style={{width:'20%'}}>
                <Link to={'/'} style={{textDecoration:'none'}}>
                    {/* <img src="https://theme.zdassets.com/theme_assets/7902/7a63b03d352488898e3a870d14a103ddffe4b5fe.png" alt="" style={{width:'90%', height:'90%', padding:'20px'}} /> */}
                    <span className= 'tes-font' style={{fontWeight:'900', fontSize:'42px', color:'#01579b ', textDecoration:'none'}}>DANA•IN</span>
                </Link>
                </div>
                <div className='box-header d-flex flex-row justify-content-end' style={{width:'40%'}}>
                    <div className='mt-3 mx-2'>Search</div>
                    <div className='mt-3 mr-3'><SearchIcon/></div>
                    {
                        loginstatus===false?
                        <div className='d-flex flex-row'>
                        <Link to='/register' style={{textDecoration:'none', color:'black'}}><div className='my-3 mx-4'><span style={{textDecoration:'none', color:'black'}}>Register</span></div></Link>
                        <Link to='/login' style={{textDecoration:'none', color:'black'}}><div className='my-3 mx-4'><span style={{textDecoration:'none', color:'black'}}>Login</span></div></Link>
                        </div>
                        :
                        null
                    }
                    {
                        loginstatus===true?
                        <div className='d-flex flex-row'>
                        {/* <Link to='/' style={{textDecoration:'none', color:'black'}}><div className='my-3 mx-4'><span style={{textDecoration:'none', color:'black'}}>Hello, {username}</span></div></Link>
                        <Link to='/myproject' style={{textDecoration:'none', color:'black'}}><div className='my-3 mx-4'><span style={{textDecoration:'none', color:'black'}}>My Project</span></div></Link>
                        <Link to='/' style={{textDecoration:'none', color:'black'}} onClick={Logoutuser}><div className='my-3 mx-4'><span style={{textDecoration:'none', color:'black'}}>Logout</span></div></Link> */}
                        <Dropdown style={{textDecoration:'none', marginTop:'7px'}} isOpen={dropdownOpen} toggle={toggleAccount}>
                            <DropdownToggle nav style={{color:'black'}}>
                            Hello, {username} <ArrowDropDownIcon style={{marginBottom:'2px'}} />
                            </DropdownToggle>
                            <DropdownMenu right>
                            <DropdownItem style={{ marginBottom: '10px' }}>
                            <Link to='/myproject' style={{textDecoration:'none', color:'black'}}>My Project</Link>
                            </DropdownItem>
                            {/* <DropdownItem>
                                <Link to="/cart">Cart</Link>
                            </DropdownItem>
                            <DropdownItem>
                                <NavLink href="/payment">Payment</NavLink>
                            </DropdownItem> */}
                            <DropdownItem divider />
                            <DropdownItem>
                                <Link to='/' style={{textDecoration:'none', color:'black'}} onClick={Logoutuser}>Logout</Link >
                            </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        </div>
                        :
                        null
                    }
                </div>
            </div>
            
        </div>
        
    )
    
}


export default Header;