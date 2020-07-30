import React, { useEffect } from 'react';
import BookSearching from '../components/BookSearching';
import BookTable from '../components/BookTable';
import { connect } from 'react-redux';
import bookActions from '../actions/bookActions';

const BookPage = (props) => {
    const { getBooks, bookReducer } = props;
    const { books, page, pageSize, totalRecord } = bookReducer;

    useEffect(() => {
        getBooks();
    }, []);

    return (
        <div className="container">
            <BookSearching />
            <BookTable data={books} page={page} pageSize={pageSize} />
        </div>
    );
}

const mapStateToProps = state => ({
    bookReducer: state.bookReducer,
});

const mapDispatchToProps = dispatch => ({
    getBooks: () => dispatch(bookActions.getBooks()),
})

export default connect(mapStateToProps, mapDispatchToProps)(BookPage);
