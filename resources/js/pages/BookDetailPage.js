import React, { useEffect, useState } from 'react';
import BookDetail from '../components/BookDetail';
import BookRate from '../components/BookRate';
import BookComment from '../components/BookComment';
import { connect } from 'react-redux';
import bookActions from '../actions/bookActions';

const BookDetailPage = (props) => {
    const [book, setBook] = useState({});

    const { getBook } = props;

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        try {
            const params = props.match.params;
            const response = await getBook(params.id);
            setBook(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="container">
            <BookDetail book={book} />
            <BookRate book={book} />
            <BookComment book={book} />
        </div>
    );
}

const mapDispatchToProps = dispatch => ({
    getBook: id => dispatch(bookActions.getBook(id))
});

export default connect(null, mapDispatchToProps)(BookDetailPage);
