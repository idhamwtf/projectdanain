import React,{useEffect, useState} from 'react';
import './App.css';
import './css/slick.css'
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
import {getbukti} from './redux/actions'
import ProjectDetails from './pages/users/projectdetails'
import ExploreProject from './pages/exploreproject'
import Notfound404 from './components/notfound404'
import HistoryUsers from './pages/users/history'

function App() {
  const dispatch = useDispatch()

  const {loading} = useSelector(state=>state.auth)

  const [loadinglocal,setloadinglocal] = useState(true)

  useEffect(()=>{
    var id = localStorage.getItem('id')
    // console.log(id)
    if(id){
      Axios.get(`${APIURL}auth/login/${id}`)
      .then((res)=>{
        dispatch(reLogin(res.data))
      })
      // dispatch(dataProject(id))
      // dispatch(getbukti())
    }
    setloadinglocal(false)
  },[])

  useEffect(()=>{
    // dispatch(dataProject(id))
    dispatch(getbukti())
    // setrefresh(false)
  })

  // console.log(role)

  if(loading && loadinglocal){
    return(
      <div>Loading...</div>
    )
  }
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
        <Route path={'/projectdetail/:id'} exact component ={ProjectDetails}/>
        <Route path={'/explore'} exact component={ExploreProject}/>
        <Route path={'/historyusers'} exact component={HistoryUsers}/>
        <Route path={'/'} component={Notfound404}/>
        {/* <Route path={'/logout'} exact component ={Homepage}/> */}
      </Switch>
      <Footer/>
    </div>
  );
  
  
}


export default App;
