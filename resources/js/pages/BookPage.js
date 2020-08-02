import React, { useEffect } from 'react';
import BookSearching from '../components/BookSearching';
import BookTable from '../components/BookTable';
import { connect } from 'react-redux';
import bookActions from '../actions/bookActions';
import DataPagination from '../components/DataPagination';

const BookPage = (props) => {
    const { getBooks, bookReducer, setPage } = props;
    const { page, pageSize, totalRecord } = bookReducer;

    useEffect(() => {
        getBooks();
    }, []);

    const onChangePage = (event, index) => {
        setPage(index);
        getBooks();
    }

    return (
        <div className="container">
            <BookSearching />
            <BookTable />
            <DataPagination page={page} pageSize={pageSize} totalRecord={totalRecord} onChangePage={onChangePage} />
        </div>
    );
}

const mapStateToProps = state => ({
    bookReducer: state.bookReducer,
});

const mapDispatchToProps = dispatch => ({
    getBooks: () => dispatch(bookActions.getBooks()),
    setPage: page => dispatch(bookActions.setPage(page))
})

export default connect(mapStateToProps, mapDispatchToProps)(BookPage);
