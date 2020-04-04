import React from 'react';
import {withRouter} from 'react-router-dom';
import Userform from './Userform';

import './Signup.css';

const Signup = () => {

    return (
        <div className="page signup">
            <h1>Sign up!</h1>
            <Userform signup={true}/>
        </div>
    )

}

export default withRouter(Signup);