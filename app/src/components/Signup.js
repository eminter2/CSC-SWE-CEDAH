import React, {useState} from 'react';
import {withRouter, NavLink, Redirect} from 'react-router-dom';
import Userform from './Userform';

import './Signup.css';

const Signup = () => {

    const [isLoading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [redirect, setRedirect] = useState(false);

    const handleSubmit = async (e, formData) => {
        e.preventDefault()
        setLoading(true);
        console.log("Form data: ", formData)

        //Register new user
        let url = '/users/sign-up'
        let response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        if(response.ok){
            setRedirect(true)
        }
        else{
            let responseText = await response.text()
            console.log('Response text: ', responseText)
            setMessage(responseText);
        }
        setLoading(false)
    }

    if(redirect) return <Redirect to="/login" exact push/>
    else{
        return (
            <div className="page signup">
                <h1>Sign up!</h1>
                <div className="login-form">
                    <p style={{color: 'red'}}>{message}</p>
                    <Userform 
                        signup
                        isLoading={isLoading}
                        handleSubmit={handleSubmit}/>
                    <p style={{padding: 30}}>
                        Already have an account?
                        <NavLink to="/login" style={{marginLeft: 10}}>Log in</NavLink>
                    </p>
                </div>
            </div>
        )
    }
}

export default withRouter(Signup);