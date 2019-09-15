import React from 'react';

const BookRetrieveError = () => (
  <div className="book-retrieve-error">
    <h3>The book you seek is not available</h3>
    <h5>
      You can make use of our search functionality
      <br />
      to retrieve books by
      {' '}
      <b>name</b>
      ,
      {' '}
      <b>genre</b>
      ,
      {' '}
      <b>description</b>
      ,
      {' '}
      <b>authors</b>
      ,
      {' '}
      <b>year</b>
      {' '}
      etc...
      {' '}
      by clicking on the button below
    </h5>
    <label
      htmlFor="searchBox"
      className="btn btn-raised"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
    >
      Click Me and Type
    </label>
  </div>
);

export default BookRetrieveError;
