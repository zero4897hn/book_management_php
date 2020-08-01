import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import bookActions from '../actions/bookActions';

const CommentEditModal = (props) => {
    const {
        show = false,
        handleClose = () => {},
        bookReducer,
        editComment
    } = props;
    const { comment, editCommentResponse } = bookReducer;

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const { success } = editCommentResponse;
        if (success) {
            toast.success('Cập nhật bình luận thành công.');
            onClickClose();
        }
    }, [editCommentResponse])

    useEffect(() => {
        if (comment) {
            setTitle(comment.title);
            setContent(comment.content);
            setIsEditing(false);
        } else {
            setIsEditing(true);
        }
    }, [comment])

    const onClickEdit = (event) => {
        event.preventDefault();
        editComment({
            ...comment,
            title,
            content
        });
    }

    const onClickClose = () => {
        setTitle('');
        setContent('');
        handleClose();
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <form onSubmit={event => onClickEdit(event)}>
                <Modal.Header closeButton>
                    <Modal.Title>Sửa bình luận</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <fieldset className="form-group">
                        <label htmlFor="editField_title">Tiêu đề:</label>
                        <input
                            id="editField_title"
                            type="text"
                            className="form-control"
                            placeholder="Nhập tiêu đề"
                            name="title"
                            required
                            value={title}
                            onChange={event => setTitle(event.target.value)}
                        />
                    </fieldset>
                    <fieldset className="form-group">
                        <label htmlFor="editField_content">Nội dung:</label>
                        <textarea
                            className="form-control"
                            rows="3"
                            placeholder="Nhập Nội dung"
                            id="editField_content"
                            name="content"
                            required
                            value={content}
                            onChange={event => setContent(event.target.value)}
                        ></textarea>
                    </fieldset>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={event => onClickClose(event)}>Đóng</Button>
                    <Button type="submit" variant="primary" disabled={isEditing}>Sửa</Button>
                </Modal.Footer>
            </form>
        </Modal>
    )
}

const mapStateToProps = state => ({
    bookReducer: state.bookReducer,
})

const mapDispatchToProps = dispatch => ({
    editComment: data => dispatch(bookActions.editComment(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(CommentEditModal);
