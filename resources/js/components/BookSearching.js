import React from 'react';

const BookSearching = () => {
    return (
        <form>
            <div className="row">
                <div className="col-md-2">
                    <label className="col-form-label" htmlFor="searchField_name">Tên sách</label>
                </div>
                <div className="col-md-4">
                    <input
                        type="text"
                        className="form-control"
                        name="name"
                        id="searchField_name"
                    />
                </div>
                <div className="col-md-2">
                    <label className="col-form-label" htmlFor="searchField_author">Tác giả</label>
                </div>
                <div className="col-md-4">
                    <input
                        type="text"
                        className="form-control"
                        name="author"
                        id="searchField_author"
                    />
                </div>
            </div>
            <div className="row justify-content-center mt-2">
                <div className="col-4 d-flex justify-content-center">
                    <button className="btn btn-info" type="submit">Tìm kiếm</button>
                </div>
            </div>
        </form>
    );
}

export default BookSearching;
