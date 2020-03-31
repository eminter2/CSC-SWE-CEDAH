import React, {useEffect, useState} from 'react';
import './Dashboard.css';
import Header from './Header';
import Meeting from './Meeting';
import {withRouter} from 'react-router-dom';
import {Container} from 'react-bootstrap';

const Dashboard = () => {

    const [loading, setLoading] = useState(true)
    const [fakeMeetingList, setfakeMeetingList] = useState()

    useEffect(() => {
        createMeetings();
    },[])

    const createMeetings = () => {
        let tempArray=[]
        setLoading(true)
        let count = 9;
        while(count<18){
            tempArray.push({
                'MeetingNo': `Meeting ${count-8}`,
                'Start': `${count}:00`,
                'End': `${count}:30`,
                'Host': 'Connor'
            })
        count+=1;
        console.log(count)
        }
        setfakeMeetingList(tempArray)
        setLoading(false)
    }

    if(!loading){
        // console.log('fakeMeetingList', fakeMeetingList, 'Type: ', typeof(fakeMeetingList))
        const allMeetings = fakeMeetingList.map((meeting) => (<Meeting key={meeting.MeetingNo} meeting={meeting}/>))

        return (
            <div className="dashboard">
                <Header isAuthenticated={true} />
                <h1>Welcome to the Dashboard!</h1>
                <Container>
                    {allMeetings}
                </Container>
            </div>
        )
    }
    else{
        return (
            <p>Loading...</p>
        )
    }
}

export default withRouter(Dashboard);