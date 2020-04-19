import React from 'react';
import {Card} from 'react-bootstrap';

const Member = (props) => {
    return (
        <Card style={{marginBottom: 15}}>
            <Card.Header as="h5">
                {/* <strong>{props.member.fullName}</strong><br/> */}
                <strong>Barack Obama</strong><br/>
                <p>Email: {props.member.email}</p>
                <p>Phone: {props.member.phone}</p>
                </Card.Header>
            <Card.Body>
                <Card.Text>
                With supporting text below as a natural lead-in to additional content.
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Member;