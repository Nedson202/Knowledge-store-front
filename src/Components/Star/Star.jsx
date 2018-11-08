import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import ReactStars from 'react-stars';

class Star extends Component {
  render() {
    const { value } = this.props;
    return (
      <Fragment>
        <ReactStars
          count={5}
          size={15}
          value={value}
          color2="#ffaf00"
          half
        />
      </Fragment>
    );
  }
}

Star.propTypes = {
  value: PropTypes.number,
};

Star.defaultProps = {
  value: 0
};

export default Star;
