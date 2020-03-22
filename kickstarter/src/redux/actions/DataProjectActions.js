import Axios from 'axios'
import {APIURL} from './../../helper/apiurl'


export const dataProject=(id)=>{
    return async (dispatch)=>{
        Axios.get(`${APIURL}product/getprojectuser/${id}`)
        .then((res)=>{
            // console.log(res.data)
            dispatch({type:'DATAPROJECT_POST', payload:res.data})
            dispatch({type:'LOADING'})
        }).catch((err)=>{
            console.log(err)
        })
    }
}