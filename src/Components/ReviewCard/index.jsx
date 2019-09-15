import React, { Component, Fragment } from 'react';
import scrollToComponent from 'react-scroll-to-component';
import { compose, graphql } from 'react-apollo';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ReplyCard from './ReplyCard';
import AddReview from '../AddReview';
import Star from '../Star';
import Avatar from './Avatar';

import { toggleLikeOnReview, deleteReview, } from '../../queries/reviews';
import { toggleLikeOnReply, deleteReply } from '../../queries/reply';
import timeParser from '../../utils/timeParser';
import { fetchBook } from '../../queries/books';
import toaster from '../../utils/toast';
import errorHandler from '../../utils/errorHandler';
import toHTTPS from '../../utils/toHTTPS';
import {
  TOASTR_ERROR, REPLY, SCROLL_TO_PARAM, REPLY_EDIT,
  REVIEW_EDIT, DELETE_REPLY_QUERY, DELETE_REVIEW_QUERY, TOGGLE_LIKE_QUERY
} from '../../settings/defaults';

class ReviewCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isReplyFormOpen: false,
      isEditFormOpen: false,
      isReviewEditFormOpen: false,
      reviewType: '',
      reviewId: '',
      replyId: '',
      reviewToReply: '',
      setReviewToEdit: '',
      setReplyToEdit: '',
      reviewFormId: '',
    };
  }

  toggleReplyDialog = id => () => {
    this.setState(prevState => ({
      isReplyFormOpen: !prevState.isReplyFormOpen,
      reviewType: REPLY,
      reviewToReply: id,
      reviewFormId: id,
    }), () => {
      const { isReplyFormOpen } = this.state;
      if (isReplyFormOpen) {
        scrollToComponent(this.Review, SCROLL_TO_PARAM);
      }
    });
  }

  toggleReplyEditForm = id => () => {
    this.setState(prevState => ({
      isEditFormOpen: !prevState.isEditFormOpen,
      reviewType: REPLY_EDIT,
      setReplyToEdit: id,
    }));
  }

  toggleReviewEditForm = id => () => {
    this.setState(prevState => ({
      isReviewEditFormOpen: !prevState.isReviewEditFormOpen,
      reviewType: REVIEW_EDIT,
      setReviewToEdit: id,
    }));
  }

  toggleReviewLike = () => {
    const { reviewId } = this.state;
    const { toggleLikeQuery, bookId } = this.props;
    toggleLikeQuery({
      variables: {
        reviewId,
      },
      refetchQueries: this.refetchData(bookId)
    });
  }

  toggleReplyLike = () => {
    const { replyId } = this.state;
    const { toggleReplyLikeQuery, bookId } = this.props;
    toggleReplyLikeQuery({
      variables: {
        replyId,
      },
      refetchQueries: this.refetchData(bookId)
    });
  }

  handleReviewLikeToggle = reviewId => () => {
    this.setState({ reviewId }, () => {
      this.toggleReviewLike();
    });
  }

  handleReplyLikeToggle = replyId => () => {
    this.setState({ replyId }, () => {
      this.toggleReplyLike();
    });
  }

  deleteReview = reviewId => async () => {
    const { deleteReviewQuery, bookId } = this.props;

    try {
      await deleteReviewQuery({
        variables: {
          reviewId,
        },
        refetchQueries: this.refetchData(bookId)
      });
    } catch (error) {
      const messages = errorHandler(error);
      messages.forEach(message => toaster(TOASTR_ERROR, message));
    }
  }

  deleteReply = replyId => async () => {
    const { deleteReplyQuery, bookId } = this.props;

    try {
      await deleteReplyQuery({
        variables: {
          replyId,
        },
        refetchQueries: this.refetchData(bookId)
      });
    } catch (error) {
      const messages = errorHandler(error);
      messages.forEach(message => toaster(TOASTR_ERROR, message));
    }
  }

  refetchData(bookId) {
    return [
      {
        query: fetchBook,
        variables: {
          bookId
        }
      }
    ];
  }

  renderReviewerImage(image) {
    return (
      <div>
        <img
          src={toHTTPS(image)}
          className="rounded-circle"
          alt="Card cap"
          style={{ width: '45px', height: '45px' }}
        />
      </div>
    );
  }

  renderReviewEditForm = (message, rating, id) => {
    const {
      isReviewEditFormOpen, reviewType, setReviewToEdit, reviewFormId
    } = this.state;

    return (
      <AddReview
        toggleForm={isReviewEditFormOpen}
        reviewType={reviewType}
        handleToggleForm={this.toggleReviewEditForm}
        reviewToEdit={message}
        setReviewToEdit={setReviewToEdit}
        reviewFormId={reviewFormId}
        itemOnEdit={id}
        currentRating={rating}
      />
    );
  }

  renderStars(rating) {
    return (
      <div id="star-rating">
        <Star
          value={rating}
        />
      </div>
    );
  }

  renderTimeReviewed(date) {
    return (
      <div className="review-time">
        <p style={{ paddingLeft: '10px' }}>
          {timeParser(date)}
        </p>
      </div>
    );
  }

  renderReviewBody(userReview) {
    const {
      reviewer, createdAt, review, rating, id
    } = userReview;
    const { isReviewEditFormOpen, setReviewToEdit, } = this.state;
    return (
      <Fragment>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <p><b className="text-capitalize">{reviewer}</b></p>
          {this.renderStars(rating)}
          {this.renderTimeReviewed(createdAt)}
        </div>
        {(!isReviewEditFormOpen || id !== setReviewToEdit) && (
          <span id="review">
            {review}
            {this.renderReviewFooter(userReview)}
          </span>
        )}
        {this.renderReviewEditForm(review, rating, id)}
      </Fragment>
    );
  }

  renderReviewFooter(userReview) {
    const {
      likes, id, userId, reviewsLikedBy
    } = userReview;
    const { user } = this.props;

    const users = reviewsLikedBy ? JSON.parse(reviewsLikedBy) : [];

    return (
      <div className="footer">
        <p onClick={this.handleReviewLikeToggle(id)}>
          <ion-icon
            name="thumbs-up"
            style={{ color: users.includes(user.id) && '#005C97' }}
          />
          <span className="like-count">{likes !== 0 && likes}</span>
        </p>
        <p onClick={this.toggleReplyDialog(id)}>reply</p>
        {user.id && user.id.match(userId) && (
          <span className="reviewer-buttons">
            <p onClick={this.toggleReviewEditForm(id)}>edit</p>
            <p className="danger" onClick={this.deleteReview(id)}>delete</p>
          </span>
        )}
      </div>
    );
  }

  renderReply(userReview) {
    const { reviewType, isEditFormOpen, setReplyToEdit } = this.state;
    const { user } = this.props;
    const { replies, id } = userReview;
    return (
      <ReplyCard
        isEditFormOpen={isEditFormOpen}
        reviewType={reviewType}
        handleToggleForm={this.toggleReplyDialog}
        handleReplyEdit={this.toggleReplyEditForm}
        replies={replies}
        reviewId={id}
        deleteReply={this.deleteReply}
        setReplyToEdit={setReplyToEdit}
        user={user}
        handleReplyLikeToggle={this.handleReplyLikeToggle}
      />
    );
  }

  renderReplyForm(reviewFormId, bookId, reviewer) {
    const { isReplyFormOpen, reviewType, reviewToReply } = this.state;
    return (
      <AddReview
        ref={(section) => { this.Review = section; }}
        toggleForm={isReplyFormOpen}
        reviewType={reviewType}
        handleToggleForm={this.toggleReplyDialog}
        ownerOfReview={reviewer}
        reviewToReply={reviewToReply}
        reviewFormId={reviewFormId}
        bookId={bookId}
      />
    );
  }

  renderAll(userReview, bookId) {
    const {
      picture, id, avatarColor, reviewer
    } = userReview;
    return (
      <div className="review-card" key={id}>
        <div className="review-avatar">
          {
            picture.length
              ? this.renderReviewerImage(picture)
              : <Avatar user={reviewer} color={avatarColor} />
          }
        </div>
        <div className="review-details">
          {this.renderReviewBody(userReview)}
          {this.renderReply(userReview, id)}
          <div id="dome">
            {this.renderReplyForm(id, bookId, reviewer)}
          </div>
          <div id="lastElement" />
        </div>
      </div>
    );
  }

  render() {
    const { reviews, bookId } = this.props;
    return (
      <Fragment>
        {
          reviews.length !== 0 && reviews.map(review => (
            this.renderAll(review, bookId)
          ))
        }
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user
});

ReviewCard.propTypes = {
  toggleLikeQuery: PropTypes.func,
  toggleReplyLikeQuery: PropTypes.func,
  deleteReviewQuery: PropTypes.func,
  deleteReplyQuery: PropTypes.func,
  reviews: PropTypes.array,
  user: PropTypes.object,
  bookId: PropTypes.string,
};

ReviewCard.defaultProps = {
  toggleLikeQuery: () => { },
  toggleReplyLikeQuery: () => { },
  deleteReviewQuery: () => { },
  deleteReplyQuery: () => { },
  reviews: [],
  user: {},
  bookId: '',
};

export default compose(
  graphql(toggleLikeOnReview, { name: TOGGLE_LIKE_QUERY }),
  graphql(toggleLikeOnReply, { name: 'toggleReplyLikeQuery' }),
  graphql(deleteReview, { name: DELETE_REVIEW_QUERY }),
  graphql(deleteReply, { name: DELETE_REPLY_QUERY }),
  connect(mapStateToProps),
)(ReviewCard);
