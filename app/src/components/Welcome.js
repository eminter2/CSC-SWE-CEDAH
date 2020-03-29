import React, {useState} from 'react';
import {Redirect, withRouter} from 'react-router-dom';
import './Welcome.css';
import Header from './Header';

const Welcome = () => {
  const [redirect, setRedirect] = useState(false);

  if(localStorage.token){
    return <Redirect push to='/dashboard'/>
  }

  function handleLogin(){
    setRedirect(true)
  }

  if(redirect){
    return <Redirect push to='/login'/>
  }
  else{
    return (
      <div className="welcome">
        <Header login={handleLogin}/>
      </div>
    );
  }
}

export default withRouter(Welcome);