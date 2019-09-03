import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import './_ReplyCard.scss';
import AddReview from '../AddReview';
import timeParser from '../../utils/timeParser';
import Avatar from './Avatar';

class ReplyCard extends Component {
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

  renderReplyFooter(likes, id, userId) {
    const {
      handleToggleForm, handleReplyEdit, reviewId, deleteReply, user
    } = this.props;
    return (
      <div className="footer">
        <p>
          <ion-icon
            name="thumbs-up"
          />
          <span style={{ cursor: 'default', paddingLeft: '10px' }}>{likes !== 0 && likes}</span>
        </p>
        <p onClick={handleToggleForm(reviewId)}>Reply</p>
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
      replier, picture, createdAt, reply, likes, id, userId, avatarColor
    } = userReply;
    return (
      <div className="reply-card" key={id}>
        {picture ? this.renderReviewerImage(picture)
          : <Avatar user={replier} color={avatarColor} />}
        <div>
          <p>
            <b className="text-capitalize">{replier}</b>
            {' '}
            {this.renderReplyTime(createdAt)}
          </p>
          {(!isEditFormOpen || id !== setReplyToEdit) && (
            <span>
              <p>
                {reply}
              </p>
              {this.renderReplyFooter(likes, id, userId)}
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
      <AddReview
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
  isEditFormOpen: false,
  reviewType: '',
  replies: [],
  reviewId: '',
  setReplyToEdit: '',
  user: {},
};


export default ReplyCard;
