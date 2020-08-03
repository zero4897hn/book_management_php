import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

const AuthenticationModal = (props) => {
    const [show, setShow] = useState(false)

    const { authenticationReducer } = props;
    const { tokenExpire } = authenticationReducer;

    const history = useHistory();

    useEffect(() => {
        if (tokenExpire && tokenExpire.show) {
            setShow(true);
        }
    }, [tokenExpire])

    const handleClose = () => {
        setShow(false);
        history.push('/login');
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Phiên đăng nhập hết hạn</Modal.Title>
            </Modal.Header>
            <Modal.Body>Phiên đăng nhập của bạn đã hết hạn.</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Đóng</Button>
            </Modal.Footer>
        </Modal>
    )
}

const mapStateToProps = state => ({
    authenticationReducer: state.authenticationReducer
})

export default connect(mapStateToProps)(AuthenticationModal);
