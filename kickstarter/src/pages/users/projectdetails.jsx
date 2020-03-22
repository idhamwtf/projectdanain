import React from 'react';
import Progressbar from './../../components/progressbar'
import Button from '@material-ui/core/Button'
import { useEffect,useState } from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {changeHeaderAction, changeFooterAction, dataProject} from './../../redux/actions'
import Modal from './../../components/modal'
import { APIURL, APIURLimage } from '../../helper/apiurl';
import Axios from 'axios'
import { CustomInput } from 'reactstrap';
import CurrencyTextField from '@unicef/material-ui-currency-textfield'

const ProjectDetails=(props)=>{
    const dispatch = useDispatch()
    const [modal,setmodal]=useState(false)
    const [loading,setloading]=useState(true)
    const [dataprojectdetail, setdataprojectdetail] =useState([])
    const [addimagefile,setimageadd]=useState({
        addImageFileName:'Select your Image',
        addImageFile:undefined,
      })
    const [value, setValue]=useState()
    const {match} = props
    const {id} = match.params
    const idlogin = useSelector(state=>state.auth.id)

    useEffect(()=>{
        dispatch(changeHeaderAction(1))
        console.log('woi')
        Axios.get(`${APIURL}product/projectdetail/${id}`)
        .then((res)=>{
            console.log(res.data)
            setdataprojectdetail(res.data)
            setloading(false)
        }).catch((err)=>{
            console.log(err)
        })
    },[])

    const toggleModal=(index)=>{
        setmodal(true)
    }

    const renderProjectDetail=()=>{
        return dataprojectdetail.map((val,index)=>{
                return(
        <div key={index}>
            <div className= 'my-5 d-flex' >
            <div style={{height:'60%', width:'50%', margin:'15px 5%'}} >
                <img style={{height:'100%',width:'100%'}} src={`${APIURLimage+val.gambarproject}`} alt=""/>
                <Progressbar defaultValue={0} value={val.percentdonate} height='15px' color='secondary' />
                </div >
                        <div style={{position:'relative'}}>
                        <div className='mt-3' style={{textAlign:'left', fontSize:'24px', fontWeight:'600'}}>{val.namaproject}</div>
                        <div className='mt-3' style={{textAlign:'left', fontSize:'18px', fontWeight:'500'}}>{val.shortdescproject}</div>
                        <div className='mt-3' style={{textAlign:'left', fontSize:'18px', fontWeight:'500', color:'#eb0f5d'}}>Target : IDR {val.targetuang}</div>
                        <div className='mt-3' style={{textAlign:'left', fontSize:'18px', fontWeight:'500', color:'#eb0f5d'}}>Funded : {parseInt(val.percentdonate)} %</div>
                        <div className='mt-3' style={{textAlign:'left', fontSize:'13px', fontWeight:'500', color:'#757575'}}>By {val.username}  </div>
                        <div style={{position:'absolute', bottom:0, marginBottom:'17px'}}>
                        <Button variant="contained" color="secondary" style={{width:'400px'}} onClick={toggleModal}>Donate to this Project</Button>
                        </div>
                    </div>
            </div>
            <div style={{width:'180vh', marginLeft:'70px', textAlign:'left', marginBottom:'100px', fontWeight:'500', borderTop:'1px silver solid', paddingTop:'10px'}}>
                {val.aboutproject}
            </div>
        </div>
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

      const Hari=(a='')=>{
        let newDate = new Date()
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();
        return `${year}${a}${month<10?`0${month}`:`${month}`}${a}${date}`
     }


      const onSaveClick=()=>{
        var formdata = new FormData()

        var data = {
            idproject:id,
            iddonatur:idlogin,
            jumlahdonasi:value,
            confirm:0,
            tanggaldonasi:Hari(),
        }

        // console.log(data)


        formdata.append('image',addimagefile.addImageFile)
        formdata.append('data',JSON.stringify(data))
        var Headers={
          headers:
          {
              'Content-Type':'multipart/form-data',
          }
        }


        Axios.post(`${APIURL}donate/postdonate`,formdata,Headers)
        .then((res)=>{
            console.log('berhasil')
            setmodal(!modal)
        }).catch((err)=>{
            console.log('err')
        })

      }



    // console.log(id, 'idparams')
    console.log(dataprojectdetail)
    console.log(id)
    if(loading){
        return(
            <div>
                Loading...
            </div>
        )
    }
    return(
        <div>
            {renderProjectDetail()}

                <Modal title={`DONATE TO THIS PROJECT`} modal={modal} toggle={()=>setmodal(!modal)} actionfunc={onSaveClick}>
                    <div style={{marginBottom:'15px'}}>
                        here's how to donate :
                        First, please fill the amount money you want donate below,
                        then you can transfer to our bank account<br></br>
                        - ABC 199-000-111<br></br>
                        - Indepedent Bank 1203123-1232<br></br>
                        then you can upload your proof transaction below,
                        after approved by admin we gonna provide your donation to the author.<br></br>
                        Note :<br></br>
                        <span style={{color:'red'}}>- You can donate without login but you got no record of your donation<br></br>
                         - You need to login if you want record your donation history<br></br>
                         - the form below must be filled.</span><br></br>
                    </div>
                    <CurrencyTextField
                        label="Amount"
                        value={value}
                        unselectable
                        currencySymbol="IDR"
                        onChange={(event, value)=> setValue(value)}
                        style={{marginBottom:'30px', width:'450px'}}
                    />
                    <CustomInput type='file' label={addimagefile.addImageFileName} id='addImagePost' onChange={onAddImageFileChange} className='form-control' />
                </Modal>
            </div>
    )
}

export default ProjectDetails