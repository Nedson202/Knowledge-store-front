import queryString from 'querystring';
import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import setQuery from 'set-query-string';
import debounce from 'lodash.debounce';
import { compose, withApollo } from 'react-apollo';

import { bookFilter } from '../../queries/books';
import { setRetrievedBooks } from '../../redux/actions/bookActions';
import {
  SEARCH_DEBOUNCE_TIME, PREVIOUS_LOCATION,
  SEARCH_BOX
} from '../../settings/defaults';

class Search extends PureComponent {
  debounceSearch = debounce(async (value) => {
    const { client, dispatch } = this.props;

    if (value.trim().length > 1) {
      dispatch(setRetrievedBooks([], true));

      try {
        const response = await client.query({
          query: bookFilter,
          variables: {
            search: value,
            from: 0,
            size: 20
          }
        });

        const { searchBooks } = response.data;

        dispatch(setRetrievedBooks(
          searchBooks, false, searchBooks && searchBooks.length
        ));
      } catch (error) {
        dispatch(setRetrievedBooks([], false));
        return error;
      }
    }
  }, SEARCH_DEBOUNCE_TIME);

  state = {
    value: '',
    toggleCloseIcon: false
  };

  componentDidMount() {
    this.setInputFromQuery();
  }

  setInputFromQuery() {
    const { dispatch } = this.props;
    const query = queryString.parse(window.location.search);
    if (Object.keys(query)[0] && Object.keys(query)[0] === '?search') {
      dispatch(setRetrievedBooks([], true));
      this.resizeSearchBox('450px');
      const queryValue = Object.values(query)[0];
      this.setState({
        value: queryValue || '',
        toggleCloseIcon: queryValue && true
      });
      if (queryValue.trim().length) return this.debounceSearch(queryValue);
    }
  }

  onInputChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    const { history, history: { location } } = this.props;
    if (value.trim().length === 1) {
      history.push({
        ...history.location,
        pathname: '/books',
      });

      if (location.pathname !== '/books') {
        localStorage.setItem(PREVIOUS_LOCATION, location.pathname);
      }
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

    this.resizeSearchBox('350px');

    const { history } = this.props;
    history.push(localStorage.previousLocation);
    localStorage.removeItem(PREVIOUS_LOCATION);
  }

  handleReset = () => {
    const { value } = this.state;
    if (!value.trim()) {
      setQuery({ search: null });

      this.resizeSearchBox('350px');
    }
  }

  handleDataPaste = (event) => {
    const { clipboardData } = event;
    const { history, history: { location } } = this.props;
    const query = clipboardData.getData('text/plain');
    if (query.trim().length) {
      history.push({
        ...history.location,
        pathname: '/books',
      });
      localStorage.setItem(PREVIOUS_LOCATION, location.pathname);
      return this.debounceSearch(query);
    }
  }

  handleSearchFocus = () => {
    this.resizeSearchBox('450px');
  }

  resizeSearchBox = (width) => {
    const searchInput = document.getElementById(SEARCH_BOX);
    if (searchInput) {
      searchInput.style.width = width;
      searchInput.style.transition = '0.6s';
    }
  }

  render() {
    const { value, toggleCloseIcon } = this.state;
    return (
      <form
        className="search"
        onKeyPress={(event) => {
          if (event.which === 13 /* Enter */) {
            event.preventDefault();
          }
        }}
      >
        <input
          className="form-input"
          type="search"
          placeholder="Search"
          aria-label="Search"
          name="value"
          id="searchBox"
          onChange={this.onInputChange}
          onFocus={this.handleSearchFocus}
          onBlur={this.handleReset}
          autoComplete="off"
          onPaste={this.handleDataPaste}
          value={value}
        />
        {toggleCloseIcon && (
          <button
            type="button"
            onClick={this.clearSearchQuery}
            tabIndex={0}
            className="close-icon"
          >
            &times;
          </button>
        )}
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
  dispatch: () => { },
};

export default withRouter(compose(
  withApollo,
  connect()
)(Search));
