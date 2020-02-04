import React from 'react';
import '../css/jumbotron1.css'
import Progressbar from '../components/progressbar'
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';



function Jumbotron1(){
    return (
        <div className='jumbotron-1 d-flex flex-row'>
            <div className='box-jumbotron1 my-5' style={{borderRight:'1px silver solid'}} >
                <div style={{textAlign:'left', margin:'15px 10%', color:'#757575', fontWeight:'bold'}}>Featured Project</div>
                <div style={{height:'60%', width:'75%', margin:'15px 10%'}} >
                    <img style={{height:'100%',width:'100%'}} src="https://ksr-static.imgix.net/8v9uwida-valor_anthology.png?ixlib=rb-2.1.0&auto=compress%2Cformat&w=1000&fit=min&s=4bcc268b184adad6cba9bb23fc75c1e7" alt=""/>
                    <Progressbar value='30' height='15px' color='secondary' />
                    <div className='mt-3' style={{textAlign:'left', fontSize:'24px', fontWeight:'600'}}>Valor Anthology : Volume 3</div>
                    <div className='mt-3' style={{textAlign:'left', fontSize:'18px', fontWeight:'500'}}>Fairy-tale comics starring courageous heroines</div>
                    <div className='mt-3' style={{textAlign:'left', fontSize:'13px', fontWeight:'500', color:'#757575'}}>By Megan Lavey-Heaton</div>
                </div>
            </div>
            <div className='box-jumbotron1 my-5'>
            <div style={{textAlign:'left', margin:'15px 10%', color:'#757575', fontWeight:'bold'}}>Recommend for you</div>
                <div style={{height:'82%', width:'90%', margin:'15px 10%'}} >
                    <div className='minibox-jumobtron1 d-flex flex-row'>
                        <div className='mr-3' style={{width:'43%'}}>
                            <img  style={{width:'100%', height:'100%'}} src="https://ksr-ugc.imgix.net/assets/027/711/826/d3e9cb0a51a2c7b2a0f0177b37afda70_original.jpg?ixlib=rb-2.1.0&crop=faces&w=352&h=198&fit=crop&v=1578680880&auto=format&frame=1&q=92&s=a9f683ba0dcba5c5d605c820e2ade695" alt=""/>
                        </div>
                        <div className='mr-3' style={{width:'57%'}}>
                            <div className='minibox-title' style={{ overflow:'hidden' , fontWeight:'bold'}}>
                                MINA : The Creative Handcrafted Desk Organizer
                            </div>                        
                            <div className='minibox-funded' style={{color:'green', fontWeight:'600'}} >
                                1230123% Funded 
                            </div>
                            <div style={{color:'#757575', fontWeight:'500'}}>
                                By arcHITects
                            </div>
                            <div className='d-flex flex-row'>
                                <div className='mx-3'>Icon</div>
                                <div className='mx-3'>Icon</div>
                                <div className='mx-3'><ThumbUpAltOutlinedIcon/></div>
                            </div>
                        </div>
                        
                    </div>
                    <div className='minibox-jumobtron1 d-flex flex-row'>
                    <div className='mr-3' style={{width:'43%'}}>
                            <img  style={{width:'100%', height:'100%'}} src="https://ksr-ugc.imgix.net/assets/027/711/826/d3e9cb0a51a2c7b2a0f0177b37afda70_original.jpg?ixlib=rb-2.1.0&crop=faces&w=352&h=198&fit=crop&v=1578680880&auto=format&frame=1&q=92&s=a9f683ba0dcba5c5d605c820e2ade695" alt=""/>
                        </div>
                        <div className='mr-3' style={{width:'57%'}}>
                            <div className='minibox-title' style={{overflow:'hidden', fontWeight:'bold'}}>
                                MINA : The Creative Handcrafted Desk Organizer
                            </div>                        
                            <div className='minibox-funded' style={{color:'green', fontWeight:'600'}} >
                                1230123% Funded 
                            </div>
                            <div style={{color:'#757575', fontWeight:'500'}}>
                                By arcHITects
                            </div>
                            <div className='d-flex flex-row'>
                                <div className='mx-3'>Icon</div>
                                <div className='mx-3'>Icon</div>
                                <div className='mx-3'><ThumbUpAltOutlinedIcon/></div>
                            </div>
                        </div>
                    </div>
                    <div className='minibox-jumobtron1 d-flex flex-row'>
                        <div className='mr-3' style={{width:'43%'}}>
                            <img  style={{width:'100%', height:'100%'}} src="https://ksr-ugc.imgix.net/assets/027/711/826/d3e9cb0a51a2c7b2a0f0177b37afda70_original.jpg?ixlib=rb-2.1.0&crop=faces&w=352&h=198&fit=crop&v=1578680880&auto=format&frame=1&q=92&s=a9f683ba0dcba5c5d605c820e2ade695" alt=""/>
                        </div>
                        <div className='mr-3' style={{width:'57%'}}>
                            <div className='minibox-title' style={{overflow:'hidden', fontWeight:'bold'}}>
                                MINA : The Creative Handcrafted Desk Organizer
                            </div>                        
                            <div className='minibox-funded' style={{color:'green', fontWeight:'600'}}>
                                1230123% Funded 
                            </div>
                            <div style={{color:'#757575', fontWeight:'500'}}>
                                By arcHITects
                            </div>
                            <div className='d-flex flex-row'>
                                <div className='mx-3'>Icon</div>
                                <div className='mx-3'>Icon</div>
                                <div className='mx-3'><ThumbUpAltOutlinedIcon/></div>
                            </div>
                        </div>
                    </div>
                    <div className='mt-4'>Paging</div>
                </div>
            </div>
        </div>
    )
}





export default Jumbotron1;