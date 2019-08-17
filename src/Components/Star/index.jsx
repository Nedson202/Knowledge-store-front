import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import ReactStars from 'react-stars';

const Star = (props) => {
  const { value, editable } = props;
  return (
    <Fragment>
      <ReactStars
        count={5}
        size={15}
        value={value}
        color2="#ffaf00"
        half
        edit={editable}
      />
    </Fragment>
  );
};

Star.propTypes = {
  value: PropTypes.number,
  editable: PropTypes.bool,
};

Star.defaultProps = {
  value: 0,
  editable: false,
};

export default Star;
