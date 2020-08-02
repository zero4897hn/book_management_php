import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaLock, FaLockOpen, FaEdit } from 'react-icons/fa';
import { toast } from 'react-toastify';
import userActions from '../actions/userActions';
import BlockUserModal from './BlockUserModal';
import NotificationModal from './NotificationModal';

const UserTable = (props) => {
    const { userReducer, blockUser, unblockUser } = props;
    const { users, page, pageSize, blockResponse, unblockResponse } = userReducer;

    const [showConfirmBlock, setShowConfirmBlock] = useState(false);
    const [showConfirmUnblock, setShowConfirmUnblock] = useState(false);
    const [pendingUserId, setPendingUserId] = useState('');
    const [banExpiredAt, setBanExpiredAt] = useState('');
    const [isFirstRun, setFirstRun] = useState(true);

    useEffect(() => {
        if (isFirstRun) {
            setFirstRun(false);
            return;
        }

        const { success } = blockResponse;
        if (success) {
            toast.success('Khóa tài khoản thành công.');
            setShowConfirmBlock(false);
        }
    }, [blockResponse])

    useEffect(() => {
        if (isFirstRun) {
            setFirstRun(false);
            return;
        }

        const { success } = unblockResponse;
        if (success) {
            toast.success('Mở khóa tài khoản thành công.');
            setShowConfirmUnblock(false);
        }
    }, [unblockResponse])

    const onClickBlock = (event, userId) => {
        setPendingUserId(userId);
        setShowConfirmBlock(true);
    }

    const onClickUnblock = (event, userId) => {
        setPendingUserId(userId);
        setShowConfirmUnblock(true);
    }

    const handleBlockUser = () => {
        blockUser(pendingUserId, banExpiredAt);
    }

    const handleUnblockUser = () => {
        unblockUser(pendingUserId);
    }

    const renderedUsers = users.map((user, index) => {
        return (
            <tr key={index}>
                <th scope="row">{(page - 1) * pageSize + index + 1}</th>
                <td>
                    {user.avatar ?
                        <img className="img-fluid" src={`/files/avatars/${user.avatar}`} />
                        :
                        <img className="img-fluid" src="/files/avatars/anonymous_avatar.png" />
                    }
                </td>
                <td><Link to={`/detail-user/${user.id}`}>{user.username}</Link></td>
                <td>{user.email}</td>
                <td>{user.admin ? 'Quản trị' : 'Người dùng'}</td>
                <td>{user.banned ? 'Đang khóa' : 'Đang mở'}</td>
                <td>
                    {user.banned ?
                        <button className="btn btn-warning" onClick={event => onClickUnblock(event, user.id)}>
                            <FaLockOpen />
                        </button>
                        :
                        <button className="btn btn-warning" onClick={event => onClickBlock(event, user.id)}>
                            <FaLock />
                        </button>
                    }
                    <a className="btn btn-primary" href="/users/{{$user->id}}/edit">
                        <FaEdit />
                    </a>
                </td>
            </tr>
        )
    })

    return (
        <div className="row">
            <div className="col-sm-12">
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th scope="col" style={{ width: '5%' }}>#</th>
                            <th scope="col" style={{ width: '10%' }}>Avatar</th>
                            <th scope="col" style={{ width: '20%' }}>Tên đăng nhập</th>
                            <th scope="col" style={{ width: '25%' }}>Email</th>
                            <th scope="col" style={{ width: '15%' }}>Vai trò</th>
                            <th scope="col" style={{ width: '10%' }}>Trạng thái</th>
                            <th scope="col" style={{ width: '15%' }}></th>
                        </tr>
                    </thead>
                    <tbody>{renderedUsers}</tbody>
                </table>
            </div>
            <BlockUserModal
                show={showConfirmBlock}
                handleClose={() => setShowConfirmBlock(false)}
                handleConfirm={() => handleBlockUser()}
                setBanExpiredAt={setBanExpiredAt}
                banExpiredAt={banExpiredAt}
            />
            <NotificationModal
                show={showConfirmUnblock}
                handleClose={() => setShowConfirmUnblock(false)}
                title="Xác nhận mở khóa tài khoản"
                content="Bạn có chắc chắn muốn mở khóa tài khoản này?"
                handleConfirm={() => handleUnblockUser()}
            />
        </div>
    );
}

const mapStateToProps = state => ({
    userReducer: state.userReducer
});

const mapDispatchToProps = dispatch => ({
    blockUser: (userId, banExpiredAt) => dispatch(userActions.blockUser(userId, banExpiredAt)),
    unblockUser: userId => dispatch(userActions.unblockUser(userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(UserTable);
