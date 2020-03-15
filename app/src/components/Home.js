import React, {useState, useEffect} from 'react';
import {Button} from 'react-bootstrap';
import './Home.css';
import Header from './Header';
import {withCookies} from 'react-cookie';


function Home(props) {
  const [isAuthenticated, setisAuthenticated] = useState(false);
  let {cookies} = props;
  let csrfToken = cookies.get('XSRF-TOKEN');

  useEffect(() => {
    console.log('Checking to see if you are familiar... 👀')
    fetchUser()
  })

  const fetchUser = async () => {
    const response = await fetch('/api/user', {credentials: 'include'});
    const body = await response.text();
    if (body === '') {
      console.log('Cookie NOT found. Get out of mah swamp')
      setisAuthenticated(false)
    }
    else {
      await pushToDashboard()
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    login()
  }

  const login = () => {
    let port = (window.location.port ? ':' + window.location.port : '');
      if (port === ':3000'){
        port = ':8080';
      }
      window.location.href = '//' + window.location.hostname + port + '/dashboard';
  }

  const pushToDashboard = () => {
      props.history.push(`/dashboard`)
  }

  if(!isAuthenticated){
    return (
      <div className="Home">
        <Header login={login} isAuthenticated={isAuthenticated}/>
        <section className="pane-1">
          <div className="hook-em">
            <h1>Meet-UP</h1>
            <p>Insert company slogan --something</p>
          </div>
          <div className="try-now">
            <Button 
              variant="outline-primary" 
              type="submit" 
              size="lg"
              onClick={handleSubmit}>
              Try it Now!
            </Button>   
          </div>
        </section>
      </div>
    );
  }
  else {
    return(
      null
    );
  }

  
}

export default withCookies(Home);