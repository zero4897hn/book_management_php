import React, { useState } from 'react';
import UserForm from '../components/UserForm';
import { connect } from 'react-redux';
import userActions from '../actions/userActions';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';

const UserCreatingPage = props => {
    const { addUser } = props;

    const [errors, setErrors] = useState([]);
    const [isSaving, setSaving] = useState(false);

    const history = useHistory();

    const handleSubmitForm = async (event, formData) => {
        try {
            setSaving(true);
            setErrors([]);
            const response = await addUser(formData);
            const user = response.data;
            history.push(`/detail-user/${user.id}`);
            toast.success('Thêm mới người dùng thành công với mật khẩu mặc định "123456aA@".');
        } catch (error) {
            toast.warning('Thêm mới người dùng thất bại.');
            const errorFields = error && error.response && error.response.data && error.response.data.errors;
            setErrors(errorFields || [])
        } finally {
            setSaving(false);
        }
    }

    return (
        <div className="container">
            <UserForm handleSubmitForm={handleSubmitForm} errors={errors} disabledSubmit={isSaving} />
        </div>
    );
}

const mapDispatchToProps = dispatch => ({
    addUser: formData => dispatch(userActions.addUser(formData))
})

export default connect(null, mapDispatchToProps)(UserCreatingPage);
