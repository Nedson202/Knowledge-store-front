import React, { Fragment, PureComponent } from 'react';
import { Spin, Icon } from 'antd';
import PropTypes from 'prop-types';

class Spinner extends PureComponent {
  render() {
    const { style } = this.props;
    const antIcon = <Icon type="loading" style={{ fontSize: style || 24 }} spin />;
    return (
      <Fragment>
        <Spin indicator={antIcon} />
      </Fragment>
    );
  }
}

Spinner.propTypes = {
  style: PropTypes.number
};

Spinner.defaultProps = {
  style: 24
};

export default Spinner;
