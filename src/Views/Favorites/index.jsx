import React, { Component, Fragment } from 'react';
import { compose, graphql, Query } from 'react-apollo';
import PropTypes from 'prop-types';
import { ReactTitle } from 'react-meta-tags';

import BookCard from '../../Components/BookCard';
import BookPreloader from '../BookCatalog/BookPreloader';

import { toaster, errorHandler } from '../../utils';
import { removeFavorites, getFavorites } from '../../queries/books';
import {
  SUCCESS, TOASTR_ERROR, REMOVE_FAVORITES_QUERY,
} from '../../settings';
import ApolloPolling from '../../Components/ApolloPolling';

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

  removeFavorites = async () => {
    const { removeFavoritesQuery } = this.props;
    const { itemsToRemove } = this.state;

    try {
      const response = await removeFavoritesQuery({
        variables: {
          books: itemsToRemove
        },
        refetchQueries: this.refetchQuery()
      });

      const { removeFavorites: { message } } = response.data;
      toaster(SUCCESS, message);

      this.setState({ checkBoxState: false, itemsToRemove: [] });
    } catch (error) {
      const messages = errorHandler(error);
      messages.forEach(message => toaster(TOASTR_ERROR, message));
    }
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
              Remove
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
        {books.length > 0 && books.map(book => (
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
    return (
      <Query
        query={getFavorites}
        fetchPolicy="cache-and-network"
      >
        {({
          loading, data: { favoriteBooks = {} } = {},
          startPolling, stopPolling,
        }) => (
          <Fragment>
            <ReactTitle title="My Favorites" />

            {this.renderHeader()}
            <div className="container-content">
              {loading && <BookPreloader loadingBook={loading} />}
              {!loading && favoriteBooks && favoriteBooks.length !== 0
                && this.renderFavorites(favoriteBooks)}
              {!loading && favoriteBooks && favoriteBooks.length === 0
                && this.render404()}
            </div>

            <ApolloPolling
              startPolling={startPolling}
              stopPolling={stopPolling}
            />
          </Fragment>
        )}
      </Query>
    );
  }
}

Favorites.propTypes = {
  removeFavoritesQuery: PropTypes.func,
};

Favorites.defaultProps = {
  removeFavoritesQuery: () => { },
};

export default compose(
  graphql(removeFavorites, { name: REMOVE_FAVORITES_QUERY }),
)(Favorites);
