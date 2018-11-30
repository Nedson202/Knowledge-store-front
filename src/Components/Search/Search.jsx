import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import queryString from 'querystring';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import setQuery from 'set-query-string';
import debounce from 'lodash.debounce';
import { compose, withApollo } from 'react-apollo';
import { bookFilter } from '../../queries/genre';
import { setRetrievedBooks } from '../../redux/actions/bookActions';

class Search extends PureComponent {
  debounceSearch = debounce((value) => {
    const { client, dispatch } = this.props;
    if (value.trim().length > 1) {
      dispatch(setRetrievedBooks([], true));
      client.query({
        query: bookFilter,
        variables: {
          search: value,
          from: 0,
          size: 20
        }
      }).then((response) => {
        const { searchBooks } = response.data;
        dispatch(setRetrievedBooks(searchBooks, false, searchBooks && searchBooks.length));
      }).catch((error) => {
        dispatch(setRetrievedBooks([], false));
        return error;
      });
    }
  }, 1000);

  state = {
    value: '',
    toggleCloseIcon: false
  };

  componentDidMount() {
    this.setInputFromQuery();
    // this.handleSearch();
  }

  setInputFromQuery() {
    const { dispatch } = this.props;
    const query = queryString.parse(window.location.search);
    if (Object.keys(query)[0] && Object.keys(query)[0] === '?search') {
      dispatch(setRetrievedBooks([], true));
      const queryValue = Object.values(query)[0];
      this.setState({ value: queryValue || '', toggleCloseIcon: queryValue && true });
      if (queryValue.trim().length) return this.debounceSearch(queryValue);
    }
  }

  onInputChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    const { history } = this.props;
    if (value.trim().length === 1) {
      history.push({
        ...history.location,
        pathname: '/books',
      });
    }
    this.setState({ [name]: value, }, () => {
      const { value: searchQuery } = this.state;
      if (searchQuery.trim().length) {
        this.setState({ toggleCloseIcon: true });
      } else {
        this.setState({ toggleCloseIcon: false });
      }
      setQuery({ search: searchQuery });
      this.debounceSearch(searchQuery);
    });
  }

  clearSearchQuery = () => {
    this.setState({ value: '', toggleCloseIcon: false });
    setQuery({ search: '' });
    const { history } = this.props;
    history.push(localStorage.previousLocation);
    localStorage.removeItem('previousLocation');
  }

  handleInputFocus = () => {
    const { history: { location } } = this.props;
    if (location.pathname !== '/books') {
      localStorage.setItem('previousLocation', location.pathname);
    }
  }

  handleReset = () => {
    const { history } = this.props;
    const { value } = this.state;
    if (!value.trim()) {
      setQuery({ search: null });
      history.push(localStorage.previousLocation);
    }
  }

  handleDataPaste = (event) => {
    const { clipboardData } = event;
    const { history } = this.props;
    const query = clipboardData.getData('text/plain');
    if (query.trim().length) {
      history.push({
        ...history.location,
        pathname: '/books',
      });
      return this.debounceSearch(query);
    }
  }

  render() {
    const { value, toggleCloseIcon } = this.state;
    return (
      <form
        className="form-inline my-2 my-lg-0 ml-auto mt-2 mt-lg-0"
        onKeyPress={(event) => {
          if (event.which === 13 /* Enter */) {
            event.preventDefault();
          }
        }}
      >
        <i className="fa fa-search" />
        <input
          className="form-control mr-sm-2 search-bar"
          type="search"
          placeholder="Search by name, author, year, genre"
          aria-label="Search"
          name="value"
          id="searchBox"
          onChange={this.onInputChange}
          onFocus={this.handleInputFocus}
          onBlur={this.handleReset}
          autoComplete="off"
          onPaste={this.handleDataPaste}
          value={value}
        />
        { toggleCloseIcon && (
        <i
          role="button"
          tabIndex={0}
          className="fas fa-times close-icon"
          onClick={this.clearSearchQuery}
        />
        ) }
      </form>
    );
  }
}

Search.propTypes = {
  client: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  dispatch: PropTypes.func,
};

Search.defaultProps = {
  dispatch: () => {},
};

export default withRouter(compose(
  withApollo,
  // graphql(bookFilter, { name: 'bookFilterQuery' }),
  connect()
)(Search));
