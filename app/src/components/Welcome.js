import React from 'react';
import {withRouter} from 'react-router-dom';
import './Welcome.css';
import Header from './Header';

const Welcome = () => {
    return (
      <div className="welcome">
        {!localStorage.token ? 
          <Header />:
          <Header isAuthenticated={true}/>
        }
      </div>
    );
}

export default withRouter(Welcome);