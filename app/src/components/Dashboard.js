 
import React, {useEffect, useState} from 'react';
import './Dashboard.css';
import Header from './Header';
import {withRouter} from 'react-router-dom';

const Dashboard = (props) => {

    const [username, setUsername] = useState("")
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        gatherData();
    }, [])

    const gatherData = async () => {
        // let {username, email} = await getUser()
        // setUsername(username)
        // setLoading(true)
        // await getUserGroups(csrfToken, email)
        setTimeout(() => {
            setLoading(false)
        }, 3000);
    }

    const logout = () => {
        
      }

    return (
        <div className="dashboard">
            <Header condensed={true} logout={logout} isAuthenticated={true} />
            <h1>Welcome to your Dashboard, {username}!</h1>
            {loading ? <p style={{textAlign: 'center'}}>loading...</p> : <p style={{textAlign: 'center'}}>here's ur content ideot</p>}
        </div>
    )
}

export default withRouter(Dashboard);