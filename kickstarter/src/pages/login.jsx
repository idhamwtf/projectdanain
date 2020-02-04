import React,{useEffect, createRef} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import '../css/login.css'
import {useSelector, useDispatch} from 'react-redux'
import { changeHeaderAction, changeFooterAction} from '../redux/actions'

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
    let username = createRef()
    let password = createRef() 

    
    const { HeaderFooter } = useSelector(state=>state.HeaderFooter)
    const dispatch = useDispatch()
    
    useEffect(()=>{
      dispatch(changeHeaderAction(1))
      dispatch(changeFooterAction(1))
    },[])


    const onClickLogin=()=>{
    
        console.log(username.current.value)
        console.log(password.current.value)
        // console.log(password)
    }


  return (
      <div className='login'>
        <form className={classes.root}  noValidate autoComplete="off">
            <div className='d-flex flex-column box-login'> 
        <TextField id="standard-basic" label="Username" className='m-2' inputRef={username} />
        <TextField id="standard-basic" label="Password" type="password" className='m-2' inputRef={password}/>
        {/* <div style={{marginTop:'auto'}}> */}
        <Button variant="contained" color="primary" className='button-login m-2' onClick={onClickLogin} >Login</Button>
        {/* </div> */}
            </div>
        </form>
      </div>
  );
}

export default Login;