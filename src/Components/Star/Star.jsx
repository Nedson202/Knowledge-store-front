import React, { Component, Fragment } from 'react';
import ReactStars from 'react-stars';

class Star extends Component {
  render() {
    return (
      <Fragment>
        <ReactStars
          count={5}
          size={15}
          value={0}
          color2="#ffaf00"
        />
      </Fragment>
    );
  }
}

export default Star;
