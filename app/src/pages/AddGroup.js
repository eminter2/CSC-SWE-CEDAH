import React from 'react';
import {connect} from 'react-redux';
import {addGroup} from '../redux/actions/groups'
import {Button} from 'react-bootstrap';

const AddGroup = (props) => {
    const handleClick = () => {
        console.log('Add group props: ', props)
        props.addGroup(props.userId, props.token)
    }
    return (
        <div className="page add-group">
            <h1 className="huskyhead">Add a Group</h1>
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
    addGroup: (userId, token) => dispatch(addGroup(userId, token))
})

export default connect(mapStateToProps, mapDispatchToProps)(AddGroup);