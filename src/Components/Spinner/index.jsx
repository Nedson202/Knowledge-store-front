import React, { Fragment } from 'react';
import { Spin, Icon } from 'antd';
import PropTypes from 'prop-types';

const Spinner = (props) => {
  const { spinnerStyle } = props;
  const antIcon = (
    <Icon
      type="loading"
      style={{ fontSize: spinnerStyle, color: '#005C97' }}
      spin
    />
  );
  return (
    <Fragment>
      <Spin indicator={antIcon} />
    </Fragment>
  );
};

Spinner.propTypes = {
  spinnerStyle: PropTypes.number
};

Spinner.defaultProps = {
  spinnerStyle: 24
};

export default Spinner;