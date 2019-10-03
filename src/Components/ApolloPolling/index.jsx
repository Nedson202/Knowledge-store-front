import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  LOAD, ONLINE, POLL_INTERVAL, STOP_POLLING_AFTER
} from '../../settings';

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
