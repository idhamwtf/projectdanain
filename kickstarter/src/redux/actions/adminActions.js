import Axios from 'axios'
import {APIURL} from './../../helper/apiurl'


export const getbukti=(page)=>{
    return (dispatch)=>{
        Axios.get(`${APIURL}admin/getbukti/${page}`)
        .then((res)=>{
            dispatch({type:'GET_BUKTI', payload:res.data.pageOfdata })
        }).catch((err)=>{
            console.log(err)
        })
    }
}


