import React from 'react';

const UnsplashMention = () => (
  <a
    className="unsplash-mention"
    href="https://unsplash.com/@martinadams?utm_medium=referral&utm_campaign=photographer-credit&utm_content=creditBadge"
    target="_blank"
    rel="noopener noreferrer"
    title="Download free do whatever you want high-resolution photos from Martin Adams"
  >
    <span style={{ display: 'inline-block', padding: '2px 3px' }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        style={{
          height: '12px',
          width: 'auto',
          position: 'relative',
          verticalAlign: 'middle',
          top: '-2px',
          fill: 'black'
        }}
        viewBox="0 0 32 32"
      >
        <title> unsplash - logo</title>
        <path d="M10 9V0h12v9H10zm12 5h10v18H0V14h10v9h12v-9z" />
      </svg>

    </span>
    <span style={{
      display: 'inline-block',
      padding: '2px 3px'
    }}
    >
      Martin Adams
    </span>
  </a>
);

export default UnsplashMention;
