import React, {useState} from 'react';
import {NavLink} from 'react-router-dom';
import {Button, ButtonGroup, Dropdown} from 'react-bootstrap';

const DashboardControl = () => {
    const [disabled, disable] = useState(true);
    return (
        <>
        <div 
            className="dashboard-nav"
            style={{
                    display: 'flex',
                    width: '80%',
                    paddingBottom: '10px',
                    margin: 'auto',
                    justifyContent: 'space-evenly',
                    borderBottom: '1px solid grey'}}>
            <div 
                className="filters"
                style={{
                    display: 'flex',
                    padding: '0 25% 0 0',
                    justifyContent: 'space-between',
                    width: '50%'
                }}>
                <Dropdown as={ButtonGroup}>
                    <Button variant="light">Sort By</Button>
                    <Dropdown.Toggle split variant="light" id="dropdown-split-basic" />
                    <Dropdown.Menu>
                        <Dropdown.Item>Group</Dropdown.Item>
                        <Dropdown.Item>Time</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>  
                <Button 
                    to="/group/add"
                    variant="primary"
                    onClick={() => disable(!disabled)}
                    disabled={disabled}>Groups</Button>    
                <Button 
                    to="/group/join"
                    variant="primary"
                    onClick={() => disable(!disabled)}
                    disabled={!disabled}>Meetings</Button>
            </div>
            <div 
                className="controls"
                style={{
                    display: 'flex',
                    padding: '0 0 0 34%',
                    width: '50%',
                    justifyContent: 'space-between',
                }}>
                <Button 
                    as={NavLink} 
                    to="/group/add"
                    variant="light">Add Group</Button>    
                <Button 
                    as={NavLink} 
                    to="/group/join"
                    variant="light">Join Group</Button>
            </div>
        </div>
        <br/>
        </>
    )
}

export default DashboardControl;