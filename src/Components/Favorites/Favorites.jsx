import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { compose, graphql } from 'react-apollo';
import './_Favorites.scss';
import BookCard from '../BookCard/BookCard';
import toaster from '../../utils/toast';
import { removeFavorites, getFavorites } from '../../queries/books';
import BookPreloader from '../BookCatalog/BookPreloader';
import errorHandler from '../../utils/errorHandler';

class Favorites extends Component {
  state = {
    checkBoxState: false,
    itemsToRemove: []
  };

  toggleDeleteCheckBox = () => {
    this.setState(prevState => ({
      checkBoxState: !prevState.checkBoxState,
      itemsToRemove: []
    }));
  }

  removeFavorites = () => {
    const { removeFavoritesQuery } = this.props;
    const { itemsToRemove } = this.state;
    removeFavoritesQuery({
      variables: {
        books: itemsToRemove
      },
      refetchQueries: this.refetchQuery()
    }).then((response) => {
      const { removeFavorites: { message } } = response.data;
      toaster('success', message);
      this.setState({ checkBoxState: false, itemsToRemove: [] });
    }).catch((error) => {
      const messages = errorHandler(error);
      messages.forEach(message => toaster('error', message));
    });
  }

  handleCheckboxChange(id, event) {
    const { checked } = event.target;
    const { itemsToRemove } = this.state;
    if (!checked) {
      itemsToRemove.splice(itemsToRemove.indexOf(id), 1);
    }
    if (checked && !itemsToRemove.includes(id)) itemsToRemove.push(id);
    this.setState({ itemsToRemove });
  }

  refetchQuery() {
    return [
      {
        query: getFavorites
      }
    ];
  }

  renderHeader() {
    const { checkBoxState, itemsToRemove } = this.state;
    return (
      <div className="favorite-books__header">
        <h3>My Favorites</h3>
        <div>
          {itemsToRemove.length !== 0 && (
            <button
              type="button"
              className="btn btn-primary btn-raised save"
              onClick={this.removeFavorites}
            >
              Save
            </button>
          )}
          <button
            type="button"
            className="btn btn-primary btn-raised remove-favorites"
            onClick={this.toggleDeleteCheckBox}
          >
            {checkBoxState ? 'Cancel' : 'Remove Favorites'}
          </button>
        </div>
      </div>
    );
  }

  renderFavorites(books) {
    const { checkBoxState } = this.state;
    return (
      <Fragment>
        {books.map(book => (
          <BookCard
            key={book.id}
            toggleCheckBox={checkBoxState}
            checkBoxChange={event => this.handleCheckboxChange(book.id, event)}
            enableEllipsis={false}
            book={book}
          />
        ))}
      </Fragment>
    );
  }

  render404() {
    return (
      <div className="book-retrieve-error">
        <h4>You are yet to add a book as favorite</h4>
      </div>
    );
  }

  render() {
    const { getFavoritesQuery: { favoriteBooks, loading } } = this.props;
    return (
      <Fragment>
        {this.renderHeader()}
        <div className="container-content" id="main">
          {loading && <BookPreloader loadingBook={loading} />}
          {!loading && favoriteBooks && favoriteBooks.length !== 0
            && this.renderFavorites(favoriteBooks)}
          {!loading && favoriteBooks && favoriteBooks.length === 0 && this.render404()}
        </div>
      </Fragment>
    );
  }
}

Favorites.propTypes = {
  removeFavoritesQuery: PropTypes.func,
  getFavoritesQuery: PropTypes.object,
};

Favorites.defaultProps = {
  removeFavoritesQuery: () => { },
  getFavoritesQuery: {},
};

export default compose(
  graphql(removeFavorites, { name: 'removeFavoritesQuery' }),
  graphql(getFavorites, { name: 'getFavoritesQuery' }),
)(Favorites);
