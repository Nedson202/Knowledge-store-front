/* eslint-disable */
const socialAuthentication = type => () => {
  // const redirectUrl = 'http://localhost:3000';
  const redirectUrl = process.env.REACT_APP_NODE_ENV.match('production')
    ? process.env.REACT_APP_PROD_SERVER : process.env.REACT_APP_LOCAL_SERVER;
  window.location.replace(`${redirectUrl}/auth/${type}`);
};

export default socialAuthentication;