import React, { useState, useEffect } from 'react';
import BookForm from '../components/BookForm';
import { connect } from 'react-redux';
import bookActions from '../actions/bookActions';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';

const BookEditingPage = (props) => {
    const { getBookPromise, editBook, match } = props
    const { params } = match;

    const [book, setBook] = useState(undefined);
    const [errors, setErrors] = useState([]);
    const [isSaving, setSaving] = useState(false);

    const history = useHistory();

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        setSaving(true);
        try {
            const response = await getBookPromise(params.id);
            setBook(response.data);
        } catch (error) {
            console.log(error);
        } finally {
            setSaving(false);
        }
    }

    const handleSubmitForm = async (event, formData) => {
        try {
            setErrors([]);
            setSaving(true);
            const response = await editBook(params.id, formData);
            const book = response.data;
            history.push(`/detail-book/${book.id}`);
            toast.success('Cập nhật sách thành công.');
        } catch (error) {
            toast.warning('Cập nhật sách thất bại.');
            const errorFields = error && error.response && error.response.data && error.response.data.errors;
            setErrors(errorFields || []);
        } finally {
            setSaving(false);
        }
    }

    return (
        <div className="container">
            <BookForm entity={book} errors={errors} disabledSubmit={isSaving} handleSubmitForm={handleSubmitForm} />
        </div>
    );
}

const mapDispatchToProps = dispatch => ({
    getBookPromise: id => dispatch(bookActions.getBookPromise(id)),
    editBook: (id, formData) => dispatch(bookActions.editBook(id, formData))
})

export default connect(null, mapDispatchToProps)(BookEditingPage);
