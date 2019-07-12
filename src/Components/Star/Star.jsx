import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import ReactStars from 'react-stars';

const Star = (props) => {
  const { value } = props;
  return (
    <Fragment>
      <ReactStars count={5} size={15} value={value} color2="#ffaf00" half />
    </Fragment>
  );
};

Star.propTypes = {
  value: PropTypes.number,
};

Star.defaultProps = {
  value: 0
};

export default Star;
