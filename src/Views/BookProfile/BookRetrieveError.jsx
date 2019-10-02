import React from 'react';

const BookRetrieveError = () => (
  <div className="book-retrieve-error">
    <h3>The book you seek is currently not available.</h3>
    <h5>
      You can make use of our search functionality
      <br />
      to retrieve books by
      <br />
      <b>name</b>
      ,
      <b> genre</b>
      ,
      <b> description</b>
      ,
      <b> authors</b>
      ,
      <b> year</b>
      ,
      <span> etc...</span>
      <br />
      by clicking on the button below.
    </h5>
    <label
      htmlFor="searchBox"
      className="btn btn-raised"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
    >
      Click and Type
    </label>
  </div>
);

export default BookRetrieveError;
