import React, { Component } from 'react';
import toaster from '../../utils/toast';
import {
  SUCCESS, TOASTR_ERROR, LOAD, ONLINE,
  OFFLINE
} from '../../defaults';

export default function (ComposedComponent) {
  class NetworkDetector extends Component {
    componentDidMount() {
      window.addEventListener(LOAD, () => {
        window.addEventListener(ONLINE, this.updateOnlineStatus);
        window.addEventListener(OFFLINE, this.updateOnlineStatus);
      });
    }

    componentWillUnmount() {
      window.removeEventListener(LOAD, () => {
        window.removeEventListener(ONLINE, this.updateOnlineStatus);
        window.removeEventListener(OFFLINE, this.updateOnlineStatus);
      });
    }

    updateOnlineStatus = () => {
      const condition = navigator.onLine ? ONLINE : OFFLINE;
      if (condition === ONLINE) {
        return toaster(SUCCESS, 'You are back online');
      }
      return toaster(TOASTR_ERROR, 'You are no longer online');
    }

    render() {
      return (
        <ComposedComponent {...this.props} />
      );
    }
  }

  return NetworkDetector;
}
