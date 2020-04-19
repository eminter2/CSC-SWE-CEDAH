import React from 'react';
import Calendar from '../components/Calendar';
import {Col, Nav, Row, Tab} from 'react-bootstrap';
import { useParams } from 'react-router-dom';

const Groupviewer = () => {
    let groupName = useParams().id
    return (
        <div className="page group-viewer">
            <h1 className="slimshady">{groupName}</h1>
            <Tab.Container defaultActiveKey="first" >
                <Row
                    style={{
                        minHeight: '80vh',
                        width: '95%',
                        margin: 'auto',
                        padding: '20px 5px',
                        boxShadow: '0px 0px 5px lightgrey'
                    }}>
                    <Col 
                        sm={3} 
                        style={{
                            borderRight: '1px solid lightgrey',
                            paddingTop: '15px',
                            paddingBottom: '15px'
                        }}>
                        <Nav variant="pills" className="flex-column">
                            <Nav.Item >
                                <Nav.Link eventKey="first">About</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="second">Members</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="third">Calendar</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col sm={9}>
                        <Tab.Content style={{padding: '15px'}}>
                            <Tab.Pane eventKey="first">
                                {'Something 1'}
                            </Tab.Pane>
                            <Tab.Pane eventKey="second">
                                {'Something 2'}
                            </Tab.Pane>
                            <Tab.Pane eventKey="third">
                                <Calendar/>
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </div>
    )
}

export default Groupviewer;