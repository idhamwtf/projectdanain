import React, {useEffect, createRef, useState}from 'react';
import '../../css/projectusers.css'
import {useSelector, useDispatch} from 'react-redux'
import { changeHeaderAction, changeFooterAction, UserRegister} from '../../redux/actions'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';





const Projectusers =()=>{

    const [project,setproject] = useState({})

    const { HeaderFooter } = useSelector(state=>state.HeaderFooter)
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(changeHeaderAction(1))
        // dispatch(changeFooterAction(1))
      },[])

      let projectnameref = createRef()
      let projectimageref = createRef() 
      let projectdescref = createRef()
      let moneygoalref = createRef() 
      let timetargetref = createRef()
      let categoryref = createRef()


      const onSubmitProject =()=>{
            projectnameref = projectnameref.current.value
            projectimageref = projectimageref.current.value
            projectdescref = projectdescref.current.value
            moneygoalref = moneygoalref.current.value
            timetargetref = timetargetref.current.value
            categoryref = categoryref.current.value
                
            const data = {
                projectnameref,
                projectimageref,
                projectdescref,
                moneygoalref,
                timetargetref,
                categoryref
            }

            console.log(data)
            console.log(projectnameref)
      }
  
return (
    <div className='projectadduser'>
        <center>
            <div style={{fontSize:'34px', fontWeight:'200', marginRight:'2%', marginTop:'5px'}}>Start your project</div>
            <div className='d-flex flex-column' style={{border:'1px black solid', width:'5 0%', height:'100%'}}>
                <TextField id="standard-basic" label="Your Project Name" className='m-2' inputRef={projectnameref} />
                <TextField id="standard-basic" label="Your Project Image" className='m-2'  inputRef={projectimageref}/>
                <TextField
                    id="outlined-multiline-static"
                    label="Your Project Description"
                    multiline
                    rows="4"
                    variant="outlined"
                    inputRef={projectdescref}
                    />
                <TextField id="standard-basic" label="Money Goal" className='m-2' inputRef={moneygoalref} />
                <TextField id="standard-basic" label="Time Target" className='m-2' inputRef={timetargetref} />
                <TextField id="standard-basic" label="Category" className='m-2' inputRef={categoryref} />
                <Button variant="contained" color="primary" className='button-login m-2'  onClick={onSubmitProject}>Submit</Button>
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


