import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import queryString from 'querystring';
import PropTypes from 'prop-types';
import setQuery from 'set-query-string';
import debounce from 'lodash.debounce';
import { compose, graphql, withApollo } from 'react-apollo';
import { bookFilter } from '../../queries/genre';

/* eslint-disable */
class Search extends PureComponent {
  state = {
    value: '',
    toggleCloseIcon: false
  };

  componentDidMount() {
    this.setInputFromQuery();
    this.handleSearch();
  }

  setInputFromQuery() {
    const query = queryString.parse(location.search);
    if (Object.keys(query)[0] === '?search') {
      const queryValue = Object.values(query)[0];
        this.setState({ value: queryValue || '', toggleCloseIcon: queryValue && true });
    }
  }

  onInputChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    const { history } = this.props;
    this.setState({ [name]: value, }, () => {
      const { value } = this.state;
      if (value.trim().length === 1) {
        history.push({
          ...history.location,
          pathname: '/books',
        })
      }
      if (value.trim().length) {
        this.setState({ toggleCloseIcon: true });
      } else {
        this.setState({ toggleCloseIcon: false });
      }
      setQuery({ search: value });
    });

    this.handleSearch();
  }

  clearSearchQuery = () => {
    this.setState({ value: '', toggleCloseIcon: false });
    setQuery({search: ''});
    const { history } = this.props;
    history.push(localStorage.previousLocation);
  }

  handleSearch() {
    debounce(() => {
      const { value } = this.state;
      const { client } = this.props;
      if (value.trim().length > 1) {
        client.query({
          query: bookFilter,
          variables: {
            search: value
          }
        }).then((response) => {
          const { filterBooks } = response.data;
          console.log(filterBooks);
        })
      }
    }, 2000)();
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
      setQuery({search: null});
      history.push(localStorage.previousLocation);
    }
  }

  render() {
    const { value, toggleCloseIcon } = this.state;
    return (
      <form
        className="form-inline my-2 my-lg-0 ml-auto mt-2 mt-lg-0"
        onKeyPress={event => {
          if (event.which === 13 /* Enter */) {
            event.preventDefault();
          }
        }}
      >
        <i className="fa fa-search" />
        <input
          className="form-control mr-sm-2 search-bar"
          type="search"
          placeholder="Search by book name, author, year"
          aria-label="Search"
          name="value"
          onChange={this.onInputChange}
          onFocus={this.handleInputFocus}
          onBlur={this.handleReset}
          autoComplete="off"
          value={value}
        />
        { toggleCloseIcon && <i
          className="fas fa-times close-icon"
          onClick={this.clearSearchQuery}
          /> }
      </form>
    );
  }
}

Search.propTypes = {
  client: PropTypes.object.isRequired
}

export default withRouter(compose(
  withApollo,
  graphql(bookFilter, { name: 'bookFilterQuery' })
)(Search));
