import React from 'react';
import BookSearching from '../components/BookSearching';
import BookTable from '../components/BookTable';

const BookPage = () => {
    return (
        <div className="container">
            <BookSearching />
            <BookTable />
        </div>
    );
}

export default BookPage;
