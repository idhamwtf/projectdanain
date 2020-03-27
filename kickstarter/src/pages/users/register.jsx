import React,{useEffect, createRef} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import '../../css/register.css'
import {useDispatch, useSelector} from 'react-redux'
import { changeHeaderAction, changeFooterAction, UserRegister} from '../../redux/actions'
import { Redirect } from 'react-router-dom';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
}));


function Register() {
    const classes = useStyles();
    const dispatch = useDispatch()

    let usernameref = createRef()
    let passwordref = createRef() 
    let repasswordref = createRef()
    let emailref = createRef() 

    const {register,errorgalengkap} = useSelector(state=>state.auth)
    
    useEffect(()=>{
      dispatch(changeHeaderAction(1))
      dispatch(changeFooterAction(1))
    },[])


    const onClickRegister=()=>{
        var username = usernameref.current.value
        var password = passwordref.current.value
        var repassword = repasswordref.current.value
        var email = emailref.current.value
        // console.log(username)

        if(password===repassword){
          dispatch(UserRegister({username,password,email}))
        }
        console.log(errorgalengkap)
    }

    if(register){
      return <Redirect to={'/login'}/>
    }
    return (
        <div className='register'>
          <form className={classes.root}  noValidate autoComplete="off">
          <div className='d-flex flex-column box-login'> 
            <TextField id="standard-basic" label="Username" className='m-2' inputRef={usernameref} />
            <TextField id="standard-basic" label="Password" type="password" className='m-2' inputRef={passwordref}/>
            <TextField id="standard-basic" label="Re-enter Password" type="password" className='m-2' inputRef={repasswordref}/>
            <TextField id="standard-basic" label="Email" type="email" className='m-2' inputRef={emailref}/>
            <Button variant="contained" color="primary" className='button-login m-2' onClick={onClickRegister} >Register</Button>
            {errorgalengkap?
            <Alert severity="error">There's an empty field above, please fill it</Alert>
            :
            null
            }
                </div>
            </form>
        </div>
    );
}

export default Register;