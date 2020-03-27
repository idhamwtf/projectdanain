import React, {useEffect, createRef, useState}from 'react';
import '../../css/projectusers.css'
import {useSelector, useDispatch} from 'react-redux'
import { changeHeaderAction} from '../../redux/actions'
// import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { CustomInput } from 'reactstrap';
import Axios from 'axios';
import { APIURL } from '../../helper/apiurl';
import moment from 'moment'
import Swal from 'sweetalert2'
import { Redirect } from 'react-router-dom';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import CurrencyTextField from '@unicef/material-ui-currency-textfield'

const useStyles = makeStyles(theme => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));


const Projectusers =()=>{

    const dispatch = useDispatch()

    const classes = useStyles();

    const {id} = useSelector(state=>state.auth)

    const [addimagefile,setimageadd]=useState({
        addImageFileName:'Select your Image',
        addImageFile:undefined,
    })
    const [data,setdata]=useState({})
    const [category,setcategory]=useState()
    const [loading,setloading]=useState(true)
    const [redirect,setredirect]=useState(false)

    useEffect(()=>{
        dispatch(changeHeaderAction(1))
        Axios.get(`${APIURL}product/getcategory`)
        .then((res)=>{
            setcategory(res.data)
        }).catch((err)=>{
            console.log(err)
        }).finally((final)=>{
            setloading(false)
        })
    },[])

    useState(()=>{
        setredirect(false)
    },[redirect])

      const onChangeInput=(e)=>{
        var myDate =  moment().format("YYYY-MM-DD HH:mm:ss");
          const {name,value} = e.target
          setdata({...data,[name]: value,iduser:id,deleted:0,datepost:myDate })
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
                Axios.post(`${APIURL}product/addproject`,formdata,Headers)
                .then((res)=>{
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Success adding project :)',
                        showConfirmButton: false,
                        timer: 2500
                      }).then((res2)=>{
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
            
    if(redirect){
        return <Redirect to={'/myproject'} />
    }

    if(loading){
        return(
            <div>Loading...</div>
        )
    }
    return (
    <div className='projectadduser'>
        <center>
            <div style={{fontSize:'34px', fontWeight:'200', marginRight:'2%', marginTop:'5px'}}>Start your project</div>
            <div className='d-flex flex-column' style={{ width:'35%', height:'100%'}}>
                <TextField className='inputporjectusers m-2' style={{width:'98%', marginTop:'5px'}} id="standard-basic" label="Your Project Name" onChange={onChangeInput} name='namaproject'/>
                 <TextField className='inputporjectusers m-2' style={{width:'98%', marginTop:'5px'}} id="standard-basic" label="What is your project ?" onChange={onChangeInput} name='shortdescproject' />
                <CurrencyTextField
                        label="Money Goal"
                        name='targetuang'
                        // value={value}
                        unselectable
                        currencySymbol="IDR"
                        onChange={onChangeInput}
                        style={{width:'98%'}}
                    />
                {/* <TextField className='inputporjectusers m-2' style={{width:'98%', marginTop:'5px'}} id="standard-basic" label="Money Goal" onChange={onChangeInput} name='targetuang' /> */}
                <FormControl className={classes.formControl} style={{width:'98%', marginTop:'5px'}}>
                    <InputLabel id="demo-simple-select-label">Category</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        label='category'
                        id="demo-simple-select"
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
                    />
                <Button variant="contained" color="primary" className='button-login mt-3'  onClick={onSubmitProject}>Submit</Button>
            </div>
        </center>
    </div>
   

)
}

export default Projectusers;