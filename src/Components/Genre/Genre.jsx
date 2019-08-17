import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { graphql, compose, withApollo } from 'react-apollo';
import debounce from 'lodash.debounce';
import { AutoComplete } from 'antd';
import './_Genre.scss';
import { getGenres, bookFilter } from '../../queries/genre';
import Spinner from '../Spinner/Spinner';

class Genre extends Component {
  state = {
    genre: '',
    searching: false
  }

  onValueChange = (value) => {
    this.setState({ genre: value });
    this.searchByGenre();
  }

  searchByGenre() {
    debounce(() => {
      const { genre } = this.state;
      const { client } = this.props;
      if (genre.trim().length !== 0) {
        this.setState({ searching: true });
        client.query({
          query: bookFilter,
          variables: {
            search: genre
          },
        }).then(() => {
          this.setState({ searching: false });
        });
      } else this.setState({ searching: false });
    }, 1000)();
  }

  flattenedGenres(genres) {
    return genres && genres.map(genre => genre.genre);
  }

  Complete(genres) {
    return (
      <AutoComplete
        style={{ width: 200 }}
        dataSource={this.flattenedGenres(genres)}
        onChange={this.onValueChange}
        placeholder="Type any genre to search"
        filterOption={
          (inputValue, option) => option.props.children
            .toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
      />
    );
  }

  render() {
    const { data } = this.props;
    const { searching } = this.state;
    return (
      <Fragment>
        <div className="genre">
          <h3>Search Genres</h3>
          <span className="genre-search">{this.Complete(data && data.getGenres)}</span>
          {searching && <Spinner />}
        </div>
      </Fragment>
    );
  }
}

Genre.propTypes = {
  data: PropTypes.object,
  client: PropTypes.object,
};

Genre.defaultProps = {
  data: {},
  client: {},
};

export default compose(
  withApollo,
  graphql(getGenres),
)(Genre);
