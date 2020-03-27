import React,{useEffect, createRef} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import '../../css/login.css'
import {useSelector, useDispatch} from 'react-redux'
import { changeHeaderAction, changeFooterAction, loginAction,regissuccedredirect} from '../../redux/actions'
import {Redirect} from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
}));



function Login() {
  const classes = useStyles();
    let usernameref = createRef()
    let passwordref = createRef() 

    const dispatch = useDispatch()

    const redirect = useSelector(state=>state.Redirect)
    
    useEffect(()=>{
      dispatch(changeHeaderAction(1))
      dispatch(changeFooterAction(1))
      dispatch(regissuccedredirect())
    },[])


    const onClickLogin=()=>{
      var username = usernameref.current.value
      var password = passwordref.current.value

      dispatch(loginAction(username,password))
    }
    if(redirect){
      return <Redirect to={'/'}/>
    }

  return (
      <div className='login'>
        <form className={classes.root}  noValidate autoComplete="off">
            <div className='d-flex flex-column box-login'> 
        <TextField id="standard-basic" label="Username" className='m-2' inputRef={usernameref} />
        <TextField id="standard-basic" label="Password" type="password" className='m-2' inputRef={passwordref}/>
        <Button variant="contained" color="primary" className='button-login m-2' onClick={onClickLogin} >Login</Button>
            </div>
        </form>
      </div>
  );
}

export default Login;