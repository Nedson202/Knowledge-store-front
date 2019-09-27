import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import ReactStars from 'react-stars';
import { compose, graphql } from 'react-apollo';
import { connect } from 'react-redux';

import {
  addReview, editReview
} from '../../queries/reviews';
import {
  addReply, editReply,
} from '../../queries/reply';
import { toaster, errorHandler, modalToggler } from '../../utils';
import { fetchBook } from '../../queries/books';
import {
  REPLY, REPLY_EDIT, REVIEW_EDIT, TOASTR_ERROR, SUCCESS,
  RESET, REVIEW_WARNING, RATING_WARNING, REVIEW_SUCCESS, LAST_ELEMENT,
  REVIEW, BLOCK, NONE, ADD_REVIEW_QUERY, ADD_REPLY_QUERY, EDIT_REPLY_QUERY,
  EDIT_REVIEW_QUERY
} from '../../settings';

class ReviewForm extends Component {
  constructor(props) {
    super(props);

    const {
      ownerOfReview, replyToEdit, reviewToEdit,
      currentRating, reviewFormId,
    } = this.props;

    this.state = {
      values: {
        review: '',
        rating: currentRating || 0,
        reviewId: reviewFormId || '',
        replyId: '',
        reply: ownerOfReview.length ? `@${ownerOfReview}` : '',
        replyEdit: replyToEdit || '',
        reviewEdit: reviewToEdit || '',
      },
      bookId: '',
    };
  }

