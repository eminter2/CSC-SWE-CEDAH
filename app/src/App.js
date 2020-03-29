import React from 'react';
import Welcome from './components/Welcome';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import history from './history';
import {Router, Route, Switch, Redirect} from 'react-router-dom';

const getSession = () => {
  if(!localStorage.token) return false;
  else return true
}

const App = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route path='/' exact={true} component={Welcome}/>
        <Route path='/login' exact={true} component={Login}/>
        <Route path='/dashboard' exact={true} render={() => (
          getSession() ? (
            <Dashboard/> ) : <Redirect to="/login"/>
        )}/>
      </Switch>
    </Router>
  )
}
export default App;