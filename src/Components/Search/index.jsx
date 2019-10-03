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
  SEARCH_DEBOUNCE_TIME, PREVIOUS_LOCATION, BOOKS_PATH,
} from '../../settings';

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
    closeIconActive: false
  };

  componentDidMount() {
    this.setInputFromQuery();
  }

  setInputFromQuery() {
    const { dispatch } = this.props;
    const query = queryString.parse(window.location.search);
    const queryKeys = Object.keys(query)[0];
    const queryValue = Object.values(query)[0];

    const hasSearchProperty = queryKeys && queryKeys === '?search';

    if (!hasSearchProperty) {
      return;
    }

    dispatch(setRetrievedBooks([], true));

    this.setState({
      value: queryValue || '',
      closeIconActive: queryValue && true
    });

    if (queryValue.trim()) {
      return this.debounceSearch(queryValue);
    }
  }

  onInputChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    const { history, history: { location } } = this.props;

    if (value.trim().length === 1) {
      history.push({
        ...history.location,
        pathname: BOOKS_PATH,
      });

      if (location.pathname !== BOOKS_PATH) {
        localStorage.setItem(PREVIOUS_LOCATION, location.pathname);
      }
    }

    this.setState({
      [name]: value,
    }, () => {
      const { value: searchQuery } = this.state;

      setQuery({ search: searchQuery });
      this.debounceSearch(searchQuery);
    });
  }

  clearSearchQuery = () => {
    this.setState({ value: '', closeIconActive: false });
    setQuery({ search: '' });

    const { history } = this.props;
    history.push(localStorage.previousLocation);
    localStorage.removeItem(PREVIOUS_LOCATION);
  }

  handleReset = () => {
    const { value } = this.state;
    if (value.trim()) {
      return;
    }

    setQuery({ search: null });

    this.setState({ closeIconActive: false });
  }

  handleDataPaste = (event) => {
    const { clipboardData } = event;
    const { history, history: { location } } = this.props;
    const query = clipboardData.getData('text/plain');

    if (!query.trim()) {
      return;
    }

    history.push({
      ...history.location,
      pathname: BOOKS_PATH,
    });

    localStorage.setItem(PREVIOUS_LOCATION, location.pathname);

    return this.debounceSearch(query);
  }

  closeIconActive = () => {
    this.setState({ closeIconActive: true });
  }

  render() {
    const { value, closeIconActive } = this.state;
    return (
      <form
        className="search"
        onKeyPress={(event) => {
          if (event.which === 13 /* Enter */) {
            event.preventDefault();
          }
        }}
      >
        <ion-icon name="search" />
        <input
          className="form-input"
          type="search"
          placeholder="Search book collections..."
          aria-label="Search"
          name="value"
          id="searchBox"
          onChange={this.onInputChange}
          onBlur={this.handleReset}
          onFocus={this.closeIconActive}
          autoComplete="off"
          onPaste={this.handleDataPaste}
          value={value}
        />

        {closeIconActive && (
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
  client: PropTypes.object,
  history: PropTypes.object.isRequired,
  dispatch: PropTypes.func,
};

Search.defaultProps = {
  client: {},
  dispatch: () => { },
};

export default withRouter(compose(
  withApollo,
  connect()
)(Search));
