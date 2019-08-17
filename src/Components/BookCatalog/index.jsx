import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withApollo, compose } from 'react-apollo';
import queryString from 'querystring';
import './_BookCatalog.scss';
import BookCard from '../BookCard';
import BackToTop from '../BackToTop';
import { setRetrievedBooks } from '../../redux/actions/bookActions';
import { bookFilter } from '../../queries/genre';
import Spinner from '../Spinner';
import BookPreloader from './BookPreloader';

class BookCatalog extends Component {
  state = {
    isNewContentLoading: false,
    displayBackToTop: false,
    randomDigit: 0,
  };

  componentDidMount() {
    window.addEventListener('scroll', this.handlePageScroll, {
      capture: true,
      passive: true
    });
    if (!window.location.search) {
      this.retrieveBook('');
    }
    this.setInputFromQuery();
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handlePageScroll, {
      capture: true,
      passive: true
    });
  }

  setInputFromQuery() {
    const { dispatch } = this.props;
    const query = queryString.parse(window.location.search);
    if (Object.keys(query)[0] && Object.keys(query)[0] === '?search') {
      dispatch(setRetrievedBooks([], true));
      const queryValue = Object.values(query)[0];
      document.getElementById('searchBox').value = queryValue;
      this.retrieveBook(queryValue);
    }
  }

  handlePageScroll = () => {
    const { isNewContentLoading, randomDigit } = this.state;
    const { books } = this.props;
    const { scrollHeight } = document.body;
    const totalHeight = window.scrollY + window.innerHeight;

    if (document.body.scrollTop < 20 || document.documentElement.scrollTop < 20) {
      this.setState({ displayBackToTop: false });
    }
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      this.setState({ displayBackToTop: true });
    }
    if (isNewContentLoading) return;
    if (
      !window.location.search && totalHeight >= scrollHeight && books.length
    ) {
      this.setState({
        isNewContentLoading: true,
      }, () => {
        document.getElementById('scrollToElement').scrollIntoView();
        const { client, dispatch } = this.props;
        client.query({
          query: bookFilter,
          variables: {
            search: '',
            from: randomDigit,
            size: books.length + 20
          }
        }).then((response) => {
          const { data: { searchBooks } } = response;
          dispatch(setRetrievedBooks(searchBooks, false));
          this.setState({ isNewContentLoading: false });
        });
      });
    } else {
      this.setState({ isNewContentLoading: false });
    }
  };

  retrieveBook(queryValue) {
    const { client, dispatch } = this.props;
    const randomDigit = Math.floor(Math.random() * (20 - 10) + 10);
    this.setState({ randomDigit });
    dispatch(setRetrievedBooks([], true));
    client.query({
      query: bookFilter,
      variables: {
        search: queryValue || '',
        from: randomDigit,
        size: 20
      }
    })
      .then((response) => {
        const { data: { searchBooks } } = response;
        dispatch(setRetrievedBooks(searchBooks, false));
      }).catch((error) => {
        const { message: networkError } = error;
        dispatch(setRetrievedBooks([], false));
        this.setState({ networkError });
        return error;
      });
  }

  renderBooks(books) {
    return (
      <Fragment>
        {
          books.map(book => (
            <BookCard
              key={book.id}
              book={book}
              enableEllipsis={false}
            />
          ))
        }
      </Fragment>
    );
  }

  renderPageHeader() {
    const { totalSearchResult } = this.props;
    const message = totalSearchResult !== 0 ? `${totalSearchResult} item(s) retrieved` : '';
    return (
      <div className="user-books__header" ref={(section) => { this.backToTop = section; }}>
        <h4>{window.location.search ? `Search result(s):: ${message}` : 'All Books'}</h4>
      </div>
    );
  }

  render404Message = () => {
    const { books, loadingBook } = this.props;
    const { networkError } = this.state;
    let message = 'The content you seek is unavailable';

    if (!loadingBook && books.length) {
      return;
    }

    if (networkError) {
      message = 'Unable to retrieve books from the server please try again';
    }

    return (
      <div>
        <h2 className="text-center fetch-error">
          {message}
        </h2>
      </div>
    );
  }

  render() {
    const { displayBackToTop, isNewContentLoading } = this.state;
    const { books, loadingBook } = this.props;

    return (
      <Fragment>
        {this.renderPageHeader()}
        <div className="container-content" id="main">
          {!loadingBook && books.length !== 0 && this.renderBooks(books)}
          {loadingBook && <BookPreloader loadingBook={loadingBook} />}
        </div>
        {!loadingBook && this.render404Message()}
        <div
          className="text-center"
          style={{ marginBottom: '20px' }}
          id="scrollToElement"
        >
          {isNewContentLoading && <Spinner spinnerStyle={45} />}
        </div>
        <BackToTop
          displayBackToTop={displayBackToTop}
        />
      </Fragment>
    );
  }
}

BookCatalog.propTypes = {
  client: PropTypes.object,
  dispatch: PropTypes.func,
  books: PropTypes.array,
  loadingBook: PropTypes.bool,
  totalSearchResult: PropTypes.number,
};

BookCatalog.defaultProps = {
  client: {},
  dispatch: () => { },
  books: [],
  loadingBook: false,
  totalSearchResult: 0,
};

const mapStateToProps = state => ({
  books: state.books.books,
  loadingBook: state.books.isBookLoading,
  totalSearchResult: state.books.totalSearchResult,
});

export default compose(
  withApollo,
  connect(mapStateToProps),
)(BookCatalog);
