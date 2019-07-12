import React from 'react';
import { Switch, Route } from 'react-router-dom';
import App from './Components/Base/App';
import Header from './Components/Header/Header';
import BookProfile from './Components/BookProfile/BookProfile';
import BookCatalog from './Components/BookCatalog/BookCatalog';
import NotFound from './Components/NotFound/NotFound';
import AdminPanel from './Components/AdminPanel/AdminPanel';
import Users from './Components/Users/Users';
import UserProfile from './Components/UserProfile/UserProfile';
import SideNav from './Components/SideNav/SideNav';
import LeftSideBar from './Components/LeftSideBar/LeftSideBar';
import PasswordReset from './Components/PasswordReset/PasswordReset';
import EmailGenerator from './Components/EmailGenerator/EmailGenerator';
import Favorites from './Components/Favorites/Favorites';
import AuthWrapper from './Components/Hoc/AuthWrapper';
import 'antd/dist/antd.css';
import './_index.scss';
import MyBooks from './Components/MyBooks/MyBooks';
import NetworkDetector from './Components/Hoc/NetworkDetector';

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