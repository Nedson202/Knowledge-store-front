import React, { Component, Fragment } from 'react';

import {
  LOAD, ONLINE, OFFLINE, DESTROY_INTERNET_BANNER
} from '../../settings';

export default function (ComposedComponent) {
  class NetworkDetector extends Component {
    state = {
      connectionMessage: '',
      online: false,
    }

    componentDidMount() {
      window.addEventListener(LOAD, () => {
        window.addEventListener(ONLINE, this.updateOnlineStatus);
        window.addEventListener(OFFLINE, this.updateOnlineStatus);
      });
    }

    shouldComponentUpdate() {
      this.registerDestroyBanner();

      return true;
    }

    componentWillUnmount() {
      window.removeEventListener(LOAD, () => {
        window.removeEventListener(ONLINE, this.updateOnlineStatus);
        window.removeEventListener(OFFLINE, this.updateOnlineStatus);
      });
    }

    updateOnlineStatus = () => {
      const browserOnline = navigator.onLine;
      let message;

      if (browserOnline) {
        message = 'You are back online';
      } else {
        message = 'You are offline';
      }

      this.setState({
        connectionMessage: message,
        online: browserOnline
      });
    }

    registerDestroyBanner = () => {
      setTimeout(() => {
        const { online } = this.state;

        if (online) {
          this.setState({ connectionMessage: '' });
        }
      }, DESTROY_INTERNET_BANNER);
    }

    renderConnectionMessage() {
      const { connectionMessage } = this.state;

      if (!connectionMessage) {
        return;
      }

      return <div className="internet-connection">{connectionMessage}</div>;
    }

    render() {
      return (
        <Fragment>
          <ComposedComponent {...this.props} />
          {this.renderConnectionMessage()}
        </Fragment>
      );
    }
  }

  return NetworkDetector;
}
