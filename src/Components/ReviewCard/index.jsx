/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component, Fragment } from 'react';
import scrollToComponent from 'react-scroll-to-component';
import { compose, graphql } from 'react-apollo';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Truncate from 'react-truncate';

import './_ReviewCard.scss';
import ReplyCard from './ReplyCard';
import AddReview from '../AddReview';
import Star from '../Star';
import {
  addLikeOnReview, deleteReview,
  deleteReply
} from '../../queries/reviews';
import timeParser from '../../utils/timeParser';
import Avatar from './Avatar';
import { fetchBook } from '../../queries/books';
import toaster from '../../utils/toast';
import errorHandler from '../../utils/errorHandler';
import toHTTPS from '../../utils/toHTTPS';
import {
  TOASTR_ERROR, REPLY, SCROLL_TO_PARAM, REPLY_EDIT,
  REVIEW_EDIT, DELETE_REPLY_QUERY, DELETE_REVIEW_QUERY, ADD_LIKE_QUERY
} from '../../defaults';

class ReviewCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isReplyFormOpen: false,
      isEditFormOpen: false,
      isReviewEditFormOpen: false,
      reviewType: '',
      reviewId: '',
      reviewToReply: '',
      setReviewToEdit: '',
      setReplyToEdit: '',
      reviewFormId: '', /* eslint-disable-line */
      expanded: false,
      truncated: false,
      truncateId: '',
      expandedItem: [],
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

  setReviewToLike = reviewId => () => {
    this.setState({ reviewId }, () => {
      this.toggleLike();
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

  refetchData = bookId => [
    {
      query: fetchBook,
      variables: {
        bookId
      }
    }
  ]

  toggleLike = (like) => {
    const { reviewId } = this.state;
    const { addLikeQuery } = this.props;
    addLikeQuery({
      variables: {
        reviewId,
        like,
      }
    });
  }

  renderReviewerImage = image => (
    <div>
      <img
        src={toHTTPS(image)}
        className="rounded-circle"
        alt="Card cap"
        style={{ width: '45px', height: '45px' }}
      />
    </div>
  )

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

  renderStars = rating => (
    <div id="star-rating">
      <Star
        value={rating}
      />
    </div>
  )

  renderTimeReviewed = date => (
    <div className="review-time">
      <p style={{ paddingLeft: '10px' }}>
        {timeParser(date)}
      </p>
    </div>
  )

  toggleLines = (id, showLess, event) => {
    event.preventDefault();
    const { expanded, expandedItem } = this.state;
    if (!expandedItem.includes(id)) expandedItem.push(id);
    if (showLess) expandedItem.splice(expandedItem.indexOf(id), 1);
    this.setState({
      expanded: !expanded,
      truncateId: id,
      expandedItem
    });
  }

  handleTruncate = (truncatedText, id) => () => {
    const { truncated } = this.state;
    if (truncated !== truncatedText) {
      this.setState({
        truncated,
        truncateId: id
      });
    }
  }

  renderReviewBody(userReview) {
    const {
      reviewer, createdAt, review, rating, id
    } = userReview;
    const {
      isReviewEditFormOpen, setReviewToEdit, expanded,
      truncateId, expandedItem
    } = this.state;

    return (
      <Fragment>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <p><b className="text-capitalize">{reviewer}</b></p>
          {this.renderStars(rating)}
          {this.renderTimeReviewed(createdAt)}
        </div>
        {(!isReviewEditFormOpen || id !== setReviewToEdit) && (
          <span id="review">
            <Truncate
              key={id}
              lines={expandedItem.includes(id) ? null : 4}
              ellipsis={(
                <span>
                  ...
                  {' '}
                  {!(expanded && truncateId === id)
                    ? (
                      <a href="" onClick={e => this.toggleLines(id, false, e)}>
                        Read more
                      </a>
                    ) : null}
                </span>
              )}
              onTruncate={this.handleTruncate}
            >
              {review}
            </Truncate>
            {expandedItem.includes(id) && (
              <span>
                ...
                {' '}
                <a href="#" onClick={e => this.toggleLines(id, true, e)}>Show less</a>
              </span>
            )}
            {this.renderReviewFooter(userReview)}
          </span>
        )}
        {this.renderReviewEditForm(review, rating, id)}
      </Fragment>
    );
  }

  renderReviewFooter(userReview) {
    const { likes, id, userId } = userReview;
    const { user } = this.props;
    return (
      <div className="footer">
        <p onClick={this.setReviewToLike(id)}>
          <ion-icon
            name="thumbs-up"
            style={{ color: likes && '#005C97' }}
          />
          <span className="like-count">{likes !== 0 && likes}</span>
        </p>
        <p onClick={this.toggleReplyDialog(id)}>Reply</p>
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
  addLikeQuery: PropTypes.func,
  deleteReviewQuery: PropTypes.func,
  deleteReplyQuery: PropTypes.func,
  reviews: PropTypes.array,
  user: PropTypes.object,
  bookId: PropTypes.string,
};

ReviewCard.defaultProps = {
  addLikeQuery: () => { },
  deleteReviewQuery: () => { },
  deleteReplyQuery: () => { },
  reviews: [],
  user: {},
  bookId: '',
};

export default compose(
  graphql(addLikeOnReview, { name: ADD_LIKE_QUERY }),
  graphql(deleteReview, { name: DELETE_REVIEW_QUERY }),
  graphql(deleteReply, { name: DELETE_REPLY_QUERY }),
  connect(mapStateToProps),
)(ReviewCard);
