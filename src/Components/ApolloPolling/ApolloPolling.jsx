import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { LOAD, ONLINE } from '../../settings/defaults';

class ApolloPolling extends Component {
  componentDidMount() {
    const { stopPolling } = this.props;

    stopPolling();

    window.addEventListener(LOAD, () => {
      window.addEventListener(ONLINE, this.activatePolling);
    });
  }

  componentWillUnmount() {
    window.removeEventListener(LOAD, () => {
      window.removeEventListener(ONLINE, this.activatePolling);
    });
  }

  activatePolling = () => {
    const { startPolling, stopPolling } = this.props;
    const STOP_POLLING_AFTER = 5000;
    const POLL_INTERVAL = 2000;

    startPolling(POLL_INTERVAL);

    setTimeout(() => {
      stopPolling();
    }, STOP_POLLING_AFTER);
  }

  render() {
    return <></>;
  }
}

ApolloPolling.propTypes = {
  startPolling: PropTypes.func,
  stopPolling: PropTypes.func,
};

ApolloPolling.defaultProps = {
  startPolling: () => { },
  stopPolling: () => { },
};

export default ApolloPolling;