  componentDidMount() {
    const bookId = window.location.pathname.split('books/')[1];

    this.setState({ bookId });
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
      case REPLY:
        return this.addReply(values);

      case REPLY_EDIT:
        return this.editReply(values);

      case REVIEW_EDIT:
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

  addReview = async (value) => {
    const { bookId } = this.state;
    const { addReviewQuery, isAuthenticated } = this.props;
    const { rating, review } = value;

    if (!isAuthenticated) {
      return modalToggler('login-button');
    }
    if (!review.trim()) return toaster(TOASTR_ERROR, REVIEW_WARNING);
    if (!rating) return toaster(TOASTR_ERROR, RATING_WARNING);


    try {
      await addReviewQuery({
        variables: {
          ...value,
          bookId
        },
        refetchQueries: this.refetchQuery(bookId)
      });

      window.addEventListener(RESET, this.clearForm());
      toaster(SUCCESS, REVIEW_SUCCESS);
      const lastElement = document.getElementById(LAST_ELEMENT);
      return lastElement && lastElement.scrollIntoView();
    } catch (error) {
      const messages = errorHandler(error);
      messages.forEach(message => toaster(TOASTR_ERROR, message));
    }
  }

  editReview = async (value) => {
    const { bookId } = this.state;
    const { editReviewQuery, setReviewToEdit } = this.props;

    const { rating, reviewEdit } = value;

    value.reviewId = setReviewToEdit;
    if (!reviewEdit.trim()) return toaster(TOASTR_ERROR, REVIEW_WARNING);
    if (!rating) return toaster(TOASTR_ERROR, RATING_WARNING);

    try {
      await editReviewQuery({
        variables: {
          ...value
        },
        refetchQueries: this.refetchQuery(bookId)
      });

      window.addEventListener(RESET, this.clearForm());
    } catch (error) {
      console.error(error);
    }
  }

  addReply = async (value) => {
    const { bookId } = this.state;
    const { addReplyQuery } = this.props;

    try {
      await addReplyQuery({
        variables: {
          ...value
        },
        refetchQueries: this.refetchQuery(bookId)
      });

      window.addEventListener(RESET, this.clearForm());
    } catch (error) {
      console.error(error);
    }
  }

  editReply = async (value) => {
    const { bookId } = this.state;
    const { editReplyQuery, setReplyToEdit } = this.props;
    value.replyId = setReplyToEdit;

    try {
      await editReplyQuery({
        variables: {
          ...value
        },
        refetchQueries: this.refetchQuery(bookId)
      });

      window.addEventListener(RESET, this.clearForm());
    } catch (error) {
      console.error(error);
    }
  }

  refetchQuery(id) {
    return [
      {
        query: fetchBook,
        variables: {
          bookId: id,
        }
      }
    ];
  }

  clearForm() {
    const { values } = this.state;
    const { reviewType } = this.props;
    const {
      handleToggleForm
    } = this.props;
    values.reply = '';
    values.review = '';

    if (reviewType !== REVIEW) handleToggleForm('')();
    return this.setState({ values });
  }

  fixControlledValue(value) {
    if (typeof value === 'undefined' || value === null) {
      return '';
    }
    return value;
  }

  computeInputName() {
    const name = {
      review: REVIEW,
      reviewEdit: REVIEW_EDIT,
      reply: REPLY,
      replyEdit: REPLY_EDIT,
    };

    return name;
  }

  toggleForm() {
    const {
      toggleForm, reviewType, reviewFormId, setReplyToEdit,
      reviewToReply, setReviewToEdit, itemOnEdit
    } = this.props;
    switch (reviewType) {
      case REVIEW:
        return BLOCK;

      case REPLY:
        return toggleForm
          && reviewFormId === reviewToReply
          ? BLOCK : NONE;

      case REPLY_EDIT:
        return toggleForm
          && setReplyToEdit === itemOnEdit
          ? BLOCK : NONE;

      case REVIEW_EDIT:
        return toggleForm
          && setReviewToEdit === itemOnEdit
          ? BLOCK : NONE;

      default:
        return NONE;
    }
  }

  renderStars() {
    const { reviewType } = this.props;
    const { values: { rating } } = this.state;
    const starOptions = [REPLY, REPLY_EDIT];
    return (
      <span>
        {!starOptions.includes(reviewType) && (
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
    const allReviewType = [REPLY, REPLY_EDIT, REVIEW_EDIT];
    return (
      <div>
        {allReviewType.includes(reviewType) && (
          <button
            id="cancelButton"
            type="button"
            className="btn btn-default btn-raised cancel-button"
            onClick={handleToggleForm(reviewToReply)}
          >
            Cancel
          </button>
        )}
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
    const { values } = this.state;
    const { reviewType } = this.props;
    const inputName = this.computeInputName();

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
          {[REVIEW].includes(reviewType) && (
            <label htmlFor="review-form">
              Leave a review
            </label>
          )}
          <textarea
            name={inputName[`${reviewType}`]}
            value={this.fixControlledValue(values[reviewType])}
            className="form-control"
            rows="3"
            onChange={this.handleInputChange}
            onReset={this.clearForm}
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

ReviewForm.propTypes = {
  isAuthenticated: PropTypes.bool,
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
  currentRating: PropTypes.number,
};

ReviewForm.defaultProps = {
  isAuthenticated: false,
  toggleForm: false,
  reviewType: '',
  handleToggleForm: () => { },
  addReviewQuery: () => { },
  addReplyQuery: () => { },
  editReplyQuery: () => { },
  editReviewQuery: () => { },
  ownerOfReview: '',
  replyToEdit: '',
  reviewToEdit: '',
  reviewToReply: '',
  reviewFormId: '',
  itemOnEdit: '',
  setReviewToEdit: '',
  setReplyToEdit: '',
  currentRating: 0,
};

const mapStateToProps = ({ auth }) => ({
  isAuthenticated: auth.isAuthenticated,
});

export default compose(
  graphql(addReview, { name: ADD_REVIEW_QUERY }),
  graphql(editReview, { name: EDIT_REVIEW_QUERY }),
  graphql(addReply, { name: ADD_REPLY_QUERY }),
  graphql(editReply, { name: EDIT_REPLY_QUERY }),
  connect(mapStateToProps)
)(ReviewForm);
