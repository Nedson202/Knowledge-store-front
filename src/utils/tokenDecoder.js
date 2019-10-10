import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import toaster from './toast';
import { TOASTR_ERROR, TOKEN } from '../settings';

dotenv.config();

const tokenDecoder = (token) => {
  try {
    return jwt.verify(token, process.env.REACT_APP_SECRET);
  } catch (error) {
    toaster(TOASTR_ERROR, 'Token has expired or is invalid');
    localStorage.removeItem(TOKEN);
    return error;
  }
};

export default tokenDecoder;
