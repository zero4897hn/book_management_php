import React, { useState, useEffect } from 'react';
import UserForm from '../components/UserForm';
import { connect } from 'react-redux';
import userActions from '../actions/userActions';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import AdminRequireNotification from '../components/AdminRequireNotification';

const UserEditingPage = props => {
    const { authenticationReducer, getUserPromise, editUser, match } = props;
    const { isLogin, userData } = authenticationReducer;
    const { params } = match;

    const [user, setUser] = useState(undefined);
    const [errors, setErrors] = useState({});
    const [isSaving, setSaving] = useState(false);

    const history = useHistory();

    useEffect(() => {
        if (isLogin && userData && userData.admin) fetchData();
    }, [isLogin, userData])

    const fetchData = async () => {
        setSaving(true);
        try {
            const response = await getUserPromise(params.id);
            setUser(response.data);
        } catch (error) {
            console.log(error);
        } finally {
            setSaving(false);
        }
    }

    const handleSubmitForm = async (event, formData) => {
        try {
            setErrors({});
            setSaving(true);
            const response = await editUser(params.id, formData);
            const user = response.data;
            history.push(`/detail-user/${user.id}`);
            toast.success('Cập nhật người dùng thành công.');
        } catch (error) {
            toast.warning('Cập nhật người dùng thất bại.');
            const errorFields = error && error.response && error.response.data && error.response.data.errors;
            setErrors(errorFields || {});
        } finally {
            setSaving(false);
        }
    }

    return (
        <div className="container">
            {isLogin && userData && userData.admin ?
                <UserForm entity={user} errors={errors} disabledSubmit={isSaving} handleSubmitForm={handleSubmitForm} />
                :
                <AdminRequireNotification />
            }
        </div>
    );
}

const mapStateToProps = state => ({
    authenticationReducer: state.authenticationReducer,
})

const mapDispatchToProps = dispatch => ({
    getUserPromise: id => dispatch(userActions.getUserPromise(id)),
    editUser: (id, formData) => dispatch(userActions.editUser(id, formData))
})

export default connect(mapStateToProps, mapDispatchToProps)(UserEditingPage);
