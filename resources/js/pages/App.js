import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Menu from '../components/Menu';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import BookPage from './BookPage';
import UserPage from './UserPage';
import BookCreatingPage from './BookCreatingPage';
import BookDetailPage from './BookDetailPage';
import UserCreatingPage from './UserCreatingPage';
import UserDetailPage from './UserDetailPage';

const App = () => {
    return (
        <div>
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


ReactDOM.render(<App />, document.querySelector('#root'));
