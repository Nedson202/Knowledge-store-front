import React from 'react';
import { Switch, Route } from 'react-router-dom';
import App from './Components/Base/App';
import Header from './Components/Header/Header';
import BookProfile from './Components/BookProfile/BookProfile';
import BookCatalog from './Components/BookCatalog/BookCatalog';
import NotFound from './Components/NotFound/NotFound';
import AdminPanel from './Components/AdminPanel/AdminPanel';
import Admins from './Components/Admins/Admins';
import Users from './Components/Users/Users';
import UserProfile from './Components/UserProfile/UserProfile';
import SideNav from './Components/SideNav/SideNav';
import LeftSideBar from './Components/LeftSideBar/LeftSideBar';
import PasswordReset from './Components/PasswordReset/PasswordReset';
import ForgotPassword from './Components/ForgotPassword/ForgotPassword';
// import AuthWrapper from './Components/Hoc/AuthWrapper';
import 'antd/dist/antd.css';
import './_index.scss';
import MyBooks from './Components/MyBooks/MyBooks';


const Routes = () => (
  <div>
    <Header />
    <SideNav />
    <LeftSideBar />
    <Switch>
      <Route path="/" component={App} exact />
      <Route path="/books/:id" component={BookProfile} exact />
      <Route path="/books" component={BookCatalog} exact />
      <Route path="/my-books" component={MyBooks} exact />
      <Route path="/admin-dashboard" component={AdminPanel} exact />
      {/* <Route path="/admin-dashboard" component={AuthWrapper(AdminPanel, true)} exact /> */}
      <Route path="/profile" component={UserProfile} exact />
      <Route path="/password-reset" component={PasswordReset} exact />
      <Route path="/forgot-password" component={ForgotPassword} exact />
      <Route path="/admins" component={Admins} exact />
      <Route path="/users" component={Users} exact />
      <Route component={NotFound} />
    </Switch>
    {/* <Footer /> */}
  </div>
);

export default Routes;