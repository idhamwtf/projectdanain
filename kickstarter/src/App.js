import React from 'react';
import './App.css';
import Header from './components/header'
import Headercategory from './components/headercategory'
import Homepage from './components/homepage'
import Footer from './components/footer'
import Login from './pages/login';
import { Route, Switch } from 'react-router-dom';
import Register from './pages/register'
import Admin from './pages/admin'

function App() {
  return (
    <div className="App">
      <Header/>
      <Headercategory/>
      <Switch>
        <Route path={'/'} exact component={Homepage}/>
        <Route path={'/register'} exact component={Register}/>
        <Route path={'/login'} exact component={Login}/>
        <Route path={'/admin'} exact component={Admin}/>
      </Switch>
      <Footer/>
    </div>
  );
}

export default App;
