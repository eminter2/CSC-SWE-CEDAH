import React, {useState} from 'react';
import {connect} from 'react-redux';
import {joinGroup} from '../redux/actions/groups'
import {Form, Button} from 'react-bootstrap';

const JoinGroup = (props) => {
    const [groupName, setName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault()
        props.joinGroup(props.userId, props.token, groupName)
    }
    return (
        <div className="page add-group">
            <h1 className="huskyhead">Join a Group</h1>
            <div className="form add-group">
                <Form 
                    style={{
                        width: '30%',
                        maxWidth: 500,
                        minWidth: 250
                    }}
                    onSubmit={e => handleSubmit(e)} >
                    <Form.Group controlId="formgroupName">
                        <Form.Label>Group Name</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Group Name"
                            onChange={e => setName(e.target.value)} />
                    </Form.Group>
                    <Button type="submit">Join</Button>
                </Form> 
            </div>           
        </div>
    )
}

const mapStateToProps = state => ({
    userId: state.user.profile.id,
    token: state.user.token
})

const mapDispatchToProps = dispatch => ({
    joinGroup: (userId, token, groupName) => dispatch(joinGroup(userId, token, groupName))
})

export default connect(mapStateToProps, mapDispatchToProps)(JoinGroup);