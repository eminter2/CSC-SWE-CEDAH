import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {getUserInfo} from '../redux/actions/actions';
import Meeting from './Meeting';
import {CardDeck, CardColumns} from 'react-bootstrap';

const Dashboard = (props) => {

    const [loading, setLoading] = useState(true)
    const [fakeMeetingList, setfakeMeetingList] = useState()

    useEffect(() => {
        createMeetings();
    },[])

    const createMeetings = () => {
        let username = "connor"
        let token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJjb25ub3IiLCJleHAiOjE1ODcwOTQ5NDZ9.hsXHXza9ZI3maHieUsIzCNFniK7jlwBJk9H6wMy5FTDDXnP1vJt3hOe0i-0xv0FDeAuqcVv7zyedrq_xm7Q48A"
        props.getUserInfo(username, token)
        setLoading(false)
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
        // console.log(count)
        }
        setfakeMeetingList(tempArray)
        setLoading(false)

    }

    if(!loading){
        const allMeetings = fakeMeetingList.map((meeting) => (<Meeting key={meeting.MeetingNo} meeting={meeting}/>))

        return (
            <div className="page dashboard">
                <h1>Welcome to the Dashboard, {props.currentUser}!</h1>
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

const mapStateToProps = state => ({
    currentUser: state.reducer.currentUser
})

const mapDispatchToProps = dispatch => ({
    getUserInfo : (username, token) => dispatch(getUserInfo(username, token))
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);