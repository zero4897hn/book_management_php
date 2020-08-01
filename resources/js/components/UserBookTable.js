import React from 'react';

const UserBookTable = (props) => {
    return (
        <table className="table">
            <thead className="thead-light">
                <tr>
                    <th scope="col" style="width: 5%">#</th>
                    <th scope="col" style="width: 10%">Bìa sách</th>
                    <th scope="col" style="width: 35%">Tên sách</th>
                    <th scope="col" style="width: 20%">Tác giả</th>
                    <th scope="col" style="width: 20%"></th>
                    <th scope="col" style="width: 10%"></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="row"></th>
                    <td><img className="img-fluid" src="{{ asset('files/covers/' . $book->cover) }}" /></td>
                    <td><a href="/books/{{ $book->id }}"></a></td>
                    <td></td>
                    <td>
                        <span>Lượt bình luận: </span> <br />
                        <span>Đánh giá: </span> <br />
                    </td>
                    <td>
                        <a className="btn btn-primary btn-sm" href="/books/{{$book->id}}/edit">
                            <i className="far fa-edit"></i>
                        </a>
                        <button
                            className="btn btn-danger btn-sm"
                            data-id="{{$book->id}}"
                            data-toggle="modal"
                            data-target="#confirm-delete-book-modal"
                        >
                            <i className="far fa-trash-alt"></i>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    )
}

export default UserBookTable;
