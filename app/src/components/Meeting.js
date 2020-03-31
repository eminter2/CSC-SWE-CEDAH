import React from 'react';
import {Card, Button} from 'react-bootstrap';
import icon from '../assets/business.svg';

const Meeting = (props) => {

    return (
        <Card 
            bg="primary" 
            text="light" 
            style={
                {
                    marginLeft: 'auto', 
                    marginRight: 'auto'
                }
            }>
            <Card.Header style={{background: 'white', color: 'black'}}>{props.meeting.MeetingNo}</Card.Header>
            <Card.Img variant="top" src={icon}/>
            <Card.Body>
                <Card.Title>{props.meeting.Team}</Card.Title>
                <Card.Text>
                    Some quick example text to build on the card title and make up the bulk of
                    the card's content.<br/><br/>
                    Host: {props.meeting.Host}
                    Start: {props.meeting.Start}<br/>
                    End: {props.meeting.End}<br/>
                </Card.Text>
                <Button variant="primary">Join Meeting</Button>
            </Card.Body>
        </Card>
    )
}

export default Meeting;