import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import ReactStars from 'react-stars';
import './_AddReview.scss';
import { compose, graphql } from 'react-apollo';
import {
  addReview, addReply, editReply, editReview
} from '../../queries/reviews';
import toaster from '../../utils/toast';
import { fetchBook } from '../../queries/books';
import errorHandler from '../../utils/errorHandler';

class AddReview extends Component {
  constructor(props) {
    super(props);
    const {
      ownerOfReview, replyToEdit, reviewToEdit, reviewFormId, bookId,
    } = this.props;
    this.state = {
      values: {
        review: '', /* eslint-disable-line */
        rating: null,
        bookId,
        reviewId: reviewFormId,
        replyId: '',
        reply: ownerOfReview.length ? `@${ownerOfReview}` : '',
        replyEdit: replyToEdit || '',
        reviewToEdit: reviewToEdit || '',
      }
    };
  }

  handleInputChange = (event) => {
    const { values } = this.state;
    const { value, name } = event.target;
    values[name] = value;
    this.setState({ values });
  }

  handleFormSubmission = () => () => {
    const { values } = this.state;
    const { reviewType } = this.props;
    switch (reviewType) {
      case 'reply':
        return this.addReply(values);

      case 'replyEdit':
        return this.editReply(values);

      case 'reviewEdit':
        return this.editReview(values);

      default:
        return this.addReview(values);
    }
  }

  ratingChanged = (rating) => {
    const { values } = this.state;
    values.rating = rating;
    this.setState({ values });
  }

  refetchQuery(bookId) {
    return [
      {
        query: fetchBook,
        variables: {
          bookId
        }
      }
    ];
  }

  addReview(value) {
    const { addReviewQuery, bookId } = this.props;
    const { rating, review } = value;
    if (!review.trim()) return toaster('error', 'Please leave a review');
    if (!rating) return toaster('error', 'Please leave a rating');
    addReviewQuery({
      variables: {
        ...value,
        bookId
      },
      refetchQueries: this.refetchQuery(bookId)
    }).then(() => {
      window.addEventListener('reset', this.handleClearForm());
      toaster('success', 'Review added successfully');
      const lastElement = document.getElementById('lastElement');
      return lastElement && lastElement.scrollIntoView();
    }).catch((error) => {
      const messages = errorHandler(error);
      messages.forEach(message => toaster('error', message));
    });
  }

  addReply(value) {
    const { addReplyQuery, bookId } = this.props;
    addReplyQuery({
      variables: {
        ...value
      },
      refetchQueries: this.refetchQuery(bookId)
    }).then(() => {
      window.addEventListener('reset', this.handleClearForm());
      toaster('success', 'Reply added successfully');
    });
  }

  editReply(value) {
    const { editReplyQuery, setReplyToEdit, bookId } = this.props;
    value.replyId = setReplyToEdit;
    editReplyQuery({
      variables: {
        ...value
      },
      refetchQueries: this.refetchQuery(bookId)
    }).then(() => {
      window.addEventListener('reset', this.handleClearForm());
      toaster('success', 'Reply edited successfully');
    });
  }

  editReview(value) {
    const { editReviewQuery } = this.props;
    editReviewQuery({
      variables: {
        ...value
      }
    }).then(() => {
      window.addEventListener('reset', this.handleClearForm());
      toaster('success', 'Review edited successfully');
    });
  }

  handleClearForm() {
    const { values } = this.state;
    const { reviewType } = this.props;
    const {
      handleToggleForm
    } = this.props;
    values.reply = null;
    values.review = null;
    values.rating = null;

    if (!reviewType.match('add')) handleToggleForm(values.reviewId)();
    return this.setState({ values });
  }

  fixControlledValue(value) {
    if (typeof value === 'undefined' || value === null) {
      return '';
    }
    return value;
  }

  calculateInputName() {
    const name = {
      add: 'review',
      reply: 'reply',
      replyEdit: 'replyEdit',
      reviewEdit: 'reviewEdit'
    };

    return name;
  }

