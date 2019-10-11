import dotenv from 'dotenv';

import { PRODUCTION } from '../settings';

dotenv.config();

const socialAuthentication = type => () => {
  const redirectUrl = process.env.REACT_APP_NODE_ENV.match(PRODUCTION)
    ? process.env.REACT_APP_PROD_SERVER : process.env.REACT_APP_LOCAL_SERVER;

  window.location.replace(`${redirectUrl}/auth/${type}`);
};

export default socialAuthentication;
