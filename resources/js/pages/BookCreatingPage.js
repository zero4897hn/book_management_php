import React, { useState } from 'react';
import BookForm from '../components/BookForm';
import { connect } from 'react-redux';
import bookActions from '../actions/bookActions';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

const BookFormPage = (props) => {
    const { addBook } = props;

    const [errors, setErrors] = useState([]);

    const history = useHistory();

    const handleSubmitForm = async (event, formData) => {
        try {
            setErrors([]);
            const response = await addBook(formData);
            const book = response.data;
            history.push(`/detail-book/${book.id}`);
            toast.success('Thêm mới sách thành công.');
        } catch (error) {
            toast.warning('Thêm mới sách thất bại.');
            const errorFields = error && error.response && error.response.data && error.response.data.errors;
            setErrors(errorFields || []);
        }
    }

    return (
        <div className="container">
            <BookForm handleSubmitForm={handleSubmitForm} errors={errors} />
        </div>
    );
}

const mapDispatchToProps = dispatch => ({
    addBook: formData => dispatch(bookActions.addBook(formData))
})

export default connect(null, mapDispatchToProps)(BookFormPage);
