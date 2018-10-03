import React, { Fragment, PureComponent } from 'react';
import { Spin, Icon } from 'antd';

class Spinner extends PureComponent {
  render() {
    const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
    return (
      <Fragment>
        <Spin indicator={antIcon} />
      </Fragment>
    );
  }
}

export default Spinner;