  toggleForm() {
    const {
      toggleForm, reviewType, reviewFormId, setReplyToEdit,
      reviewToReply, setReviewToEdit, itemOnEdit
    } = this.props;
    switch (reviewType) {
      case 'reply':
        return reviewType.match('reply')
        && toggleForm
        && reviewFormId === reviewToReply
          ? 'block' : 'none';

      case 'replyEdit':
        return reviewType.match('replyEdit')
        && toggleForm
        && setReplyToEdit === itemOnEdit
          ? 'block' : 'none';

      case 'reviewEdit':
        return reviewType.match('reviewEdit')
        && toggleForm
        && setReviewToEdit === itemOnEdit
          ? 'block' : 'none';

      default:
        return 'block';
    }
  }

  renderStars() {
    const { reviewType } = this.props;
    const { values: { rating } } = this.state;
    const starOptions = ['reply', 'replyEdit'];
    return (
      <span>
        { !starOptions.includes(reviewType) && (
        <ReactStars
          count={5}
          size={17}
          color2="#ffaf00"
          onChange={this.ratingChanged}
          value={rating}
        />
        )}
      </span>
    );
  }

  renderActionButtons() {
    const {
      handleToggleForm, reviewType, reviewToReply
    } = this.props;
    const allReviewType = ['reply', 'replyEdit', 'reviewEdit'];
    return (
      <div>
        { allReviewType.includes(reviewType) && (
        <button
          id="cancelButton"
          type="button"
          className="btn btn-default btn-raised cancel-button"
          onClick={handleToggleForm(reviewToReply)}
        >
        Cancel
        </button>
        ) }
        <button
          type="button"
          className="btn btn-primary btn-raised submit-button"
          onClick={this.handleFormSubmission()}
        >
        Submit
        </button>
      </div>
    );
  }

  renderForm() {
    const {
      values: {
        reply, review, replyEdit, reviewToEdit
      }
    } = this.state;
    const { reviewType } = this.props;
    const inputName = this.calculateInputName();
    return (
      <form
        className="review-form"
        style={{ display: `${this.toggleForm()}` }}
      >
        <div
          className="form-group"
          style={{
            paddingTop: `${(reviewType.toLowerCase().includes('edit')) && 0}`
          }}
        >
          { ['add'].includes(reviewType) && (
            <label htmlFor="exampleFormControlTextarea1">
            Leave a review
            </label>
          )}
          <textarea
            name={inputName[`${reviewType}`]}
            value={this.fixControlledValue(reply || review || replyEdit || reviewToEdit)}
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            onChange={this.handleInputChange}
            onReset={this.handleClearForm}
          />
        </div>
        <span className="add-review-footer">
          {this.renderStars()}
          {this.renderActionButtons()}
        </span>
      </form>
    );
  }

  render() {
    return (
      <Fragment>
        {this.renderForm()}
      </Fragment>
    );
  }
}

AddReview.propTypes = {
  toggleForm: PropTypes.bool,
  reviewType: PropTypes.string,
  handleToggleForm: PropTypes.func,
  addReviewQuery: PropTypes.func,
  addReplyQuery: PropTypes.func,
  editReplyQuery: PropTypes.func,
  editReviewQuery: PropTypes.func,
  ownerOfReview: PropTypes.string,
  replyToEdit: PropTypes.string,
  reviewToEdit: PropTypes.string,
  reviewToReply: PropTypes.string,
  reviewFormId: PropTypes.string,
  itemOnEdit: PropTypes.string,
  setReviewToEdit: PropTypes.string,
  setReplyToEdit: PropTypes.string,
  bookId: PropTypes.string
};

AddReview.defaultProps = {
  toggleForm: false,
  reviewType: '',
  handleToggleForm: () => {},
  addReviewQuery: () => {},
  addReplyQuery: () => {},
  editReplyQuery: () => {},
  editReviewQuery: () => {},
  ownerOfReview: '',
  replyToEdit: '',
  reviewToEdit: '',
  reviewToReply: '',
  reviewFormId: '',
  itemOnEdit: '',
  setReviewToEdit: '',
  setReplyToEdit: '',
  bookId: ''
};

export default compose(
  graphql(addReview, { name: 'addReviewQuery' }),
  graphql(addReply, { name: 'addReplyQuery' }),
  graphql(editReply, { name: 'editReplyQuery' }),
  graphql(editReview, { name: 'editReviewQuery' }),
)(AddReview);
