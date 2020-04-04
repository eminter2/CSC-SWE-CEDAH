import React, { useState, useEffect } from 'react';
import {Redirect} from 'react-router-dom';
import {Spinner} from 'react-bootstrap';
import './Logout.css';


const Logout = () => {

    const [redirect, setRedirect] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            logoutAndReturnHome()
        }, 3500);
    })

    const logoutAndReturnHome = () => {
        localStorage.removeItem("token");
        setRedirect(true)
    }
    
    if(redirect) return <Redirect push to="/"/>
    else {
        return (
            <>
                <div className="page logout">
                    <div className="goodbye">
                        <h1>Come back soon!</h1>
                        <p>You are logged out.</p>
                        <Spinner animation="border" size="lg"/>
                    </div>
                </div>
            </>

        )
    }
}

export default Logout;