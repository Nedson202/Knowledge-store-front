import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Avatar extends Component {
  arrayShuffler = (array) => {
    let currentIndex = array.length, temporaryValue, randomIndex;
    // While there remain elements to shuffle...
    while (currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array[0];
  }

  renderInitials(reviewer) {
    const matches = reviewer.match(/\b(\w)/g);
    const acronym = matches.join('');
    const color = this.arrayShuffler(['red', 'green', 'blue', 'white']);
    return (
      <div className="avatar-placeholder" style={{ backgroundColor: color }}>{acronym}</div>
    );
  }

  render() {
    const { reviewer } = this.props;
    return (
      <div>
        {this.renderInitials(reviewer)}
      </div>
    );
  }
}

Avatar.propTypes = {
  reviewer: PropTypes.func,
};

Avatar.defaultProps = {
  reviewer: '',
};

export default Avatar;
