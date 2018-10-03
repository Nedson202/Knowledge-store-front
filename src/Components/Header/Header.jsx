import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import avatar from '../../assets/beverage-books.jpg';
import './_Header.scss';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSideNavOpen: false,
    };
  }

  toggleSideBar = () => {
    const { isSideNavOpen } = this.state;
    if (!isSideNavOpen) {
      document.addEventListener('click', this.handleOutsideClick, false);
      document.getElementById('mySidenav').style.width = '270px';
      document.getElementById('mySidenav').style.boxShadow = '0 1px 1px 100vw rgba(0, 0, 0, 0.6)';
    } else {
      document.removeEventListener('click', this.handleOutsideClick, false);
      document.getElementById('mySidenav').style.width = '0';
      document.getElementById('mySidenav').style.boxShadow = 'none';
    }

    this.setState(prevState => ({
      isSideNavOpen: !prevState.isSideNavOpen,
    }));
  }

  handleOutsideClick = (event) => {
    if (this.node.contains(event.target)) {
      return;
    }

    this.toggleSideBar();
  }

  render() {
    return (
      <div className="App" ref={(node) => { this.node = node; }}>
        <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light" id="navbar">
          <div className="container">
            <span className="navbar-brand">Loresters Bookstore</span>
            <button
              type="button"
              className="mobile-nav"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Search icon"
            >
              <i className="fas fa-search" />
            </button>
            <button
              type="button"
              className="mobile-nav"
              aria-label="Toggle navigation"
              onClick={this.toggleSideBar}
            >
              <i className="fas fa-bars" />
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <form className="form-inline my-2 my-lg-0 ml-auto mt-2 mt-lg-0">
                <i className="fa fa-search" />
                <input
                  className="form-control mr-sm-2 search-bar"
                  type="search"
                  placeholder="Search by book name, author, year"
                  aria-label="Search"
                />
              </form>
              <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                <li className="cart-navbar">
                  <i className="fa fa-shopping-cart" />
                  <span>10</span>
                </li>
                <li className="nav-item dropdown user-profile-nav">
                  <button
                    type="button"
                    className="btn btn-default nav-link dropdown-toggle text-case"
                    id="navbarDropdown"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <img src={avatar} alt="Avatar" className="avatar" />
                  </button>
                  <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <div className="user-detail">
                      @michaelSmith
                    </div>
                    <div className="dropdown-divider" />
                    <Link to="/profile" className="dropdown-item user-profile-navlink">
                      Profile
                      {' '}
                      <i className="fas fa-user-circle" />
                    </Link>
                    <Link to="/logout" className="dropdown-item user-profile-navlink">
                      Logout
                      {' '}
                      <i className="fa fa-sign-out-alt" />
                    </Link>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default Header;
