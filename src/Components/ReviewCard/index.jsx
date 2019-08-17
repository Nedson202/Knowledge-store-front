import React, { Component, Fragment } from 'react';
import scrollToComponent from 'react-scroll-to-component';
import { compose, graphql } from 'react-apollo';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './_ReviewCard.scss';
import ReplyCard from './ReplyCard';
import AddReview from '../AddReview';
import Star from '../Star';
import { addLikeOnReview, deleteReview, deleteReply } from '../../queries/reviews';
import timeParser from '../../utils/timeParser';
import Avatar from './Avatar';
import { fetchBook } from '../../queries/books';
import toaster from '../../utils/toast';
import errorHandler from '../../utils/errorHandler';
import toHTTPS from '../../utils/toHTTPS';

class ReviewCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isReplyFormOpen: false,
      isEditFormOpen: false,
      isReviewEditFormOpen: false,
      reviewType: 'reply',
      reviewId: '',
      reviewToReply: '',
      setReviewToEdit: '',
      setReplyToEdit: '',
      reviewFormId: '', /* eslint-disable-line */
    };
  }

  toggleReplyDialog = id => () => {
    this.setState(prevState => ({
      isReplyFormOpen: !prevState.isReplyFormOpen,
      reviewType: 'reply',
      reviewToReply: id,
      reviewFormId: id,
    }), () => {
      const { isReplyFormOpen } = this.state;
      if (isReplyFormOpen) {
        scrollToComponent(this.Review,
          {
            offset: 500, align: 'middle', duration: 500
          });
      }
    });
  }

  toggleReplyEditForm = id => () => {
    this.setState(prevState => ({
      isEditFormOpen: !prevState.isEditFormOpen,
      reviewType: 'replyEdit',
      setReplyToEdit: id,
    }));
  }

  toggleReviewEditForm = id => () => {
    this.setState(prevState => ({
      isReviewEditFormOpen: !prevState.isReviewEditFormOpen,
      reviewType: 'reviewEdit',
      setReviewToEdit: id,
    }));
  }

  setReviewToLike = reviewId => () => {
    this.setState({ reviewId }, () => {
      this.addLike(1);
    });
  }

  deleteReview = reviewId => () => {
    const { deleteReviewQuery, bookId } = this.props;
    deleteReviewQuery({
      variables: {
        reviewId,
      },
      refetchQueries: this.refetchData(bookId)
    }).then(() => {
      toaster('success', 'Review deleted successfully');
    }).catch((error) => {
      const messages = errorHandler(error);
      messages.forEach(message => toaster('error', message));
    });
  }

  deleteReply = replyId => () => {
    const { deleteReplyQuery, bookId } = this.props;
    deleteReplyQuery({
      variables: {
        replyId,
      },
      refetchQueries: this.refetchData(bookId)
    }).then(() => {
      toaster('success', 'Reply deleted successfully');
    }).catch((error) => {
      const messages = errorHandler(error);
      messages.forEach(message => toaster('error', message));
    });
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

  addLike(like) {
    const { reviewId } = this.state;
    const { addLikeQuery } = this.props;
    addLikeQuery({
      variables: {
        reviewId,
        like,
      }
    });
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

  renderReviewEditForm = (message, id) => {
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
      <span style={{ paddingLeft: '10px' }}>
        {timeParser(date)}
      </span>
    );
  }

  renderReviewBody(userReview) {
    const {
      reviewer, createdAt, review, rating, id
    } = userReview;
    const { isReviewEditFormOpen, setReviewToEdit, } = this.state;
    return (
      <Fragment>
        <p>
          <b className="text-capitalize">{reviewer}</b>
          {' '}
          {this.renderTimeReviewed(createdAt)}
        </p>
        {(!isReviewEditFormOpen || id !== setReviewToEdit) && (
          <span id="review">
            {review}
            {this.renderStars(rating)}
            {this.renderReviewFooter(userReview)}
          </span>
        )}
        {this.renderReviewEditForm(review, id)}
      </Fragment>
    );
  }

  renderReviewFooter(userReview) {
    const { likes, id, userId } = userReview;
    const { user } = this.props;
    return (
      <div className="footer">
        <p onClick={this.setReviewToLike(id)}>
          <i className="fas fa-thumbs-up" style={{ color: likes && '#005C97' }} />
          <span style={{ cursor: 'default', paddingLeft: '10px' }}>{likes !== 0 && likes}</span>
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
  graphql(addLikeOnReview, { name: 'addLikeQuery' }),
  graphql(deleteReview, { name: 'deleteReviewQuery' }),
  graphql(deleteReply, { name: 'deleteReplyQuery' }),
  connect(mapStateToProps),
)(ReviewCard);
