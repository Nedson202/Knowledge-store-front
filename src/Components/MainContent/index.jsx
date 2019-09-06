import React from 'react';
import './_MainContent.scss';
import '../BookCard/_BookCard.scss';
import BookCard from '../BookCard';

const MainContent = () => (
  <div className="container-content" id="main">
    <BookCard />
    <BookCard />
    <BookCard />
  </div>
);

export default MainContent;
