import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const NotificationModal = (props) => {
    const {
        show = false,
        handleClose = () => {},
        handleConfirm = () => {},
        title = '',
        content = ''
    } = props


    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{content}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Đóng
                </Button>
                <Button variant="primary" onClick={handleConfirm}>
                    Xác nhận
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default NotificationModal;
