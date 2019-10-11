import React from 'react';
import { Switch, Route } from 'react-router-dom';

import App from './Views/Base';
import BookProfile from './Views/BookProfile';
import BookCatalog from './Views/BookCatalog';
import NotFound from './Views/NotFound';
import Users from './Views/Users';
import UserProfile from './Views/UserProfile';
import PasswordReset from './Views/PasswordReset';
import EmailGenerator from './Views/EmailGenerator';
import Favorites from './Views/Favorites';
import MyBooks from './Views/MyBooks';

import Header from './Components/Header';
// import SideNav from './Components/SideNav';
import LeftSideBar from './Components/LeftSideBar';
import NetworkDetector from './Components/Hoc/NetworkDetector';
import AuthWrapper from './Components/Hoc/AuthWrapper';
import 'antd/dist/antd.css';
import './scss/_index.scss';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import MessageBanner from './Components/MessageBanner/MessageBanner';

const Routes = () => (
  <div>
    <Login />
    <SignUp />
    {/* <SideNav /> */}
    <MessageBanner />
    <Header />
    <LeftSideBar />
    <Switch>
      <Route path="/" component={NetworkDetector(App)} exact />
      <Route path="/books/:id" component={NetworkDetector(BookProfile)} exact />
      <Route path="/books" component={NetworkDetector(BookCatalog)} exact />
      <Route path="/my-books" component={NetworkDetector(AuthWrapper(MyBooks))} exact />
      <Route path="/my-favorites" component={NetworkDetector(AuthWrapper(Favorites))} exact />
      <Route path="/my-profile" component={NetworkDetector(AuthWrapper(UserProfile))} exact />
      <Route path="/password-reset" component={NetworkDetector(PasswordReset)} exact />
      <Route path="/email" component={NetworkDetector(EmailGenerator)} exact />
      <Route path="/users" component={NetworkDetector(AuthWrapper(Users, true))} exact />
      <Route component={NotFound} />
    </Switch>
  </div>
);

export default Routes;
