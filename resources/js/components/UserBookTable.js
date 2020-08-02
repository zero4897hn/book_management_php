import React, { useEffect, useState } from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import NotificationModal from './NotificationModal';
import userActions from '../actions/userActions';

const UserBookTable = (props) => {
    const [showConfirm, setShowConfirm] = useState(false);
    const [deletingBookId, setDeletingBookId] = useState(null);
    const [isFirstRun, setFirstRun] = useState(true);

    const { userReducer, deleteUserBook } = props;
    const { user, deleteUserBookResponse } = userReducer;
    const { books } = user;

    useEffect(() => {
        if (isFirstRun) {
            setFirstRun(false);
            return;
        }

        const { success } = deleteUserBookResponse;
        if (success) {
            toast.success('Xóa thành công.')
            setShowConfirm(false);
        }
    }, [deleteUserBookResponse])

    const onClickDeleteBook = (event, bookId) => {
        setDeletingBookId(bookId);
        setShowConfirm(true);
    }

    const handleDeleteBook = () => {
        deleteUserBook(deletingBookId);
    }

    const renderedBooks = books && books.map((book, index) => {
        return (
            <tr key={book.id}>
                <th scope="row">{index + 1}</th>
                <td><img className="img-fluid" src={`/files/covers/${book.cover}`} /></td>
                <td><Link to={`/detail-book/${book.id}`}>{book.name}</Link></td>
                <td>{book.author}</td>
                <td>
                    <span>Lượt bình luận: {book.comment_count}</span> <br />
                    <span>Đánh giá: {book.rating}</span> <br />
                </td>
                <td>
                    <Link className="btn btn-primary btn-sm" to={`/edit-book/${book.id}`}>
                        <FaEdit />
                    </Link>
                    <button
                        className="btn btn-danger btn-sm"
                        onClick={event => onClickDeleteBook(event, book.id)}
                    >
                        <FaTrash />
                    </button>
                </td>
            </tr>
        )
    })

    return (
        <>
            <table className="table">
                <thead className="thead-light">
                    <tr>
                        <th scope="col" style={{ width: '5%' }}>#</th>
                        <th scope="col" style={{ width: '10%' }}>Bìa sách</th>
                        <th scope="col" style={{ width: '35%' }}>Tên sách</th>
                        <th scope="col" style={{ width: '20%' }}>Tác giả</th>
                        <th scope="col" style={{ width: '20%' }}></th>
                        <th scope="col" style={{ width: '10%' }}></th>
                    </tr>
                </thead>
                <tbody>{renderedBooks}</tbody>
            </table>
            <NotificationModal
                show={showConfirm}
                handleClose={() => setShowConfirm(false)}
                title="Xác nhận xóa sách"
                content="Bạn có chắc chắn muốn xóa sách này?"
                handleConfirm={() => handleDeleteBook()}
            />
        </>
    )
}

const mapStateToProps = state => ({
    userReducer: state.userReducer
});

const mapDispatchToProps = dispatch => ({
    deleteUserBook: bookId => dispatch(userActions.deleteUserBook(bookId))
})

export default connect(mapStateToProps, mapDispatchToProps)(UserBookTable);
