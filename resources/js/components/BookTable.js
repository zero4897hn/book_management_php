import React from 'react';
import { Link } from 'react-router-dom';

const BookTable = (props) => {
    const { data = [], page = 1, pageSize = 0 } = props;

    const renderedBooks = data.map((book, index) => {
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
                            <th scope="col" style={{width: '5%'}}>#</th>
                            <th scope="col" style={{width: '10%'}}>Bìa sách</th>
                            <th scope="col" style={{width: '30%'}}>Tên sách</th>
                            <th scope="col" style={{width: '18%'}}>Tác giả</th>
                            <th scope="col" style={{width: '10%'}}>Người đăng</th>
                            <th scope="col" style={{width: '15%'}}>
                                <span>Lượt bình luận</span>
                                <button className="btn btn-sm btn-outline-secondary button-sort-book">
                                    <i className="fas fa-sort-down"></i>
                                    <i className="fas fa-sort-up"></i>
                                    <i className="fas fa-sort"></i>
                                </button>
                            </th>
                            <th scope="col" style={{width: '12%'}}>
                                <span>Đánh giá</span>
                                <button className="btn btn-sm btn-outline-secondary button-sort-book">
                                    <i className="fas fa-sort-down"></i>
                                    <i className="fas fa-sort-up"></i>
                                    <i className="fas fa-sort"></i>
                                </button>
                            </th>
                        </tr>
                    </thead>
                    <tbody>{renderedBooks}</tbody>
                </table>
            </div>
        </div>
    );
}

export default BookTable;
