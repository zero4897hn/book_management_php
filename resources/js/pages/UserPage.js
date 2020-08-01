import React, { useEffect } from 'react';
import UserTable from '../components/UserTable';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import userActions from '../actions/userActions';
import AdminRequireNotification from '../components/AdminRequireNotification';

const UserPage = (props) => {
    const { authenticationReducer, getUsers } = props;
    const { isLogin, userData } = authenticationReducer;

    useEffect(() => {
        if (isLogin && userData && userData.admin) getUsers();
    }, [isLogin, userData])

    return (
        <div className="container">
        {isLogin && userData && userData.admin?
                <>
                    <div className="row">
                        <div className="col-sm-12">
                            <Link to="/create-user" className="btn btn-primary">Tạo mới tài khoản</Link>
                        </div>
                    </div>
                    <UserTable />
                </>
            :
                <AdminRequireNotification />
        }
        </div>
    )
}

const mapStateToProps = state => ({
    authenticationReducer: state.authenticationReducer
})

const mapDispatchToProps = dispatch => ({
    getUsers: () => dispatch(userActions.getUsers())
})

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
