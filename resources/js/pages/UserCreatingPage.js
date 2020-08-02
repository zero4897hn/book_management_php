import React, { useState } from 'react';
import UserForm from '../components/UserForm';
import { connect } from 'react-redux';
import userActions from '../actions/userActions';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';

const UserCreatingPage = props => {
    const { addUser } = props;

    const [errors, setErrors] = useState([]);

    const history = useHistory();

    const handleSubmitForm = async (event, formData) => {
        try {
            setErrors([]);
            const response = await addUser(formData);
            const user = response.data;
            history.push(`/detail-user/${user.id}`);
            toast.success('Thêm mới người dùng thành công với mật khẩu mặc định "123456aA@".');
        } catch (error) {
            toast.warning('Thêm mới người dùng thất bại.');
            const errorFields = error && error.response && error.response.data && error.response.data.errors;
            setErrors(errorFields || [])
        }
    }

    return (
        <div className="container">
            <UserForm handleSubmitForm={handleSubmitForm} errors={errors} />
        </div>
    );
}

const mapDispatchToProps = dispatch => ({
    addUser: formData => dispatch(userActions.addUser(formData))
})

export default connect(null, mapDispatchToProps)(UserCreatingPage);
