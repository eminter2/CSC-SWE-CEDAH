import React, {useState} from 'react';
import {withRouter, Redirect, NavLink} from 'react-router-dom';
import Userform from './Userform';
import './Login.css';

const Login = () => {
    const [message, setMessage] = useState("");
    const [isLoading, setLoading] = useState(false);
    const [redirect, setRedirect] = useState(false);

    const handleSubmit = (event, formData) => {
        event.preventDefault();
        setLoading(true);
        let formUser = {
            username: formData.username, 
            password: formData.password
        }
        console.log('Form user', formUser)
        console.log('Form json', JSON.stringify(formUser))

        //Login existing user
        let url = '/login'
        fetch(url , {
            method: 'POST',
            cache: 'no-cache',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formUser)
        })
        .then((response) => {
            console.log(response)
            let authHeader = response.headers.get("Authorization")
            setLoading(false)
            if(authHeader === null){
                setMessage("Username or Password are incorrect")
                setTimeout(() => {
                    setMessage("")
                }, 3000);
            }
            else{
                console.log("Success")
                let token = authHeader.split("Bearer ")[1]
                localStorage.setItem("token", token)
                setRedirect(true)    
            } 
        })
        .catch((error) => {
            console.log('Request Failed: ', error)
        })
        setLoading(false);
    }

    if(redirect) return <Redirect push exact to="/dashboard"/>

    else {
        return (
            <div className="page login">
                <h1>Login</h1>
                <div className="login-form">
                    <p style={{color: 'red'}}>{message}</p>
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