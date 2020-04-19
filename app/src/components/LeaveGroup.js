import React, {useState} from 'react';
import { Button, Form, Spinner } from 'react-bootstrap';
import { connect } from 'react-redux';
import {leaveGroup} from '../redux/actions/groups';
import {Redirect} from 'react-router-dom';

const LeaveGroup = (props) => {
    const [name, setName] = useState('')
    const [err, setErr] = useState('')
    const [loading, setLoading] = useState(false)
    const [redirect, setRedirect] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        if(name.localeCompare(props.groupName) === 0){
            //leave group
            setLoading(true)
            console.log('leaving group')
            console.log(`leaving ${props.groupName} as user ${props.userId} with token ${props.token}`)
            leaveGroup(props.groupId, props.userId, props.token)
            setTimeout(() => {
                setRedirect(true)
                setLoading(false)
            }, 3000);
        }
        else{
            setErr('Name must match exactly to confirm your leave.')
            setTimeout(() => {
                setErr('')
            }, 3000); 
        }
    }

    if(redirect) return <Redirect push to="/dashboard"/>
    else {
        return (
            <>
                <div className="leave-confirm">
                <h1>Leave Group</h1>
                <p>Are you sure?</p>
                    <Form 
                        style={{
                            maxWidth: 500,
                            minWidth: 250
                        }}
                        onSubmit={e => handleSubmit(e)}>
                        <Form.Group controlId="formgroupName">
                            <p style={{color: 'red'}}>{err}</p>
                            <Form.Label>Please type the name of the group exactly to leave</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Group Name"
                                onChange={e => setName(e.target.value)} />
                        </Form.Group>
                        {loading ?
                            <Button 
                                variant="danger" 
                                type="submit"
                                style={{display: 'block', margin: 'auto'}}> 
                                <Spinner
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                        />
                                {' '}Processing...
                                <span className="sr-only">Processing...</span>
                            </Button>
                            :
                            <Button 
                                variant="danger" 
                                type="submit"
                                style={{display: 'block', margin: 'auto'}}>Leave Group</Button>
                        }            
                    </Form>  
                </div>
            </>
        )
    }
}

const mapStateToProps = state => ({
    userId : state.user.profile.id,
    token: state.user.token
})

const mapDispatchToProps = dispatch => ({
    leaveGroup: (groupId, userId, token) => dispatch(leaveGroup(groupId, userId, token))
})

export default connect(mapStateToProps, mapDispatchToProps)(LeaveGroup);