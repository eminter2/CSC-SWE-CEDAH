import React, {useEffect, useState} from 'react';
import Header from './Header';
import {instanceOf} from 'prop-types';
import {withCookies, Cookies} from 'react-cookie';

const Dashboard = (props) => {
    let {cookies} = props;
    let csrfToken = cookies.get('XSRF-TOKEN');
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        console.log(cookies)
        getUser();
        getUserGroups();
    }, [])
    
    const getUser = async () => {
        try{ 
            console.log('Getting user...')
            const response = await fetch('/api/user', {credentials: 'include'});
            const body = await response.text();
            console.log('Retrieved user: ', JSON.parse(body)["given_name"],
            '\nEmail: ', JSON.parse(body)["email"])
            setUsername(JSON.parse(body)["given_name"])
            setEmail(JSON.parse(body)["email"])
        }
        catch {
            console.log("Something went wrong. Session Expired")
        }
    }

    const getUserGroups = async () => {
        try{
            setLoading(true)
            console.log('Attempting to retrieve groups')
            const response = await fetch('/api/meetings', {method: 'POST', credentials: 'include',
                headers: {'X-XSRF-TOKEN': csrfToken},
                body: JSON.stringify(email)
            });
            const body = await response.text();
            console.log(body)
            setLoading(false)
        }
        catch(err){
            console.log('Something went wrong: ', err);
        }
    }

    return (
        <div>
            <Header condensed={true} />
            <h1>Welcome to your Dashboard, {username}!</h1>
            {loading ? <p style={{textAlign: 'center'}}>loading...</p> : <p style={{textAlign: 'center'}}>here's ur content ideot</p>}
        </div>
    )
}

Dashboard.propTypes = {
    cookies: instanceOf(Cookies).isRequired
}

export default withCookies(Dashboard);