import React, {useState} from 'react';
import {Form, Button, Spinner} from 'react-bootstrap';
import {withRouter, Redirect, NavLink} from 'react-router-dom';
import Userform from './Userform';
import './Login.css';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [isLoading, setLoading] = useState(false);
    const [redirect, setRedirect] = useState(false);

    let formUser = {
        username: username,
        password: password
    }

    const handleSubmit = (event, formData) => {
        event.preventDefault();
        setLoading(true);

        //Login existing user
        let url = '/login'
        console.log('Fetching with username: ', formData.username)
        fetch(url , {
            method: 'POST',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then((response) => {
            let authHeader = response.headers.get("Authorization")
            setLoading(false)
            if(authHeader === null){
                setMessage("Username or Password are incorrect")
                setTimeout(() => {
                    setMessage("")
                }, 3000);
            }
            else{
                let token = authHeader.split("Bearer ")[1]
                localStorage.setItem("token", token)
                setRedirect(true)    
            } 
        })
        .catch((error) => {
            console.log('Request Failed: ', error)
        })
    }

    if(redirect) return <Redirect push to={{pathname: '/dashboard' }}/>

    else {
        return (
            <div className="page login">
                <h1>Login</h1>
                <div className="login-form">
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

export default withRouter(Login);