import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withApollo, compose } from 'react-apollo';
import { ReactTitle } from 'react-meta-tags';
import './_BookCatalog.scss';
import BookCard from '../BookCard';
import BackToTop from '../BackToTop';
import { setRetrievedBooks } from '../../redux/actions/bookActions';
import { bookFilter } from '../../queries/books';
import Spinner from '../Spinner';
import BookPreloader from './BookPreloader';
import {
  SCROLL, NO_CONTENT, BOOK_SERVER_ERROR, SCROLL_TO_ELEMENT,
  ALL_BOOKS,
} from '../../settings/defaults';

class BookCatalog extends Component {
  state = {
    isNewContentLoading: false,
    displayBackToTop: false,
  };

  componentDidMount() {
    window.addEventListener(SCROLL, this.handlePageScroll, {
      capture: true,
      passive: true
    });

    if (!window.location.search) {
      this.retrieveBook();
    }
  }

  componentWillUnmount() {
    window.removeEventListener(SCROLL, this.handlePageScroll, {
      capture: true,
      passive: true
    });
  }

  handlePageScroll = () => {
    const { isNewContentLoading } = this.state;
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
      }, async () => {
        document.getElementById(SCROLL_TO_ELEMENT).scrollIntoView();
        const { client, dispatch } = this.props;

        try {
          const response = await client.query({
            query: bookFilter,
            variables: {
              search: '',
              from: books.length + 1,
              size: books.length + 20
            }
          });

          const { data: { searchBooks } } = response;
          dispatch(setRetrievedBooks(searchBooks, false));

          this.setState({ isNewContentLoading: false });
        } catch (error) {
          console.error(error);
        }
      });
    } else {
      this.setState({ isNewContentLoading: false });
    }
  };

  retrieveBook = async (queryValue) => {
    const { client, dispatch, } = this.props;
    dispatch(setRetrievedBooks([], true));

    try {
      const response = await client.query({
        query: bookFilter,
        variables: {
          search: queryValue || '',
          from: 0,
          size: 20
        }
      });

      const { data: { searchBooks } } = response;

      dispatch(setRetrievedBooks(searchBooks, false));
    } catch (error) {
      const { message: networkError } = error;
      dispatch(setRetrievedBooks([], false));
      this.setState({ networkError });
      return error;
    }
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
    const message = totalSearchResult !== 0
      ? `${totalSearchResult} item(s) retrieved` : '';
    return (
      <div
        className="user-books__header"
        ref={(section) => { this.backToTop = section; }}
      >
        <h4>
          {window.location.search ? `Search result(s):: ${message}`
            : ALL_BOOKS
          }
        </h4>
      </div>
    );
  }

  render404Message = () => {
    const { books, loadingBook } = this.props;
    const { networkError } = this.state;
    let message = NO_CONTENT;

    if (!loadingBook && books.length) {
      return;
    }

    if (networkError) {
      message = BOOK_SERVER_ERROR;
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
        <ReactTitle title="All Books" />

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
