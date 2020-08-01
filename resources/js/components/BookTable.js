import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { FaSort, FaSortDown, FaSortUp } from 'react-icons/fa';
import { SORT_ASC, SORT_DESC } from '../utils/constants';
import bookActions from '../actions/bookActions';

const BookTable = (props) => {
    const { bookReducer, setSort, getBooks } = props;
    const { books, page, pageSize, sort } = bookReducer;

    const [sortField, setSortField] = useState('');
    const [sortType, setSortType] = useState('');

    useEffect(() => {
        const sortData = sort.split(',');
        setSortField(sortData[0]);
        setSortType(sortData[1] ? sortData[1] : '');
    }, [sort])

    const sortBook = (field, type) => {
        setSort(`${field},${type}`);
        getBooks();
    }

    const renderedBooks = books.map((book, index) => {
        return (
            <tr key={book.id}>
                <th scope="row">{(page - 1) * pageSize + index + 1}</th>
                <td><img className="img-fluid" src={`/files/covers/${book.cover}`} /></td>
                <td><Link to={`/detail-book/${book.id}`}>{book.name}</Link></td>
                <td>{book.author}</td>
                <td>{book.username}</td>
                <td>{book.comment_count}</td>
                <td>{book.rating}</td>
            </tr>
        );
    });

    return (
        <div className="row mt-3">
            <div className="col-12">
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th scope="col" style={{ width: '5%' }}>#</th>
                            <th scope="col" style={{ width: '10%' }}>Bìa sách</th>
                            <th scope="col" style={{ width: '30%' }}>Tên sách</th>
                            <th scope="col" style={{ width: '18%' }}>Tác giả</th>
                            <th scope="col" style={{ width: '10%' }}>Người đăng</th>
                            <th scope="col" style={{ width: '15%' }}>
                                <span>Lượt bình luận</span>
                                {
                                    sortField !== 'comment_count' ? (
                                        <button
                                            className="btn btn-sm btn-outline-secondary"
                                            onClick={() => sortBook('comment_count', SORT_ASC)}
                                        >
                                            <FaSort />
                                        </button>
                                    )
                                        : sortType === SORT_DESC ? (
                                            <button
                                                className="btn btn-sm btn-outline-secondary"
                                                onClick={() => sortBook('comment_count', SORT_ASC)}
                                            >
                                                <FaSortDown />
                                            </button>
                                        )
                                            : (
                                                <button
                                                    className="btn btn-sm btn-outline-secondary"
                                                    onClick={() => sortBook('comment_count', SORT_DESC)}
                                                >
                                                    <FaSortUp />
                                                </button>
                                            )
                                }
                            </th>
                            <th scope="col" style={{ width: '12%' }}>
                                <span>Đánh giá</span>
                                {
                                    sortField !== 'rating' ? (
                                        <button
                                            className="btn btn-sm btn-outline-secondary"
                                            onClick={() => sortBook('rating', SORT_ASC)}
                                        >
                                            <FaSort />
                                        </button>
                                    )
                                        : sortType === SORT_DESC ? (
                                            <button
                                                className="btn btn-sm btn-outline-secondary"
                                                onClick={() => sortBook('rating', SORT_ASC)}
                                            >
                                                <FaSortDown />
                                            </button>
                                        )
                                            : (
                                                <button
                                                    className="btn btn-sm btn-outline-secondary"
                                                    onClick={() => sortBook('rating', SORT_DESC)}
                                                >
                                                    <FaSortUp />
                                                </button>
                                            )
                                }
                            </th>
                        </tr>
                    </thead>
                    <tbody>{renderedBooks}</tbody>
                </table>
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    bookReducer: state.bookReducer,
});

const mapDispatchToProps = dispatch => ({
    getBooks: () => dispatch(bookActions.getBooks()),
    setSort: data => dispatch(bookActions.setSort(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(BookTable);
