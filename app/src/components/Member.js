import React from 'react';
import {Card} from 'react-bootstrap';

const Member = (props) => {
    return (
        <Card style={{marginBottom: 15}}>
            <Card.Header as="h5">
                <strong>Member: {props.member.name}</strong>
                <br/>
                <strong>Email: {props.member.email}</strong>
                <br/>
                <strong>Phone: {props.member.phone}</strong>
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