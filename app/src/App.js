import React from 'react';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path='/' exact={true} component={Home}/>
        <Route path='/dashboard' exact={true} component={Dashboard}/>
      </Switch>
    </Router>
  )
}
export default App;