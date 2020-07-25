import React from 'react';

const Table = (props) => {
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
                    <tbody>
                        <tr>
                            <th scope="row"></th>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Table;
