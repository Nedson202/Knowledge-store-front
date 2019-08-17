import React from 'react';
import { Switch, Route } from 'react-router-dom';
import App from './components/Base/App';
import Header from './components/Header';
import BookProfile from './components/BookProfile';
import BookCatalog from './components/BookCatalog';
import NotFound from './components/NotFound';
import AdminPanel from './components/AdminPanel';
import Users from './components/Users';
import UserProfile from './components/UserProfile';
import SideNav from './components/SideNav';
import LeftSideBar from './components/LeftSideBar';
import PasswordReset from './components/PasswordReset';
import EmailGenerator from './components/EmailGenerator';
import Favorites from './components/Favorites';
import MyBooks from './components/MyBooks';
import NetworkDetector from './components/Hoc/NetworkDetector';
import AuthWrapper from './components/Hoc/AuthWrapper';
import 'antd/dist/antd.css';
import './_index.scss';

const Routes = () => (
  <div>
    <Header />
    <SideNav />
    <LeftSideBar />
    <Switch>
      <Route path="/" component={NetworkDetector(App)} exact />
      <Route path="/books/:id" component={NetworkDetector(BookProfile)} exact />
      <Route path="/books" component={NetworkDetector(BookCatalog)} exact />
      <Route path="/my-books" component={NetworkDetector(AuthWrapper(MyBooks))} exact />
      <Route path="/admin-dashboard" component={AdminPanel} exact />
      <Route path="/favorites" component={NetworkDetector(AuthWrapper(Favorites))} exact />
      <Route path="/profile" component={NetworkDetector(AuthWrapper(UserProfile))} exact />
      <Route path="/password-reset" component={NetworkDetector(PasswordReset)} exact />
      <Route path="/email" component={NetworkDetector(EmailGenerator)} exact />
      <Route path="/users" component={NetworkDetector(AuthWrapper(Users, true))} exact />
      <Route component={NotFound} />
    </Switch>
  </div>
);

export default Routes;