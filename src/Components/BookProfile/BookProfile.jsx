import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { compose, graphql } from 'react-apollo';
// import { compose, withApollo, graphql } from 'react-apollo';
import './_BookProfile.scss';
import '../BookCatalog/_BookCatalog.scss';
import BookCard from '../BookCard/BookCard';
import AddReview from '../AddReview/AddReview';
import ReviewCard from '../ReviewCard/ReviewCard';
import Genre from '../Genre/Genre';
import { fetchBook } from '../../queries/books';

class BookProfile extends Component {
  // state = {
  //   book: {},
  // };

  // componentDidMount() {
  //   this.retrieveBook();
  // }

  // retrieveBook() {
  //   const { client } = this.props;
  //   client.query({
  //     query: fetchBooks,
  //     variables: {
  //       bookId: '4'
  //     }
  //   }).then((response) => {
  //     const { data: { book } } = response;
  //     this.setState({ book });
  //   });
  // }

  options = () => {
    console.log(this.props.match); /* eslint-disable-line */
  }

  renderBookHeader() {
    return (
      <div className="book-profile-title">
        <h2>The great reckoning</h2>
        <h5>by, Barbara Oakley</h5>

        <div className="book-meta">
          <span className="genre-badge">Poetry</span>
          <span className="genre-badge">Poetry</span>
          <p>202 reviews</p>
          <p>20 stars</p>
        </div>
      </div>
    );
  }

  renderAddReviewForm() {
    const { fetchBooksQuery: { book } } = this.props;
    // console.log(book && book.id);
    return (
      <div className="add-review-form">
        <AddReview
          toggleForm={false}
          reviewType="add"
          bookId={book && book.id}
        />
      </div>
    );
  }

  renderReviews() {
    const { fetchBooksQuery: { book } } = this.props;
    return (
      <div className="review-card">
        <ReviewCard
          reviews={book && book.reviews}
          bookId={book && book.id}
        />
        {/* <ReviewCard /> */}
      </div>
    );
  }

  renderBookGenres() {
    return (
      <Fragment>
        <Genre />
      </Fragment>
    );
  }

  renderAuthorInfo() {
    return (
      <div className="about-author">
        <h3>About the Author</h3>
        <hr />
    placerat nisl. Phasellus leo dolor, tempus non, auctor et, hendrerit quis, nisi.
    Praesent vestibulum dapibus nibh. Aliquam lobortis.Fusce egestas elit eget lorem
    Nullam cursus lacinia erat. Vivamus quis mi. Vestibulum
    ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Fusce
    id purus. Nunc interdum lacus sit amet orci.Aenean commodo ligula eget dolor.
    Sed augue ipsum, egestas nec, vestibulum et, malesuada adipiscing, dui. Vivamus
    euismod mauris. Cras risus ipsum, faucibus ut, ullamcorper id, varius ac, leo.
    Suspendisse eu ligula.
      </div>
    );
  }

  renderMoreBooks() {
    return (
      <div className="book-profile-more">
        <BookCard
          imageUrl="https://images.penguinrandomhouse.com/cover/9780679722762"
        />
        <BookCard
          imageUrl="https://images.penguinrandomhouse.com/cover/9781594631931"
        />
        <BookCard
          imageUrl="https://jamesclear.com/wp-content/uploads/2015/09/StumblingOnHappiness-by-DanielGilbert.jpg"
        />
        <BookCard
          imageUrl="https://jamesclear.com/wp-content/uploads/2018/08/9780735211292_AtomicHabits_3D.png?x83440"
        />
      </div>
    );
  }

  render() {
    // console.log(this.state.book.book); /* eslint-disable-line */
    return (
      <div className="book-profile-container">
        <div className="original-book">
          <BookCard
            imageUrl="https://images.penguinrandomhouse.com/cover/9780679437222"
          />
        </div>
        <div className="book-profile">
          {this.renderBookHeader()}
          <hr />
          <p>
            Aliquam eu nunc. In turpis. Nulla sit amet est. Phasellus volutpat, metus eget
            egestas mollis, lacus lacus blandit dui, id egestas quam mauris ut lacus. Vestibulum
            fringilla pede sit amet augue.Curabitur ullamcorper ultricies nisi. Quisque malesuada
            placerat nisl. Phasellus leo dolor, tempus non, auctor et, hendrerit quis, nisi.
            Praesent vestibulum dapibus nibh. Aliquam lobortis.Fusce egestas elit eget lorem
            Nullam cursus lacinia erat. Vivamus quis mi. Vestibulum
            ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Fusce
            id purus. Nunc interdum lacus sit amet orci.Aenean commodo ligula eget dolor.
            Sed augue ipsum, egestas nec, vestibulum et, malesuada adipiscing, dui. Vivamus
            euismod mauris. Cras risus ipsum, faucibus ut, ullamcorper id, varius ac, leo.
            Suspendisse eu ligula.
          </p>
        </div>
        {this.renderMoreBooks()}
        {this.renderAddReviewForm()}
        {this.renderReviews()}
        <div id="hello">
          {this.renderBookGenres()}
          {this.renderAuthorInfo()}
        </div>
      </div>
    );
  }
}

BookProfile.propTypes = {
  fetchBooksQuery: PropTypes.object,
  // match: PropTypes.object,
};

BookProfile.defaultProps = {
  fetchBooksQuery: {},
  // match: {},
};

export default compose(
  // withApollo
  graphql(fetchBook, {
    name: 'fetchBooksQuery',
    options: props => ({
      variables: {
        bookId: props.match.params.id
      }
    })
  })
)(BookProfile);
