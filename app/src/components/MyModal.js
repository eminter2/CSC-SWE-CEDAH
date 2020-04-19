import React from 'react';
import {Button, Modal} from 'react-bootstrap';
const MyModal = (props) => {
    return(
        <Modal
            show={props.show}
            onHide={props.onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                {props.success ? 'Success!' : 'Oops!'}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>{props.message}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}
export default MyModal;