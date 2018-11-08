import jwt from 'jsonwebtoken';
import toaster from './toast';

const tokenDecoder = (token) => {
  try {
    return jwt.verify(token, process.env.SECRET);
  } catch (error) {
    toaster('error', 'Token is invalid');
  }
};

export default tokenDecoder;