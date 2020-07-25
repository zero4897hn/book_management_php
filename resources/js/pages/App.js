import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import Menu from '../components/Menu';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import BookPage from './BookPage';
import UserPage from './UserPage';
import BookCreatingPage from './BookCreatingPage';
import BookDetailPage from './BookDetailPage';

const App = () => {
    return (
        <div>
            <BrowserRouter>
                <div>
                    <Route path="/" component={Menu} />
                    <Route path="/login" component={LoginPage} exact />
                    <Route path="/register" component={RegisterPage} exact />
                    <Route path="/books" component={BookPage} exact />
                    <Route path="/books/create" component={BookCreatingPage} exact />
                    <Route path="/books/:id" component={BookDetailPage} exact />
                    <Route path="/users" component={UserPage} exact />
                </div>
            </BrowserRouter>
        </div>
    )
}


ReactDOM.render(<App />, document.querySelector('#root'));
