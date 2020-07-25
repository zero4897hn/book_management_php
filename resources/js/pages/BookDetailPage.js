import React from 'react';
import BookDetail from '../components/BookDetail';
import BookRate from '../components/BookRate';
import BookComment from '../components/BookComment';

const BookDetailPage = () => {
    return (
        <div className="container">
            <BookDetail />
            <BookRate />
            <BookComment />
        </div>
    );
}

export default BookDetailPage;
