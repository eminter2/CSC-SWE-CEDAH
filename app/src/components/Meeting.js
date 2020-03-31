import React from 'react';
import {Card, Button} from 'react-bootstrap';

const Meeting = (props) => {

    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top"/>
            <Card.Body>
                <Card.Title>{props.meeting.Team}</Card.Title>
                <Card.Text>
                    Some quick example text to build on the card title and make up the bulk of
                    the card's content.<br/><br/>
                    Start: {props.meeting.Start}<br/>
                    End: {props.meeting.End}<br/>
                    Host: {props.meeting.Host}<br/>
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
            </Card.Body>
        </Card>
    )
}

export default Meeting;