import React, {useEffect, createRef, useState}from 'react';
import '../../css/projectusers.css'
import {useSelector, useDispatch} from 'react-redux'
import { changeHeaderAction, changeFooterAction, UserRegister, UserAddProject} from '../../redux/actions'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { CustomInput } from 'reactstrap';
import Axios from 'axios';
import { APIURL } from '../../helper/apiurl';






const Projectusers =()=>{

    const [project,setproject] = useState({})
    const [addimagefile,setimageadd]=useState({
        addImageFileName:'Select your Image',
        addImageFile:undefined,
      })

    const { HeaderFooter } = useSelector(state=>state.HeaderFooter)
    const dispatch = useDispatch()
    const {username,id,role} = useSelector(state=>state.auth)

        useEffect(()=>{
            dispatch(changeHeaderAction(1))
            // console.log(id)
            // dispatch(changeFooterAction(1))
        },[])
        console.log(id)

        const Hari=(a='')=>{
            let newDate = new Date()
            let date = newDate.getDate();
            let month = newDate.getMonth() + 1;
            let year = newDate.getFullYear();
            return `${year}${a}${month<10?`0${month}`:`${month}`}${a}${date}`
         }



      let namaproject = createRef()
      let gambarproject = createRef() 
      let shortdescproject = createRef()
      let aboutproject = createRef()
      let targetuang = createRef() 
      let targetwaktu = createRef()
      let categoryproject = createRef()

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
            var formdata=new FormData()
            namaproject = namaproject.current.value
            shortdescproject = shortdescproject.current.value
            // gambarproject = gambarproject.current.value
            aboutproject = aboutproject.current.value
            targetuang = targetuang.current.value
            categoryproject = categoryproject.current.value
                
            const data = {
                namaproject,
                aboutproject,
                shortdescproject,
                targetuang,
                categoryproject,
                gambarproject,
                iduser:id,
                tanggalpost:Hari(),
                deleted:0
            }
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
                console.log('berhasil')
            }).catch((err)=>{
                console.log('err')
            })
            
      }
      console.log(Hari())
  
      return (
    <div className='projectadduser'>
        <center>
            <div style={{fontSize:'34px', fontWeight:'200', marginRight:'2%', marginTop:'5px'}}>Start your project</div>
            <div className='d-flex flex-column' style={{ width:'35%', height:'100%'}}>
                <TextField className='inputporjectusers' style={{width:'98%', marginTop:'5px'}} id="standard-basic" label="Your Project Name" className='m-2' inputRef={namaproject} />
                <TextField className='inputporjectusers' style={{width:'98%', marginTop:'5px'}} id="standard-basic" label="What is your project ?" className='m-2' inputRef={shortdescproject} />
                {/* <TextField className='inputporjectusers' style={{width:'98%', marginTop:'5px'}} id="standard-basic" label="Your Project Image" className='m-2'  inputRef={gambarproject}/> */}
                <TextField className='inputporjectusers' style={{width:'98%', marginTop:'5px'}} id="standard-basic" label="Money Goal" className='m-2' inputRef={targetuang} />
                <TextField className='inputporjectusers' style={{width:'98%', marginTop:'5px'}}    id="standard-basic" label="Category" className='m-2' inputRef={categoryproject} />
                <CustomInput className='inputporjectusers' style={{width:'98%', marginTop:'10px'}} type='file' label={addimagefile.addImageFileName} id='addImagePost' className='form-control' 
                onChange={onAddImageFileChange}
                 />
                <TextField
                    className='inputporjectusers mt-3' style={{width:'98%', marginTop:'5px', marginBottom:'10px'}}
                    id="outlined-multiline-static"
                    label="Tell us more about your project"
                    multiline
                    rows="4"
                    variant="outlined"
                    inputRef={aboutproject}
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


