import React, { useEffect, useState } from 'react';
import BookDetail from '../components/BookDetail';
import BookRate from '../components/BookRate';
import BookComment from '../components/BookComment';
import { connect } from 'react-redux';
import bookActions from '../actions/bookActions';

const BookDetailPage = (props) => {
    const { getBook } = props;

    useEffect(() => {
        const params = props.match.params;
        getBook(params.id)
    }, [])

    return (
        <div className="container">
            <BookDetail />
            <BookRate />
            <BookComment />
        </div>
    );
}

const mapDispatchToProps = dispatch => ({
    getBook: id => dispatch(bookActions.getBook(id))
});

export default connect(null, mapDispatchToProps)(BookDetailPage);
