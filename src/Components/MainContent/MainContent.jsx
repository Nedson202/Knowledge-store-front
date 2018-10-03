import React, { Component } from 'react';
import './_MainContent.scss';
import '../BookCard/_BookCard.scss';
import BookCard from '../BookCard/BookCard';

class MainContent extends Component {
  render() {
    return (
      <div className="container-content" id="main">
        <BookCard />
        <BookCard />
        <BookCard />
      </div>
    );
  }
}

export default MainContent;
