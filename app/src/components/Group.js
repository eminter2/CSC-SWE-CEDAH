import React from 'react';
import {Button, Card} from 'react-bootstrap';
import {NavLink} from 'react-router-dom';

const Group = (props) => {
    console.log(props)
    return (
        <Card style={{marginBottom: 15}}>
            <Card.Header as="h5">
                <strong>Group</strong> {props.group.GroupNumber}<br/>
                <strong>Owner</strong> {props.group.Owner}
                </Card.Header>
            <Card.Body>
                <Card.Text>
                With supporting text below as a natural lead-in to additional content.
                </Card.Text>
                <Button 
                    as={NavLink}
                    to={`/group/view/${props.group.GroupNumber}`}
                    variant="primary" 
                    >
                        Open Group
                </Button>
            </Card.Body>
        </Card>
    )
}

export default Group;