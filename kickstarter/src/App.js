import React,{useEffect} from 'react';
import './App.css';
import Header from './components/header'
import Headercategory from './components/headercategory'
import Homepage from './components/homepage'
import Footer from './components/footer'
import Login from './pages/users/login';
import { Route, Switch } from 'react-router-dom';
import Register from './pages/users/register'
import Admin from './pages/admin/admin'
import Verified from './pages/users/verified';
import Project from './pages/users/projectusers'
import Axios from 'axios';
import { APIURL } from './helper/apiurl';
import { reLogin } from './redux/actions';
import {useDispatch, useSelector} from 'react-redux'
import MyProject from './pages/users/myproject'

function App() {
  const dispatch = useDispatch()
  const {username,id,role} = useSelector(state=>state.auth)

  useEffect(()=>{
    var id = localStorage.getItem('id')
    console.log(id)
    if(id){
      Axios.get(`${APIURL}auth/login/${id}`)
      .then((res)=>{
        dispatch(reLogin(res.data))
      })
    }
  },[])
  
  // console.log(role)
  return (
    <div className="App">
      <Header/>
      <Headercategory/>
      <Switch>
        <Route path={'/'} exact component={Homepage}/>
        <Route path={'/register'} exact component={Register}/>
        <Route path={'/login'} exact component={Login}/>
        <Route path={'/admin'} exact component={Admin}/>
        <Route path={'/verified'} exact component={Verified}/>
        <Route path={'/project'} exact component={Project}/>
        <Route path={'/myproject'} exact component = {MyProject}/>
      </Switch>
      <Footer/>
    </div>
  );
}

export default App;
