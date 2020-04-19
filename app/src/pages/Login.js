import Userform from '../components/Userform';
import React, {useState} from 'react';
import {connect} from 'react-redux';
import {userLoginFetch, getUserInfo} from '../redux/actions/user';
import {Redirect, NavLink} from 'react-router-dom';

const Login = (props) => {

    const [isLoading, setLoading] = useState(false);

    const handleSubmit = async (event, formData) => {
        event.preventDefault();
        setLoading(true);
        let formUser = {
            username: formData.username, 
            password: formData.password
        }
        props.userLoginFetch(formUser)
        setLoading(false);
    }

    if(props.isAuthenticated) return <Redirect push exact to="/fetcher"/>
    else {
        return (
            <div className="page login">
                <h1 className="fathead">Login</h1>
                <div className="form">
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
    loginError: state.user.loginError,
    isAuthenticated: state.user.isAuthenticated,
    username: state.user.username,
    token: state.user.token
})

const mapDispatchToProps = dispatch => ({
    userLoginFetch: formUser => dispatch(userLoginFetch(formUser)),
    getUserInfo : (username, token) => dispatch(getUserInfo(username, token))
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);