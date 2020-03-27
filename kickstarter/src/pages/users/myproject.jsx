import React, {useEffect,useState} from 'react';
import Progressbar from '../../components/progressbar'
import {useSelector, useDispatch} from 'react-redux'
import {changeHeaderAction, dataProject} from './../../redux/actions'
import { APIURLimage,APIURL } from '../../helper/apiurl';
import './../../css/myproject.css'
import Button from '@material-ui/core/Button'
import Modal from './../../components/modal'
import { Link } from 'react-router-dom';
import NumberFormat from 'react-number-format'
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment'
import Swal from 'sweetalert2'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { CustomInput } from 'reactstrap';
import Axios from 'axios'


const useStyles = makeStyles(theme => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));
const MyProject =()=>{

    const auth = useSelector(state=>state.auth)

    const loading = useSelector(state=>state.Loading)
    const loadingdata = useSelector(state=>state.Loading)
    const [loadinglocal,setloadinglocal]=useState(true)
    const {id} = useSelector(state=>state.auth)
    const [redirect,setredirect]=useState(false)
    const [category,setcategory]=useState([])
    const datadariredux = useSelector(state=>state.DataProjectReducers)
    const dispatch = useDispatch()
    const [data,setdata] = useState({})
    const [dataedit,setdataedit] = useState([])
    // const [loading,setloading] = useState(true)
    const [modal,setmodal]=useState(false)
    const [update, setupdate]=useState(false)

    const classes = useStyles();


    useEffect(()=>{
        var id = localStorage.getItem('id')
        dispatch(changeHeaderAction(1))
         Axios.get(`${APIURL}product/getcategory`)
            .then((res)=>{
                dispatch(dataProject(id))
                console.log(res.data)
                setcategory(res.data)
            }).catch((err)=>{
                console.log(err)
            }).finally((final)=>{
                setloadinglocal(false)
            })
    },[])
    
    useEffect(()=>{
        var id = localStorage.getItem('id')
        dispatch(changeHeaderAction(1))
         Axios.get(`${APIURL}product/getcategory`)
            .then((res)=>{
                dispatch(dataProject(id))
                console.log(res.data)
                setcategory(res.data)
            }).catch((err)=>{
                console.log(err)
            }).finally((final)=>{
                setloadinglocal(false)
                setupdate(false)
            })
    },[update])




    const [addimagefile,setimageadd]=useState({
        addImageFileName:'Select your Image',
        addImageFile:undefined,
    })
    const onChangeInput=(e)=>{
        var myDate =  moment().format("YYYY-MM-DD HH:mm:ss");
          const {name,value} = e.target
          setdata({...data,[name]: value,iduser:id,deleted:0,datepost:myDate })
          console.log(data)
      }

      const renderCategory=()=>{
          return category.map((val,index)=>{
              return(
                <MenuItem value={val.id} key={index}>{val.category}</MenuItem>
              )
          })
      }

      const onAddImageFileChange=(event)=>{
        // console.log(document.getElementById('addImagePost').files[0])
        console.log(event.target.files[0])
        var file=event.target.files[0]
        if(file){
            setimageadd({...addimagefile,addImageFileName:file.name,addImageFile:event.target.files[0]})
        }else{
            setimageadd({...addimagefile,addImageFileName:'Select Image...',addImageFile:undefined})
        }
      }



      const onSubmitProject =()=>{
          console.log('onsubmitproject')
          console.log(dataedit.id)
          if(id===0){
                let timerInterval
                Swal.fire({
                title: 'You need login before creating a project !',
                html: 'I will close in <b></b> milliseconds.',
                timer: 3000,
                timerProgressBar: true,
                onBeforeOpen: () => {
                    Swal.showLoading()
                    timerInterval = setInterval(() => {
                    const content = Swal.getContent()
                    if (content) {
                        const b = content.querySelector('b')
                        if (b) {
                        b.textContent = Swal.getTimerLeft()
                        }
                    }
                    }, 100)
                },
                onClose: () => {
                    clearInterval(timerInterval)
                }
                }).then((result) => {
                /* Read more about handling dismissals below */
                if (result.dismiss === Swal.DismissReason.timer) {
                    console.log('I was closed by the timer')
                }
                })
          }else{
              var formdata=new FormData()
              var myDate =  moment().format("YYYY-MM-DD HH:mm:ss");
              
              formdata.append('image',addimagefile.addImageFile)
              formdata.append('data',JSON.stringify(data))
              var Headers={
                  headers:
                  {
                      'Content-Type':'multipart/form-data',
                    }
                }
                
                //   UserAddProject(formdata)
                Axios.put(`${APIURL}product/editproject/${dataedit.id}`,formdata,Headers)
                .then((res)=>{
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Success edit project :)',
                        showConfirmButton: false,
                        timer: 2500
                      }).then((res2)=>{
                        setmodal(!modal)
                        setupdate(true)
                        console.log(res2)
                        console.log('berhasil',res)
                      }).catch((err)=>{
                          console.log(err)
                      }).finally(()=>{
                        setredirect(true)
                      })
                    
                      
                }).catch((err)=>{
                    console.log('err')
                })
            }
                
            }





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
                    <div className='mt-3' style={{textAlign:'left', fontSize:'13px', fontWeight:'500'}}>Category : {val.category}</div>
                    <div style={{maxWidth:'600px'}}>    
                    <Button variant="contained" color="secondary" style={{marginTop:'11px',position:'absolute'}} onClick={()=>toggleModal(index)}>Edit This Project</Button>
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

            <Modal title={`Edit Your ${dataedit.namaproject} Project`} modal={modal} actionfunc={onSubmitProject} toggle={()=>setmodal(!modal) }>
            <TextField className='inputporjectusers m-2' defaultValue={dataedit.namaproject} style={{width:'98%', marginTop:'5px'}} id="standard-basic" label="Your Project Name" onChange={onChangeInput} name='namaproject'/>
                <TextField className='inputporjectusers m-2' defaultValue={dataedit.shortdescproject} style={{width:'98%', marginTop:'5px'}} id="standard-basic" label="What is your project ?" onChange={onChangeInput} name='shortdescproject' />
                {/* <TextField className='inputporjectusers m-2' style={{width:'98%', marginTop:'5px'}} id="standard-basic" label="Your Project Image"  inputRef={gambarproject}/> */}
                <TextField className='inputporjectusers m-2' defaultValue={dataedit.targetuang} style={{width:'98%', marginTop:'5px'}} id="standard-basic" label="Money Goal" onChange={onChangeInput} name='targetuang' />
                {/* <TextField className='inputporjectusers m-2' style={{width:'98%', marginTop:'5px'}}    id="standard-basic" label="Category" onChange={onChangeInput} name='categoryproject' /> */}
                <FormControl className={classes.formControl} style={{width:'98%', marginTop:'5px'}}>
                    <InputLabel id="demo-simple-select-label">Category</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        label='category'
                        id="demo-simple-select"
                        // value={data.categoryproject}
                        onChange={onChangeInput}
                        name='categoryproject'
                        >
                        {renderCategory()}
                    </Select>
                </FormControl>
                <CustomInput className='form-control inputporjectusers m-2' style={{width:'98%', marginTop:'10px'}} type='file' label={addimagefile.addImageFileName} id='addImagePost' 
                onChange={onAddImageFileChange}
                 />
                <TextField
                    className='inputporjectusers mt-3' style={{width:'98%', marginTop:'5px', marginBottom:'10px'}}
                    id="outlined-multiline-static"
                    label="Tell us more about your project"
                    multiline
                    rows="4"
                    variant="outlined"
                    onChange={onChangeInput} 
                    name='aboutproject'
                    defaultValue={dataedit.aboutproject}
                    />
            </Modal>
        </div>
    )
}


export default MyProject;