import Axios from 'axios'
import {APIURL} from './../../helper/apiurl'

export const UserAddProject=(data)=>{
    var Headers={
        headers:
        {
            'Content-Type':'multipart/form-data',
        }
      }
    return (dispatch)=>{
            Axios.post(`${APIURL}product/addproject`,data, Headers)
            .then((res)=>{
                if(res.data.status==='error'){
                    dispatch(console.log('ini error', res.data.message))
                }else{
                    
                    dispatch(console.log('berhasil'))
                }
            }).catch(err=>{
                console.log(err)
            })
        }
    
}