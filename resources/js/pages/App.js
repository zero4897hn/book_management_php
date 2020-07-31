import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import Menu from '../components/Menu';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import BookPage from './BookPage';
import UserPage from './UserPage';
import BookCreatingPage from './BookCreatingPage';
import BookDetailPage from './BookDetailPage';
import UserCreatingPage from './UserCreatingPage';
import UserDetailPage from './UserDetailPage';
import { ToastContainer } from 'react-toastify';
import store from '../utils/store';

const App = () => {
    return (
        <div>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar
                newestOnTop
                closeOnClick={false}
                rtl={false}
                draggable={false}
                pauseOnHover={false}
            />
            <BrowserRouter>
                <div>
                    <Menu />
                    <Switch>
                        <Route path="/login" component={LoginPage} exact />
                        <Route path="/register" component={RegisterPage} exact />
                        <Route path="/books" component={BookPage} exact />
                        <Route path="/create-book" component={BookCreatingPage} exact />
                        <Route path="/detail-book/:id" component={BookDetailPage} exact />
                        <Route path="/users" component={UserPage} exact />
                        <Route path="/create-user" component={UserCreatingPage} exact />
                        <Route path="/detail-user/:id" component={UserDetailPage} exact />
                    </Switch>
                </div>
            </BrowserRouter>
        </div>
    )
}

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.querySelector('#root')
);
