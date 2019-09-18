import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';

import ReviewForm from '../ReviewForm';
import Avatar from './Avatar';

import timeParser from '../../utils/timeParser';

class ReplyCard extends PureComponent {
  renderReviewerImage(picture) {
    return (
      <div>
        <img
          src={picture}
          className="rounded-circle"
          alt="Card cap"
          style={{ width: '45px', height: '45px' }}
        />
      </div>
    );
  }

  renderReplyFooter(likes, repliesLikedBy, id, userId) {
    const {
      handleToggleForm, handleReplyEdit, reviewId, deleteReply, user,
      handleReplyLikeToggle,
    } = this.props;

    const users = repliesLikedBy ? JSON.parse(JSON.stringify(repliesLikedBy))
      : [];

    return (
      <div className="footer">
        <p onClick={handleReplyLikeToggle(id)}>
          {likes !== 0 && <span className="like-count">{likes}</span>}
          <ion-icon
            name="thumbs-up"
            style={{ color: users.includes(user.id) && '#005C97' }}
          />
        </p>
        <p onClick={handleToggleForm(reviewId)}>reply</p>
        {user.id && user.id.match(userId) && (
          <span className="reviewer-buttons">
            <p onClick={handleReplyEdit(id)}>edit</p>
            <p className="danger" onClick={deleteReply(id)}>delete</p>
          </span>
        )}
      </div>
    );
  }

  renderReplyTime(date) {
    return (
      <span style={{ paddingLeft: '10px' }}>
        {timeParser(date)}
      </span>
    );
  }

  renderReply(userReply, setReplyToEdit) {
    const { isEditFormOpen } = this.props;
    const {
      replier, picture, updatedAt, reply, likes, id, userId,
      avatarColor, repliesLikedBy
    } = userReply;

    return (
      <div className="reply-card" key={id}>
        {picture ? this.renderReviewerImage(picture)
          : <Avatar user={replier} color={avatarColor} />}
        <div>
          <p>
            <b className="text-capitalize">{replier}</b>
            {' '}
            {this.renderReplyTime(updatedAt)}
          </p>
          {(!isEditFormOpen || id !== setReplyToEdit) && (
            <span>
              <p>
                {reply}
              </p>
              {this.renderReplyFooter(likes, repliesLikedBy, id, userId)}
            </span>
          )}
          {this.renderReplyEditForm(reply, id)}
        </div>
      </div>
    );
  }

  renderReplyEditForm(message, id) {
    const {
      isEditFormOpen, reviewType, handleReplyEdit,
      setReplyToEdit
    } = this.props;

    return (
      <ReviewForm
        toggleForm={isEditFormOpen}
        reviewType={reviewType}
        handleToggleForm={handleReplyEdit}
        replyToEdit={message}
        setReplyToEdit={setReplyToEdit}
        itemOnEdit={id}
      />
    );
  }

  render() {
    const { replies, setReplyToEdit } = this.props;

    return (
      <Fragment>
        {
          replies.length !== 0 && replies.map(reply => (
            this.renderReply(reply, setReplyToEdit)
          ))
        }
      </Fragment>
    );
  }
}

ReplyCard.propTypes = {
  handleToggleForm: PropTypes.func,
  handleReplyEdit: PropTypes.func,
  deleteReply: PropTypes.func,
  handleReplyLikeToggle: PropTypes.func,
  isEditFormOpen: PropTypes.bool,
  reviewType: PropTypes.string,
  replies: PropTypes.array,
  reviewId: PropTypes.string,
  setReplyToEdit: PropTypes.string,
  user: PropTypes.object,
};

ReplyCard.defaultProps = {
  handleToggleForm: () => { },
  handleReplyEdit: () => { },
  deleteReply: () => { },
  handleReplyLikeToggle: () => { },
  isEditFormOpen: false,
  reviewType: '',
  replies: [],
  reviewId: '',
  setReplyToEdit: '',
  user: {},
};


export default ReplyCard;
