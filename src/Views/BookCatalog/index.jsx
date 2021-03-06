import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withApollo, compose } from 'react-apollo';
import MetaTags from 'react-meta-tags';

import BookCard from '../../Components/BookCard';
import BackToTop from '../../Components/BackToTop';
import Spinner from '../../Components/Spinner';
import BookPreloader from './BookPreloader';

import { setRetrievedBooks } from '../../redux/actions/bookActions';
import { bookFilter } from '../../queries/books';
import {
  SCROLL, NO_CONTENT, BOOK_SERVER_ERROR, SCROLL_TO_ELEMENT,
  ALL_BOOKS,
} from '../../settings';

class BookCatalog extends Component {
  state = {
    isNewContentLoading: false,
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

    const heightOffset = 60;
    const { scrollHeight } = document.body;
    const totalHeight = window.scrollY + window.innerHeight + heightOffset;

    if (isNewContentLoading) return;
    if (
      window.location.search || totalHeight < scrollHeight || !books.length
    ) {
      return this.setState({ isNewContentLoading: false });
    }

    this.setState({
      isNewContentLoading: true,
    }, () => this.fetchBooksOnScroll());
  };

  fetchBooksOnScroll = async () => {
    const { books } = this.props;

    document.getElementById(SCROLL_TO_ELEMENT).scrollIntoView();

    try {
      const queryVariable = {
        search: '',
        from: books.length + 1,
        size: 20
      };

      await this.retrieveBookQueryHandler(queryVariable, books);

      this.setState({ isNewContentLoading: false });
    } catch (error) {
      console.error(error);
    }
  }

  retrieveBook = async (queryValue) => {
    const { dispatch, } = this.props;
    dispatch(setRetrievedBooks([], true));

    try {
      const queryVariable = {
        search: queryValue || '',
        from: 0,
        size: 20
      };

      await this.retrieveBookQueryHandler(queryVariable, []);
    } catch (error) {
      const { message: networkError } = error;

      dispatch(setRetrievedBooks([], false));
      this.setState({ networkError });

      return error;
    }
  }

  retrieveBookQueryHandler = async (variables, existingBooks) => {
    const { client, dispatch } = this.props;

    const response = await client.query({
      query: bookFilter,
      variables,
    });

    const { data: { searchBooks } } = response;
    const combineBooks = [...existingBooks, ...searchBooks];

    dispatch(setRetrievedBooks(combineBooks, false));
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
    const { networkError } = this.state;
    let message = NO_CONTENT;

    if (networkError) {
      message = BOOK_SERVER_ERROR;
    }

    return (
      <Fragment>
        <h2 className="text-center fetch-error">
          {message}
        </h2>
      </Fragment>
    );
  }

  renderAll = (loadingBook, books) => {
    if (loadingBook) {
      return <BookPreloader loadingBook={loadingBook} />;
    }

    const hasProperty = books.length > 0;

    if (!hasProperty) {
      return this.render404Message();
    }

    return this.renderBooks(books);
  }

  render() {
    const { isNewContentLoading } = this.state;
    const { loadingBook, books } = this.props;

    return (
      <Fragment>
        <MetaTags>
          <meta
            name="description"
            content="Book catalogue section. View a brief summary of books, their authors, and rating."
          />
          <meta property="og:title" content="All Books" />
        </MetaTags>

        <div className="container-content">
          {this.renderPageHeader()}
          {this.renderAll(loadingBook, books)}

          <div
            className="text-center"
            id="scrollToElement"
          >
            {isNewContentLoading && <Spinner spinnerStyle={45} />}
          </div>
        </div>
        <BackToTop />
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

const mapStateToProps = ({ books }) => ({
  books: books.books,
  loadingBook: books.isBookLoading,
  totalSearchResult: books.totalSearchResult,
});

export default compose(
  withApollo,
  connect(mapStateToProps),
)(BookCatalog);
