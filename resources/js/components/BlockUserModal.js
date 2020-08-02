import React from 'react';
import { Modal, Button, FormGroup, FormLabel } from 'react-bootstrap';

const BlockUserModal = props => {
    const {
        show = false,
        handleClose = () => {},
        handleConfirm = () => {},
        banExpiredAt,
        setBanExpiredAt,
    } = props

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Xác nhận khóa tài khoản</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FormGroup>
                    <FormLabel htmlFor="field_ban_expired_at">Ngày mở khóa:</FormLabel>
                    <input
                        id="field_ban_expired_at"
                        type="date"
                        className="form-control"
                        placeholder="Nhập ngày mở khóa"
                        name="ban_expired_at"
                        value={banExpiredAt}
                        onChange={event => setBanExpiredAt(event.target.value)}
                    />
                    <small>Nếu để trống và xác nhận khóa, tài khoản sẽ khóa vĩnh viễn đến khi mở</small>
                </FormGroup>
            </Modal.Body>
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

export default BlockUserModal;
