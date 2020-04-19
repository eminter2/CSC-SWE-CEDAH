import React from 'react';
import {connect} from 'react-redux';
import {joinGroup} from '../redux/actions/groups'
import {Button} from 'react-bootstrap';

const JoinGroup = (props) => {
    const handleClick = () => {
        console.log('Add group props: ', props)
        props.joinGroup(props.userId, props.token)
    }
    return (
        <div className="page add-group">
            <h1 className="huskyhead">Join a Group</h1>
            <div className="form add-group"></div>
            <Button onClick={handleClick}>Submit</Button>
        </div>
    )
}

const mapStateToProps = state => ({
    userId: state.user.profile.id,
    token: state.user.token
})

const mapDispatchToProps = dispatch => ({
    joinGroup: (userId, token) => dispatch(joinGroup(userId, token))
})

export default connect(mapStateToProps, mapDispatchToProps)(JoinGroup);