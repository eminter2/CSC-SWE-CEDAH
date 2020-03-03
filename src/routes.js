import React from 'react'
import {Routes, Switch} from 'react-router-dom'
import App from './pages/App'
import Login from './pages/Login'

export const Routes = () => {
    <Switch>
        <Route exact path='/' component={App}/>
        <Route path='/login' component={Login}/>
    </Switch>
}