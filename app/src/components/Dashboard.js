 
import React, {useEffect, useState} from 'react';
import './Dashboard.css';
import Header from './Header';
import {withRouter} from 'react-router-dom';

const Dashboard = (props) => {

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        gatherData();
    }, [])

    const gatherData = async () => {
        // let {username, email} = await getUser()
        // setUsername(username)
        setLoading(true)
        // await getUserGroups(csrfToken, email)
        setTimeout(() => {
            setLoading(false)
        }, 3000);
    }

    return (
        <div className="dashboard">
            <Header isAuthenticated={true} />
            <h1>Welcome to the Dashboard!</h1>
            {loading ? <p style={{textAlign: 'center'}}>loading...</p> : <p style={{textAlign: 'center'}}>here's ur content ideot</p>}
        </div>
    )
}

export default withRouter(Dashboard);