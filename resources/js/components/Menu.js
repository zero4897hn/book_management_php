import React from 'react';
import { Link } from 'react-router-dom';

const Menu = () => {
    return (
        <nav className="navbar navbar-expand-sm navbar-light bg-light">
            <div className="container">
                <Link className="navbar-brand" to="/">Sách</Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/books">Tất cả các sách</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/create-book">Giới thiệu sách</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/users">Quản lý người dùng</Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">Đăng nhập</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/register">Đăng ký</Link>
                        </li>
                        {/* <li className="nav-item dropdown">
                            <Link
                                className="nav-link dropdown-toggle"
                                to="#"
                                id="navbarDropdown"
                                role="button"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                <i className="fas fa-user-circle"></i>
                            </Link>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <Link className="dropdown-item" to="#">Thông tin cá nhân</Link>
                                <Link className="dropdown-item" to="#">Sách của bạn</Link>
                                <div className="dropdown-divider"></div>
                                <Link
                                    className="dropdown-item"
                                    to="/logout"
                                >
                                    Đăng xuất
                                </Link>
                            </div>
                        </li> */}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Menu;
