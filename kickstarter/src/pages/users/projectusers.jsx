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


    const classes = useStyles();
    // const [project,setproject] = useState({})
    const [addimagefile,setimageadd]=useState({
        addImageFileName:'Select your Image',
        addImageFile:undefined,
    })
    
    // const { HeaderFooter } = useSelector(state=>state.HeaderFooter)
    const dispatch = useDispatch()
    const {id} = useSelector(state=>state.auth)
    const [data,setdata]=useState({})
    const [category,setcategory]=useState()
    const [loading,setloading]=useState(true)
    const [redirect,setredirect]=useState(false)

        useEffect(()=>{
            dispatch(changeHeaderAction(1))
            Axios.get(`${APIURL}product/getcategory`)
            .then((res)=>{
                console.log(res)
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
        console.log(id)

      let namaproject = createRef()
      let gambarproject = createRef() 
      let shortdescproject = createRef()
      let aboutproject = createRef()
      let targetuang = createRef() 
      let categoryproject = createRef()

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
                {/* <TextField className='inputporjectusers m-2' style={{width:'98%', marginTop:'5px'}} id="standard-basic" label="Your Project Image"  inputRef={gambarproject}/> */}
                <TextField className='inputporjectusers m-2' style={{width:'98%', marginTop:'5px'}} id="standard-basic" label="Money Goal" onChange={onChangeInput} name='targetuang' />
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
                    />
                <Button variant="contained" color="primary" className='button-login mt-3'  onClick={onSubmitProject}>Submit</Button>
            </div>
        </center>
    </div>
   

)
}

export default Projectusers;



// import React, { Component } from 'react'
// import { Table, Button } from 'react-bootstrap'
// import { Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, FormText } from 'reactstrap'

// class Projectusers extends Component {
//     state = {
//         modaladd: false,
//         addImageFile: null
//     }
//     onSaveClick = () => {
//         var formdata = new FormData()
//         var produk = this.refs.produk.value
//         var deskripsi = this.refs.deskripsi.value
//         var foto = this.state.addImageFile

//         var data = {
//             produk,
//             deskripsi,
//             foto
//         }

//         Axio
//         console.log(data)
//     }

//     onChangeImage = (event) => {
//         console.log(event.target.files[0]);
//         var file = event.target.files[0]
//         if (file) {
//             this.setState({ addImageFile: event.target.files[0] })
//             // setimageadd({ ...addimagefile, addImageFileName: file.name, addImageFile: event.target.files[0] });
//         } else {
//             alert('masukan foto')
//         }
//     }

//     render() {
//         return (
//             <div style={{ marginTop: '30px' }}>
//                 <Modal isOpen={this.state.modaladd} toggle={() => this.setState({ modaladd: false })}>
//                     <ModalHeader className='header-addmodal'>
//                         Add Data
//                     </ModalHeader>
//                     <ModalBody>
//                         <Form>
//                             <FormGroup>
//                                 <input type="text" placeholder="Nama Produk" ref="produk" />
//                             </FormGroup>
//                             <FormGroup>
//                                 <textarea type="text" placeholder="Deskripsi" ref="deskripsi" />
//                             </FormGroup>
//                             <FormGroup>
//                                 <FormText >Foto</FormText>
//                                 <input type="file" name="file" onChange={this.onChangeImage} />
//                                 <FormText color="muted">

//                                     Format foto harus dalam bentuk PNG
//                                 </FormText>
//                             </FormGroup>
//                             <FormGroup>
//                                 <FormText>
//                                     Genre
//                                 </FormText>
//                                 <select>
//                                     <option>RPG</option>
//                                     <option>Action</option>
//                                     <option>Sandbox</option>
//                                     <option>FPS</option>
//                                     <option>Adventure</option>
//                                 </select>
//                             </FormGroup>
//                         </Form>
//                     </ModalBody>
//                     <ModalFooter>
//                         <Button onClick={this.onSaveClick}>Save</Button>
//                         <Button onClick={() => this.setState({ modaladd: false })}>Cancel</Button>
//                     </ModalFooter>
//                 </Modal>
//                 <Table striped bordered hover variant="dark">
//                     <thead>
//                         <tr>
//                             <th>No</th>
//                             <th>Nama Produk</th>
//                             <th>Deskripsi</th>
//                             <th>Genre</th>
//                             <th>Foto</th>
//                             <th style={{ justifyContent: 'center' }}>Action</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         <tr>
//                             <td>1</td>
//                             <td>Monster Hunter</td>
//                             <td>Game RPG</td>
//                             <td>RPG</td>
//                             <td>Foto</td>
//                             <td>
//                                 <Button size="sm" variant="dark">Edit</Button>
//                                 <Button size="sm" variant="dark">Delete</Button>
//                             </td>
//                         </tr>
//                         <tr>
//                             <td>2</td>
//                             <td>Monster Hunter</td>
//                             <td>Game RPG</td>
//                             <td>RPG</td>
//                             <td>Foto</td>
//                             <td>
//                                 <Button size="sm" variant="dark">Edit</Button>
//                                 <Button size="sm" variant="dark">Delete</Button>
//                             </td>
//                         </tr>
//                     </tbody>

//                 </Table>
//                 <div className="button-add">
//                     <Button variant='dark' size='lg' onClick={() => this.setState({ modaladd: true })}>
//                         Add Product
//               </Button>
//                 </div>
//             </div>
//         );
//     }
// }

// export default Projectusers;


