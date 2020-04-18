import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {getUserInfo} from '../redux/actions/user';
import Meeting from '../components/Meeting';
import Group from '../components/Group';
import {CardDeck, CardColumns} from 'react-bootstrap';
import DashboardControl from '../components/DashboardControl';

const Dashboard = (props) => {

    const [loading, setLoading] = useState(true)
    const [fakeMeetingList, setfakeMeetingList] = useState()
    const [fakeGroupList, setfakeGroupList] = useState()
    const [showGroups, toggleShowGroups] = useState(true)

    useEffect(() => {
        generateData();
    },[])

    const generateData = () => {
        props.getUserInfo(props.currentUser, props.token)
        setLoading(false)
        let tempArrayMeeting=[]
        let tempArrayGroup=[]
        setLoading(true)
        let count = 9;
        while(count<18){
            tempArrayMeeting.push({
                'MeetingNo': `Meeting ${count-8}`,
                'Start': `${count}:00`,
                'End': `${count}:30`,
                'Host': 'Connor'
            })
            if(count<13){
                tempArrayGroup.push({
                    'GroupNumber': `${count-8}`,
                    'Owner': 'Connor'
                })
            }
        count+=1;
        }
        setfakeMeetingList(tempArrayMeeting)
        setfakeGroupList(tempArrayGroup)
        setLoading(false)
    }

    if(!loading){

        const allMeetings = fakeMeetingList.map((meeting) => (
                <Meeting 
                    key={meeting.MeetingNo} 
                    meeting={meeting}/>)
                )
        const allGroups = fakeGroupList.map((group) => (
                <Group 
                    key={group.GroupNumber} 
                    group={group}/>)
                )

        return (
            <div className="page dashboard">
                <h1>Welcome to the Dashboard, {props.currentUser}!</h1>
                <DashboardControl toggle={toggleShowGroups}/>
                    { 
                        showGroups ? 
                        <div style={{width: '80%', margin: 'auto'}}>{allGroups}</div>                        // </CardColumns>
                        :
                        <CardDeck style={{width: '80%', margin: 'auto'}}>
                            <CardColumns>
                                {allMeetings}
                            </CardColumns>
                        </CardDeck>
                    }
            </div>
        )
    }
    else{
        return (
            <p>Loading...</p>
        )
    }
}

const mapStateToProps = state => (console.log(`Dashboard state: ${Object.keys(state.reducer)}`), {
    currentUser: state.reducer.currentUser,
    token: state.reducer.token
})

const mapDispatchToProps = dispatch => ({
    getUserInfo : (username, token) => dispatch(getUserInfo(username, token))
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);