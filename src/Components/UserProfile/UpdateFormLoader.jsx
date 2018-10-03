import React, { Component, Fragment } from 'react';
import Skeleton from 'react-skeleton-loader';
import './_UserProfile.scss';

class UpdateForm extends Component {
  render() {
    return (
      <Fragment>
        <Skeleton color="#efefef" width="220px" height="200px" borderRadius="50%" count={1} />
        <div>
          <form>
            <div className="form-group">
              <Skeleton color="#efefef" count={1} width="100%" height="65px" />
            </div>
            <div className="form-group">
              <Skeleton color="#efefef" count={1} width="100%" height="65px" />
            </div>
            <div className="form-group skeleton-button">
              <Skeleton color="#efefef" count={1} width="40%" height="45px" />
            </div>
          </form>
        </div>
      </Fragment>
    );
  }
}

export default UpdateForm;
