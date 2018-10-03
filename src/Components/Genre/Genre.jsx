import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { AutoComplete } from 'antd';
import './_Genre.scss';

const genres = [
  'Science fiction',
  'Satire',
  'Drama',
  'Action and Adventure',
  'Romance',
  'Mystery',
  'Horror',
  'Self help',
  'Health',
  'Guide',
  'Travel',
  'Children',
  'Religion, Spirituality & New Age',
  'Science',
  'History',
  'Math',
  'Anthology',
  'Poetry',
  'Encyclopedias',
  'Dictionaries',
  'Comics',
  'Art',
  'Cookbooks',
  'Diaries',
  'Journals',
  'Prayer books',
  'Series',
  'Trilogy',
  'Biographies',
  'Autobiographies',
  'Fantasy',
];


// const dataSource = ['Burns Bay Road', 'Downing Street', 'Wall Street'];

class Genre extends Component {
  onSelect(value) {
    console.log(value);
  }

  Complete() {
    return (
      <AutoComplete
        style={{ width: 200 }}
        dataSource={genres}
        onChange={this.onSelect}
        placeholder="Type any genre to search"
        filterOption={
          (inputValue, option) => option.props.children
            .toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
      />
    );
  }

  renderGenres() {
    return genres.slice(1, 12).map(genre => (
      genre.length < 15 && <Link key="" to={genre}>{genre}</Link>
    ));
  }

  render() {
    return (
      <Fragment>
        <div className="genre">
          <h3>Search Genres</h3>
          <span className="genre-search">{this.Complete()}</span>
        </div>
      </Fragment>
    );
  }
}

export default Genre;
