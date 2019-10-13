import dotenv from 'dotenv';

import { PRODUCTION } from '../settings';

dotenv.config();

const socialAuthentication = type => () => {
  const environment = {
    development: 'http://localhost:4000',
    production: 'https://lorester-bookstore-server.herokuapp.com'
  };
  let redirectUrl = environment.development;

  if (process.env.REACT_APP_NODE_ENV && process.env.REACT_APP_NODE_ENV.match(PRODUCTION)) {
    redirectUrl = environment.production;
  }

  window.location.replace(`${redirectUrl}/auth/${type}`);
};

export default socialAuthentication;
