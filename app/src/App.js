import React from 'react';
import { CookiesProvider } from 'react-cookie';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

const App = () => {
  return (
    <CookiesProvider>
      <Router>
        <Switch>
          <Route path='/' exact={true} component={Home}/>
          <Route path='/dashboard' exact={true} component={Dashboard}/>
        </Switch>
      </Router>
    </CookiesProvider>
  )
}
export default App;