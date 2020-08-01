import React, { useEffect } from 'react';
import UserInfo from '../components/UserInfo';
import { connect } from 'react-redux';
import userActions from '../actions/userActions';
import UserBookTable from '../components/UserBookTable';

const UserDetailPage = (props) => {
    const { getUser } = props;

    useEffect(() => {
        const params = props.match.params;
        getUser(params.id);
    }, [])

    return (
        <div className="container">
            <UserInfo />
            <UserBookTable />
        </div>
    );
}

const mapDispatchToProps = dispatch => ({
    getUser: userId => dispatch(userActions.getUser(userId))
})

export default connect(null, mapDispatchToProps)(UserDetailPage);
