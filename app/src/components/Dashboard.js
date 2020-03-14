import React, {useEffect, useState} from 'react';
import Header from './Header';
import {instanceOf} from 'prop-types';
import {withCookies, Cookies} from 'react-cookie';

const Dashboard = (props) => {
    const {cookies} = props;
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getUser();
        getUserGroups();
    }, [])
    
    const getUser = async () => {
        try{ 
            const response = await fetch('/api/user', {credentials: 'include'});
            const body = await response.text();
            console.log('Call body: ', body)
            console.log(JSON.parse(body)["given_name"])
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
            const response = await fetch('/api/meetings', {credentials: 'include'});
            const body = await response.text();
            console.log('Call body: ', body)
        }
        catch {
            console.log('Something went wrong');
        }
    }

    return (
        <div>
            <Header condensed={true} />
            <h1>Welcome to your Dashboard, {username}!</h1>
        </div>
    )
}

Dashboard.propTypes = {
    cookies: instanceOf(Cookies).isRequired
}

export default withCookies(Dashboard);