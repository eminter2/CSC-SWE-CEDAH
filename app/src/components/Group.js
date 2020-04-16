import React from 'react';
import {Button, Card} from 'react-bootstrap';

const Group = (props) => {
    return (
        <Card style={{marginBottom: 15}}>
            <Card.Header as="h5">Group {props.group.GroupNumber}</Card.Header>
            <Card.Body>
                <Card.Title>Group Name</Card.Title>
                <Card.Text>
                With supporting text below as a natural lead-in to additional content.
                <br/>Owner: {props.group.Owner}
                </Card.Text>
                <Button variant="primary">Open Group</Button>
            </Card.Body>
        </Card>
    )
}

export default Group;