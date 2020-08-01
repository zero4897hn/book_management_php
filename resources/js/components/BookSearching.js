import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import bookActions from '../actions/bookActions';

const BookSearching = (props) => {
    const [name, setName] = useState('');
    const [author, setAuthor] = useState('');

    const { bookReducer, setSearchValue, getBooks } = props;
    const { search } = bookReducer;

    useEffect(() => {
        setName(search.name);
        setAuthor(search.author);
    }, [search])

    const onSubmitSearchBook = event => {
        event.preventDefault();
        setSearchValue({ name, author });
        getBooks();
    }

    return (
        <form onSubmit={event => onSubmitSearchBook(event)}>
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
                        value={name}
                        onChange={event => setName(event.target.value)}
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
                        value={author}
                        onChange={event => setAuthor(event.target.value)}
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

const mapStateToProps = state => ({
    bookReducer: state.bookReducer
});

const mapDispatchToProps = dispatch => ({
    getBooks: () => dispatch(bookActions.getBooks()),
    setSearchValue: data => dispatch(bookActions.setSearchValue(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(BookSearching);
