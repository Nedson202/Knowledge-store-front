import { PRODUCTION } from '../settings/defaults';

/* eslint-disable */
const socialAuthentication = type => () => {
  const redirectUrl = process.env.REACT_APP_NODE_ENV.match(PRODUCTION)
    ? process.env.REACT_APP_PROD_SERVER : process.env.REACT_APP_LOCAL_SERVER;
  window.location.replace(`${redirectUrl}/auth/${type}`);
};

export default socialAuthentication;
