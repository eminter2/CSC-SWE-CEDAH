import React, {useEffect, useState} from 'react';
import './Dashboard.css';
import Meeting from './Meeting';
import {CardDeck, CardColumns} from 'react-bootstrap';

const Dashboard = (props) => {

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
        const allMeetings = fakeMeetingList.map((meeting) => (<Meeting key={meeting.MeetingNo} meeting={meeting}/>))

        return (
            <div className="page dashboard">
                <h1>Welcome to the Dashboard!</h1>
                <CardDeck style={{width: '80%', margin: 'auto'}}>
                    <CardColumns>
                        {allMeetings}
                    </CardColumns>
                </CardDeck>
            </div>
        )
    }
    else{
        return (
            <p>Loading...</p>
        )
    }
}

export default Dashboard;