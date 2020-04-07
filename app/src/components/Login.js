import Userform from './Userform';
import React, {useState} from 'react';
import {connect} from 'react-redux';
import {userLoginFetch} from '../redux/actions/actions';
import {Redirect, NavLink} from 'react-router-dom';

const Login = (props) => {

    const [isLoading, setLoading] = useState(false);

    const handleSubmit = (event, formData) => {
        event.preventDefault();
        setLoading(true);
        let formUser = {
            username: formData.username, 
            password: formData.password
        }
        props.userLoginFetch(formUser)
        setLoading(false);
    }

    if(props.isAuthenticated) return <Redirect push exact to="/dashboard"/>

    else {
        return (
            <div className="page login">
                <h1>Login</h1>
                <div className="login-form">
                    <p style={{color: 'red'}}>{props.loginError}</p>
                    <Userform isLoading={isLoading} handleSubmit={handleSubmit}/>                    
                    <p style={{padding: 30}}>
                        Don't have an account?
                        <NavLink to="/signup" style={{marginLeft: 10}}>Sign up</NavLink>
                    </p>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    loginError: state.reducer.loginError,
    isAuthenticated: state.reducer.isAuthenticated
})

const mapDispatchToProps = dispatch => ({
    userLoginFetch: formUser => dispatch(userLoginFetch(formUser))
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);