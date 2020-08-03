import React, { useState } from 'react';
import BookForm from '../components/BookForm';
import { connect } from 'react-redux';
import bookActions from '../actions/bookActions';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import LoginRequireNotification from '../components/LoginRequireNotification';

const BookFormPage = (props) => {
    const { addBook, authenticationReducer } = props;
    const { isLogin } = authenticationReducer;

    const [errors, setErrors] = useState([]);
    const [isSaving, setSaving] = useState(false);

    const history = useHistory();

    const handleSubmitForm = async (event, formData) => {
        try {
            setErrors([]);
            setSaving(true);
            const response = await addBook(formData);
            const book = response.data;
            history.push(`/detail-book/${book.id}`);
            toast.success('Thêm mới sách thành công.');
        } catch (error) {
            toast.warning('Thêm mới sách thất bại.');
            const errorFields = error && error.response && error.response.data && error.response.data.errors;
            setErrors(errorFields || []);
        } finally {
            setSaving(false);
        }
    }

    return (
        <div className="container">
            {isLogin ?
                <BookForm handleSubmitForm={handleSubmitForm} errors={errors} disabledSubmit={isSaving} />
                :
                <LoginRequireNotification />
            }
        </div>
    );
}

const mapStateToProps = state => ({
    authenticationReducer: state.authenticationReducer,
})

const mapDispatchToProps = dispatch => ({
    addBook: formData => dispatch(bookActions.addBook(formData))
})

export default connect(mapStateToProps, mapDispatchToProps)(BookFormPage);
