import React, { useEffect } from 'react';
import UserTable from '../components/UserTable';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import userActions from '../actions/userActions';
import AdminRequireNotification from '../components/AdminRequireNotification';
import DataPagination from '../components/DataPagination';

const UserPage = (props) => {
    const { authenticationReducer, userReducer, getUsers, setPage } = props;
    const { isLogin, userData } = authenticationReducer;
    const { page, pageSize, totalRecord } = userReducer;

    useEffect(() => {
        if (isLogin && userData && userData.admin) getUsers();
    }, [isLogin, userData])

    const onChangePage = (event, index) => {
        setPage(index);
        getUsers();
    }

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
                    <DataPagination page={page} pageSize={pageSize} totalRecord={totalRecord} onChangePage={onChangePage} />
                </>
            :
                <AdminRequireNotification />
        }
        </div>
    )
}

const mapStateToProps = state => ({
    authenticationReducer: state.authenticationReducer,
    userReducer: state.userReducer
})

const mapDispatchToProps = dispatch => ({
    getUsers: () => dispatch(userActions.getUsers()),
    setPage: page => dispatch(userActions.setPage(page))
})

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
