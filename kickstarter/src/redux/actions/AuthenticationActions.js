import Axios from 'axios'
import {APIURL} from './../../helper/apiurl'
import {USER_LOGIN_SUCCESS,AUTH_LOADING, AUTH_LOGIN_ERROR} from './../actions/types'
import Swal from 'sweetalert2'

export const LogoutSuccessAction=()=>{
    return{
        type:'LOGOUT_SUCCESS',
    }
}

export const UserRegister=({username, email, password})=>{
    return (dispatch)=>{
        if(username==='' || password==='' || email===''){
            dispatch({type:'ERROR_REGISTER_TIDAKLENGKAP', payload:'Pastikan semua terisi'})
            console.log('belom lengkap')
        }else{
            Axios.post(`${APIURL}auth/register`, {username,email,password})
            .then((res)=>{
                if(res.data.status==='error'){
                    console.log('ini error', res.data.message)
                    dispatch({type:'ERROR_REGISTER', payload:res.data.message})
                }else{
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Register Succeed',
                        showConfirmButton: false,
                        timer: 2000
                      }).then((res)=>{
                          dispatch({type:'SUCCESS_REGISTER'})
                      })

                }
            }).catch(err=>{
                console.log(err)
            })
        }
    }
}

export const regissuccedredirect=()=>{
    return dispatch=>{
        dispatch({type:'SUCCESS_REGISTER_REDIRECT'})
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
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Login Succeed',
                    showConfirmButton: false,
                    timer: 2000
                  }).then((res1)=>{
                    dispatch({type: USER_LOGIN_SUCCESS, payload:res.data})
                    localStorage.setItem("username", res.data.username)
                    localStorage.setItem("id", res.data.id)
                    dispatch({type:'REDIRECT'})
                  })

            }else{
                dispatch({type: AUTH_LOGIN_ERROR, payload: res.data.message})
            }
        })
    }    
}

export const reLogin=(res)=>{
    console.log(res,'resrelogin')
    return dispatch =>{
        dispatch({type:USER_LOGIN_SUCCESS, payload:res})
    }
}

export const Logoutaction=()=>{
    // return {
    //     type: USER_LOGOUT
    // }
    console.log('masuklogout')
    return dispatch =>{
        dispatch({type:`USER_LOGOUT`})
        dispatch({type:'FALSEREDIRECT'})
    }
        
}


// export const testasu=()=>{
//     return {
//         type : `USER_LOGOUT`
//     }
// }