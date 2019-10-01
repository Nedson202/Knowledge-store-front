import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import ReactStars from 'react-stars';

const Star = (props) => {
  const { value, editable, size } = props;

  return (
    <Fragment>
      <ReactStars
        count={5}
        size={size}
        value={value}
        color1="rgba(0, 0, 0, 0.7)"
        color2="#ffaf00"
        half
        edit={editable}
      />
    </Fragment>
  );
};

Star.propTypes = {
  value: PropTypes.number,
  size: PropTypes.number,
  editable: PropTypes.bool,
};

Star.defaultProps = {
  value: 0,
  size: 15,
  editable: false,
};

export default Star;
