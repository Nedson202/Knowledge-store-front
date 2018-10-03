import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import ReactStars from 'react-stars';
import './_AddReview.scss';

class AddReview extends Component {
  constructor(props) {
    super(props);
    const { ownerOfReview } = this.props;
    this.state = {
      reviewOwner: ownerOfReview.length ? `@${ownerOfReview}` : '' /* eslint-disable-line */
    };
  }

  handleInputChange = (event) => {
    const { value } = event.target;
    this.setState({ reviewOwner: value });
  }

  toggleForm() {
    const { toggleForm, reviewType } = this.props;
    switch (reviewType) {
      case 'reply':
        return reviewType.match('reply') && toggleForm ? 'block' : 'none';

      case 'replyEdit':
        return reviewType.match('replyEdit') && toggleForm ? 'block' : 'none';

      case 'reviewEdit':
        return reviewType.match('reviewEdit') && toggleForm ? 'block' : 'none';

      default:
        return 'block';
    }
  }

  renderStars() {
    const { reviewType } = this.props;
    return (
      <span>
        { !reviewType.match('reply') && (
        <ReactStars
          count={5}
          size={17}
          color2="#ffaf00"
        />
        )}
      </span>
    );
  }

  renderActionButtons() {
    const {
      handleToggleForm, reviewType
    } = this.props;
    return (
      <Fragment>
        { reviewType && (
        <button
          type="button"
          className="btn btn-default btn-raised cancel-button"
          onClick={handleToggleForm}
        >
        Cancel
        </button>
        ) }
        <button
          id="reviewForm"
          type="button"
          className="btn btn-primary btn-raised submit-button"
        >
        Submit
        </button>
      </Fragment>
    );
  }

  renderForm() {
    const { reviewOwner } = this.state;
    const { replyToEdit, reviewType } = this.props;
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
          // { !reviewType.toLowerCase().includes('edit') && (
          <label htmlFor="exampleFormControlTextarea1">
            Leave a review
          </label>
          )}
          <textarea
            name="reviewOwner"
            // value={reviewOwner || replyToEdit}
            defaultValue={reviewOwner || replyToEdit}
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            onChange={this.handleInputChange}
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
  ownerOfReview: PropTypes.string,
  replyToEdit: PropTypes.string,
};

AddReview.defaultProps = {
  toggleForm: false,
  reviewType: '',
  handleToggleForm: () => {},
  ownerOfReview: '',
  replyToEdit: '',
};

export default AddReview;
