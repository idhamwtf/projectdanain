import Axios from 'axios'
import {APIURL} from './../../helper/apiurl'
import {USER_LOGIN_SUCCESS, USER_LOGOUT, AUTH_LOADING, AUTH_LOGIN_ERROR, AUTH_REGISTER, AUTH_SYSTEM_ERROR, AUTH_REGISTER_ERROR} from './../actions/types'

export const LogoutSuccessAction=()=>{
    return{
        type:'LOGOUT_SUCCESS',
    }
}

export const UserRegister=({username, email, password})=>{
    return (dispatch)=>{
        if(username==='' || password==='' || email===''){
            dispatch({type:'ERROR_REGISTER', payload:'Pastikan semua terisi'})
        }else{
            Axios.post(`${APIURL}auth/register`, {username,email,password})
            .then((res)=>{
                if(res.data.status==='error'){
                    console.log('ini error', res.data.message)
                    dispatch({type:'ERROR_REGISTER', payload:res.data.message})
                }else{
                    dispatch({type:'SUCCESS_REGISTER'})
                }
            }).catch(err=>{
                console.log(err)
            })
        }
    }
}


export const loginAction = (username, password)=>{
    return dispatch=>{
        dispatch({type: AUTH_LOADING})

        Axios.get(`${APIURL}auth/login`, {
            params:{
                username,
                password
            }
        }).then((res)=>{
            console.log(res.data)
            if(res.data.status !== "error"){
                dispatch({type: USER_LOGIN_SUCCESS, payload:res.data})
                localStorage.setItem("username", res.data.username)
                localStorage.setItem("id", res.data.id)
            }else{
                dispatch({type: AUTH_LOGIN_ERROR, payload: res.data.message})
            }
        })
    }    
}

export const reLogin=(res)=>{
    console.log(res)
    return dispatch =>{
        dispatch({type:USER_LOGIN_SUCCESS, payload:res})
    }
}

