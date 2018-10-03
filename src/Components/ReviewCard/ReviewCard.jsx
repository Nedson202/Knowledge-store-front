import React, { Component, Fragment } from 'react';
import scrollToComponent from 'react-scroll-to-component';
import image from '../../assets/beverage-books.jpg';
import './_ReviewCard.scss';
import ReplyCard from './ReplyCard';
import AddReview from '../AddReview/AddReview';
import Star from '../Star/Star';

class ReviewCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isReplyFormOpen: false,
      isEditFormOpen: false,
      isReviewEditFormOpen: false,
      reviewType: 'reply',
    };
  }

  toggleReplyDialog = () => {
    this.setState(prevState => ({
      isReplyFormOpen: !prevState.isReplyFormOpen,
    }), () => {
      const { isReplyFormOpen } = this.state;
      if (isReplyFormOpen) {
        scrollToComponent(this.Review,
          {
            offset: 0, align: 'middle', duration: 500
          });
      }
    });
  }

  toggleReplyEditForm = () => {
    this.setState(prevState => ({
      isEditFormOpen: !prevState.isEditFormOpen,
      reviewType: 'replyEdit',
    }));
  }

  toggleReviewEditForm = () => {
    this.setState(prevState => ({
      isReviewEditFormOpen: !prevState.isReviewEditFormOpen,
      reviewType: 'reviewEdit',
    }));
  }

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

  renderReviewEditForm = (message) => {
    const { isReviewEditFormOpen, reviewType } = this.state;
    return (
      <AddReview
        toggleForm={isReviewEditFormOpen}
        reviewType={reviewType}
        handleToggleForm={this.toggleReviewEditForm}
        replyToEdit={message}
      />
    );
  }

  renderStars() {
    return (
      <span>
        <Star />
      </span>
    );
  }

  renderTimeReviewed() {
    return (
      <span style={{ paddingLeft: '10px' }}>
        a few seconds ago
      </span>
    );
  }

  renderReviewBody() {
    const { isReviewEditFormOpen } = this.state;
    return (
      <Fragment>
        <p>
          <b>Arangue Moyo</b>
          {' '}
          {this.renderTimeReviewed()}
        </p>
        { !isReviewEditFormOpen && (
        <span>
          <p>
          And that was how Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Nemo in tempora
          dicta consequatur ut quidem veritatis veniam pl
          aceat deleniti neque facere laborum, soluta alias libero
          exercitationem sint eius ullam debitis.
          </p>
          {this.renderStars()}
          {this.renderReviewFooter()}
        </span>
        )}
        {this.renderReviewEditForm('hellow')}
      </Fragment>
    );
  }

  renderReviewFooter() {
    return (
      <div className="footer">
        <p><i className="fas fa-thumbs-up" /></p>
        <p onClick={this.toggleReplyDialog}>Reply</p>
        <span className="reviewer-buttons">
          <p onClick={this.toggleReviewEditForm}>edit</p>
          <p className="danger">delete</p>
        </span>
      </div>);
  }

  renderReply() {
    const { reviewType, isEditFormOpen } = this.state;
    return (
      <ReplyCard
        isEditFormOpen={isEditFormOpen}
        reviewType={reviewType}
        handleToggleForm={this.toggleReplyDialog}
        handleReplyEdit={this.toggleReplyEditForm}
      />
    );
  }

  renderReplyForm() {
    const { isReplyFormOpen, reviewType } = this.state;
    return (
      <AddReview
        ref={(section) => { this.Review = section; }}
        toggleForm={isReplyFormOpen}
        reviewType={reviewType}
        handleToggleForm={this.toggleReplyDialog}
        ownerOfReview="michael"
      />);
  }

  render() {
    return (
      <Fragment>
        {this.renderReviewerImage()}
        <div>
          {this.renderReviewBody()}
          {/* {this.renderReviewFooter()} */}
          {this.renderReply()}
          <div id="dome">
            {this.renderReplyForm()}
          </div>
          {/* {this.renderReplyForm()} */}
        </div>
      </Fragment>
    );
  }
}

export default ReviewCard;
