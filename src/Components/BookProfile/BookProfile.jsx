import React, { Component, Fragment } from 'react';
import './_BookProfile.scss';
import '../BookCatalog/_BookCatalog.scss';
import BookCard from '../BookCard/BookCard';
import AddReview from '../AddReview/AddReview';
import ReviewCard from '../ReviewCard/ReviewCard';
import Genre from '../Genre/Genre';

class BookProfile extends Component {
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
    return (
      <div className="add-review-form">
        <AddReview
          toggleForm={false}
          reviewType="add"
        />
      </div>
    );
  }

  renderReviews() {
    return (
      <div className="review-card">
        <ReviewCard />
        <ReviewCard />
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

export default BookProfile;
