import React, { useState, useEffect } from 'react';
import Border from './Border';
import { connect } from 'react-redux';
import { FaEdit, FaTrash } from 'react-icons/fa'
import { isEmpty } from 'lodash';
import CommentEditModal from './CommentEditModal';
import bookActions from '../actions/bookActions';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import NotificationModal from './NotificationModal';

const BookComment = (props) => {
    const [showDialog, setShowDialog] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [deletingCommentId, setDeletingCommentId] = useState('');
    const [isFirstRun, setFirstRun] = useState(true);

    const { bookReducer, authenticationReducer, getComment, addComment, deleteComment } = props

    const { book, addCommentResponse, deleteCommentResponse } = bookReducer;
    const { comments = [] } = book;

    const { isLogin, userData } = authenticationReducer;

    const onClickEdit = async (event, commentId) => {
        setShowDialog(true);
        getComment(commentId);
    }

    const onSubmitComment = (event) => {
        event.preventDefault();
        addComment({ book_id: book.id, title, content });
    }

    const onClickDelete = (event, commentId) => {
        setShowConfirm(true);
        setDeletingCommentId(commentId);
    }

    const handleDeleteComment = () => {
        deleteComment(deletingCommentId);
    }

    useEffect(() => {
        if (isFirstRun) {
            setFirstRun(false);
            return;
        }

        const { success } = addCommentResponse;
        if (success) {
            toast.success('Thêm bình luận thành công.');
            setTitle('');
            setContent('');
        }
    }, [addCommentResponse])

    useEffect(() => {
        if (isFirstRun) {
            setFirstRun(false);
            return;
        }

        const { success } = deleteCommentResponse;
        if (success) {
            toast.success('Xóa bình luận thành công.');
            setShowConfirm(false);
        }
    }, [deleteCommentResponse])

    const renderedComments = comments.map((comment, index) => {
        return (
            <div className="row" key={index}>
                <div className="col-sm-2">
                    {comment.userAvatar ?
                        <img
                            src={`/files/avatars/${comment.userAvatar}`}
                            className="img-fluid img-thumbnail"
                        />
                        :
                        <img
                            src="/files/avatars/anonymous_avatar.png"
                            className="img-fluid img-thumbnail"
                        />
                    }
                    <h5 className="text-center">{comment.username}</h5>
                </div>
                <div className="col-sm-10">
                    <div className="card">
                        <div className="card-header">
                            <span>{comment.title}</span>
                            <div className="float-right">
                                {
                                    userData && userData.id === comment.user_id &&
                                    <>
                                        <button
                                            className="btn btn-outline-secondary btn-sm"
                                            onClick={event => onClickEdit(event, comment.id)}
                                        >
                                            <FaEdit />
                                        </button>
                                        <button
                                            className="btn btn-outline-danger btn-sm"
                                            onClick={event => onClickDelete(event, comment.id)}
                                        >
                                            <FaTrash />
                                        </button>
                                    </>
                                }
                            </div>
                        </div>
                        <div className="card-body">{comment.content}</div>
                    </div>
                </div>
            </div>
        )
    })

    return (
        <>
            <Border>
                <div className="col-sm-12">
                    <h2>Bình luận</h2>
                </div>
                <div id="field_comment" className="col-sm-12">
                    {isEmpty(comments) ? (
                        <div className="row custom-comment no-one-comment">
                            <div className="col-12">
                                <h4 className="text-center no-one-comment">Hiện tại chưa có bình luận</h4>
                            </div>
                        </div>
                    ) : renderedComments}
                </div>
                <div className="col-sm-12 mt-3">
                    <div className="col-12">
                        {isLogin ?
                            <form onSubmit={event => onSubmitComment(event)}>
                                <fieldset className="form-group">
                                    <label htmlFor="field_title">Tiêu đề:</label>
                                    <input
                                        id="field_title"
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
                                    <label htmlFor="field_content">Nội dung:</label>
                                    <textarea
                                        className="form-control"
                                        rows="3"
                                        placeholder="Nhập Nội dung"
                                        id="field_content"
                                        name="content"
                                        required
                                        value={content}
                                        onChange={event => setContent(event.target.value)}
                                    ></textarea>
                                </fieldset>
                                <button type="submit" className="btn btn-primary float-right">Bình luận</button>
                            </form>
                            :
                            <h6>
                                Vui lòng <Link style={{ textDecoration: 'none' }} to="/login">đăng nhập</Link> để bình luận sách.
                            </h6>
                        }
                    </div>
                </div>
            </Border>
            <CommentEditModal
                show={showDialog}
                handleClose={() => setShowDialog(false)}
            />
            <NotificationModal
                show={showConfirm}
                handleClose={() => setShowConfirm(false)}
                title="Xác nhận xóa bình luận"
                content="Bạn có chắc chắn muốn xóa bình luận này?"
                handleConfirm={() => handleDeleteComment()}
            />
        </>
    );
}

const mapStateToProps = state => ({
    bookReducer: state.bookReducer,
    authenticationReducer: state.authenticationReducer
})

const mapDispatchToProps = dispatch => ({
    getComment: id => dispatch(bookActions.getComment(id)),
    addComment: data => dispatch(bookActions.addComment(data)),
    deleteComment: commentId => dispatch(bookActions.deleteComment(commentId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(BookComment);
