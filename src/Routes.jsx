import React from 'react';
import { Switch, Route } from 'react-router-dom';

import App from './Components/Base';
import Header from './Components/Header';
import BookProfile from './Components/BookProfile';
import BookCatalog from './Components/BookCatalog';
import NotFound from './Components/NotFound';
import AdminPanel from './Components/AdminPanel';
import Users from './Components/Users';
import UserProfile from './Components/UserProfile';
import SideNav from './Components/SideNav';
import LeftSideBar from './Components/LeftSideBar';
import PasswordReset from './Components/PasswordReset';
import EmailGenerator from './Components/EmailGenerator';
import Favorites from './Components/Favorites';
import MyBooks from './Components/MyBooks';
import NetworkDetector from './Components/Hoc/NetworkDetector';
import AuthWrapper from './Components/Hoc/AuthWrapper';
import 'antd/dist/antd.css';
import './_index.scss';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import MessageBanner from './Components/MessageBanner/MessageBanner';

const Routes = () => (
  <div>
    <Login />
    <SignUp />
    <SideNav />
    <MessageBanner />
    <Header />
    <LeftSideBar />
    <Switch>
      <Route path="/" component={NetworkDetector(App)} exact />
      <Route path="/books/:id" component={NetworkDetector(BookProfile)} exact />
      <Route path="/books" component={NetworkDetector(BookCatalog)} exact />
      <Route path="/my-books" component={NetworkDetector(AuthWrapper(MyBooks))} exact />
      <Route path="/admin-dashboard" component={AdminPanel} exact />
      <Route path="/my-favorites" component={NetworkDetector(AuthWrapper(Favorites))} exact />
      <Route path="/profile" component={NetworkDetector(AuthWrapper(UserProfile))} exact />
      <Route path="/password-reset" component={NetworkDetector(PasswordReset)} exact />
      <Route path="/email" component={NetworkDetector(EmailGenerator)} exact />
      <Route path="/users" component={NetworkDetector(AuthWrapper(Users, true))} exact />
      <Route component={NotFound} />
    </Switch>
  </div>
);

export default Routes;
