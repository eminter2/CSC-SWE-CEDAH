import React from 'react';
import {withRouter} from 'react-router-dom';

import Header from './Header';
import Userform from './Userform';

import './Signup.css';

const Signup = () => {

    return (
        <div className="page signup">
            <Header/>
            <h1>Sign up!</h1>
            <Userform signup={true}/>
        </div>
    )

}

export default withRouter(Signup);