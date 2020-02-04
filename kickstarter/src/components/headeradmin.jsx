import React from 'react';
import '../css/headeradmin.css'



export default function Headeradmin(){
    return (
        <div className='d-flex flex-row adminheader'>
            <div className='header-kiri-admin'>
                Admin page
            </div>
            <div className='d-flex flex-row' style={{marginLeft:'68%'}}>
                <div style={{}} className='header-kanan-admin'>
                    Back to home
                </div>
                <div style={{}} className='header-kanan-admin'>
                    Logout
                </div>
            </div>
        </div>
    )
}