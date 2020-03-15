import React, {useEffect, useState} from 'react';
import './Dashboard.css';
import Header from './Header';
import {instanceOf} from 'prop-types';
import {withCookies, Cookies} from 'react-cookie';
import getUser from '../api/User';
import getUserGroups from '../api/UserGroups';

const Dashboard = (props) => {
    let {cookies} = props;
    let csrfToken = cookies.get('XSRF-TOKEN');
    const [username, setUsername] = useState("")
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        gatherData();
    }, [])

    const gatherData = async () => {
        let {username, email} = await getUser()
        setUsername(username)
        setLoading(true)
        await getUserGroups(csrfToken, email)
        setTimeout(() => {
            setLoading(false)
        }, 3000);
    }

    return (
        <div className="dashboard">
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