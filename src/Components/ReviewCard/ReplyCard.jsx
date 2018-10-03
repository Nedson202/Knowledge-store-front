import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import image from '../../assets/got.jpeg';
import './_ReplyCard.scss';
import AddReview from '../AddReview/AddReview';

class ReplyCard extends Component {
  renderReviewerImage() {
    return (
      <div>
        <img
          src={image}
          className="rounded-circle"
          alt="Card cap"
          style={{ width: '45px', height: '45px' }}
        />
      </div>
    );
  }

  renderReplyFooter() {
    const { handleToggleForm, handleReplyEdit } = this.props;
    return (
      <div className="footer">
        <p><i className="fas fa-thumbs-up" /></p>
        <p onClick={handleToggleForm}>Reply</p>
        <span className="reviewer-buttons">
          <p onClick={handleReplyEdit}>edit</p>
          <p className="danger">delete</p>
        </span>
      </div>
    );
  }

  renderReplyTime() {
    return (
      <span style={{ paddingLeft: '10px' }}>
        a few seconds ago
      </span>
    );
  }

  renderReply() {
    const { isEditFormOpen } = this.props;
    return (
      <div className="reply-card">
        {this.renderReviewerImage()}
        <div>
          <p>
            <b>Arangue Moyo</b>
            {' '}
            {this.renderReplyTime()}
          </p>
          { !isEditFormOpen && (
          <span>
            <p>
              @arangue are you really sure.
            </p>
            {this.renderReplyFooter()}
          </span>
          ) }
          {this.renderReplyEditForm('@arangue are you really sure')}
        </div>
      </div>
    );
  }

  renderReplyEditForm(message) {
    const { isEditFormOpen, reviewType, handleReplyEdit } = this.props;
    return (
      <AddReview
        toggleForm={isEditFormOpen}
        reviewType={reviewType}
        handleToggleForm={handleReplyEdit}
        replyToEdit={message}
      />
    );
  }

  render() {
    return (
      <Fragment>
        {this.renderReply()}
      </Fragment>
    );
  }
}

ReplyCard.propTypes = {
  handleToggleForm: PropTypes.func,
  handleReplyEdit: PropTypes.func,
  isEditFormOpen: PropTypes.bool,
  reviewType: PropTypes.string,
};

ReplyCard.defaultProps = {
  handleToggleForm: () => {},
  handleReplyEdit: () => {},
  isEditFormOpen: false,
  reviewType: '',
};


export default ReplyCard;
