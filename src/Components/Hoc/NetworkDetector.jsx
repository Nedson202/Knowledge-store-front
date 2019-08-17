import React, { Component } from 'react';
import toaster from '../../utils/toast';

export default function (ComposedComponent) {
  class NetworkDetector extends Component {
    componentDidMount() {
      window.addEventListener('load', () => {
        window.addEventListener('online', this.updateOnlineStatus);
        window.addEventListener('offline', this.updateOnlineStatus);
      });
    }

    componentWillUnmount() {
      window.removeEventListener('load', () => {
        window.removeEventListener('online', this.updateOnlineStatus);
        window.removeEventListener('offline', this.updateOnlineStatus);
      });
    }

    updateOnlineStatus = () => {
      const condition = navigator.onLine ? 'online' : 'offline';
      if (condition === 'online') {
        return toaster('success', 'You are back online');
      }
      return toaster('error', 'You are no longer online');
    }

    render() {
      return (
        <ComposedComponent {...this.props} />
      );
    }
  }

  return NetworkDetector;
}
