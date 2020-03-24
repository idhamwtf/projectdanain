import React, {useEffect,useState} from 'react';
import Progressbar from '../../components/progressbar'
import {useSelector, useDispatch} from 'react-redux'
import {changeHeaderAction, dataProject} from './../../redux/actions'
// import Axios from 'axios';
import { APIURLimage,APIURL } from '../../helper/apiurl';
import './../../css/myproject.css'
import Button from '@material-ui/core/Button'
import Modal from './../../components/modal'
import { Link } from 'react-router-dom';
import NumberFormat from 'react-number-format'
import Axios from 'axios';


// style={{height:'60%', width:'75%', margin:'15px 10%'}} 
const MyProject =()=>{

    const auth = useSelector(state=>state.auth)

    const loading = useSelector(state=>state.Loading)
    const loadingdata = useSelector(state=>state.Loading)
    const [loadinglocal,setloadinglocal]=useState(true)
    
    const datadariredux = useSelector(state=>state.DataProjectReducers)
    const dispatch = useDispatch()
    const [data,setdata] = useState({})
    const [dataedit,setdataedit] = useState([])
    // const [loading,setloading] = useState(true)
    const [modal,setmodal]=useState(false)

    useEffect(()=>{
        var id = localStorage.getItem('id')
        dispatch(changeHeaderAction(1))
        // console.log('auth',auth)
        // console.log('id',id)
        // dispatch(changeFooterAction(1))
        // console.log('masuk')
        // window.location.reload()
            dispatch(dataProject(id))
        
        setloadinglocal(false)
        // Axios.get(`${APIURL}product/getprojectuser/${id}`)
        // .then((res)=>{
        //     // dispatch(dataProject(res.data))
        //     setdata(res.data)
        //     // console.log(res.data)
        // }).catch((err)=>{
        //     console.log(err)
        // })
    },[])

    // useEffect(()=>{
    //     setloadinglocal(false)
    // },[loadinglocal])


    const renderProjectUser=()=>{
        // console.log(data)
        // return data.map((val,index)=>{
        //     console.log(val.gambarproject, index)
        // })
        console.log(datadariredux,'datadariredux')
        return datadariredux.map((val,index)=>{
            // console.log(val.percentdonate)
            return(
             <div className='box-myproject d-flex flex-row' key={index}>
                 <Link to={`/projectdetail/${val.id}`} style={{textDecoration:'none', color:'black'}}>
                    <div style={{width:'45vh', marginTop:'46px', marginLeft:'50px' }}>
                        <img style={{width:'100%'}} src={APIURLimage+val.gambarproject} alt=""/>
                        <Progressbar defaultValue={0} value={val.percentdonate} height='15px' color='secondary' />
                    </div>
                 </Link>
                <div style={{marginTop:'23px', marginLeft:'10px'}}>
                    <Link  to={`/projectdetail/${val.id}`} style={{textDecoration:'none', color:'black'}}>
                    <div className='mt-3' style={{textAlign:'left', fontSize:'24px', fontWeight:'600'}}>{val.namaproject}</div>
                    </Link>
                    <div className='mt-3' style={{textAlign:'left', fontSize:'18px', fontWeight:'500'}}>{val.shortdescproject}</div>
                    <div className='mt-3' style={{textAlign:'left', fontSize:'15px', fontWeight:'500', color:'green'}}>Target IDR <NumberFormat value={val.targetuang} displayType={"text"} thousandSeparator={true} /></div>
                    <div className='mt-3' style={{textAlign:'left', fontSize:'15px', fontWeight:'500', color:'green'}}>Funded : {parseInt(val.percentdonate)} %</div>
                    <div className='mt-3' style={{textAlign:'left', fontSize:'13px', fontWeight:'500'}}>Category : {val.categoryproject}</div>
                    <div style={{justifyContent:'center', maxWidth:'600px'}}>    
                    <Button variant="contained" color="secondary" style={{marginTop:'11px'}} onClick={()=>toggleModal(index)}>Edit This Project</Button>
                    </div>
                </div>
            </div>
            )
        })
    }


    const toggleModal=(index)=>{
        setdataedit(datadariredux[index])
        setmodal(true)
    }
    console.log(auth.id,'auth')
    console.log(auth.loading,'auth',loading,'local',loadingdata,'dataloading')
    if(loading && auth.loading && loadingdata){
        // console.log(auth,'auth')
        return(
            <div>
                Loading ...
            </div>
        )
    }
    console.log(data) 
    // console.log(datadariredux, 'redux')
    return(
        <div>
            <center>
                <div className='titlebox-myproject'>
                    All of your project
                </div>
            </center>
            {renderProjectUser()}
            {/* <div className='box-myproject d-flex flex-row'>
                <div style={{width:'45vh', marginTop:'46px', marginLeft:'50px' }}>
                    <img style={{width:'100%'}} src={APIURLimage+data[0].gambarproject} alt=""/>
                    <Progressbar value='30' height='15px' color='secondary' />
                </div>
                <div style={{marginTop:'23px', marginLeft:'10px'}}>
                    <div className='mt-3' style={{textAlign:'left', fontSize:'24px', fontWeight:'600'}}>{data[0].namaproject}</div>
                    <div className='mt-3' style={{textAlign:'left', fontSize:'18px', fontWeight:'500'}}>{data[0].shortdescproject}</div>
                    <div className='mt-3' style={{textAlign:'left', fontSize:'15px', fontWeight:'500'}}>Target IDR {data[0].targetuang}</div>
                    <div className='mt-3' style={{textAlign:'left', fontSize:'13px', fontWeight:'500'}}>Category : {data[0].categoryproject}</div>
                    <Button variant="contained" color="secondary" style={{marginTop:'50px'}} onClick={()=>setmodal(true)}>Edit This Project</Button>
                </div>
            </div> */}
            {/* <div className='box-myproject d-flex flex-row'>
                <div style={{width:'45vh', marginTop:'46px', marginLeft:'50px'}}>
                    <img style={{width:'100%'}} src={APIURLimage+data[0].gambarproject} alt=""/>
                    <Progressbar value='30' height='15px' color='secondary' />
                </div>
                <div style={{marginTop:'23px', marginLeft:'10px'}} >
                    <div className='mt-3' style={{textAlign:'left', fontSize:'24px', fontWeight:'600'}}>{data[0].namaproject}</div>
                    <div className='mt-3' style={{textAlign:'left', fontSize:'18px', fontWeight:'500'}}>{data[0].shortdescproject}</div>
                    <div className='mt-3' style={{textAlign:'left', fontSize:'13px', fontWeight:'500', color:'#757575'}}>By {username}</div>
                </div>
            </div>
 */}

            <Modal title={`Edit Your ${dataedit.namaproject} Project`} modal={modal} toggle={()=>setmodal(!modal) }>
            </Modal>
        </div>
    )
}


export default MyProject;