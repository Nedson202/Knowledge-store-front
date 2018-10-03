import jwt from 'jsonwebtoken';

const tokenDecoder = token => jwt.decode(token, process.env.SECRET);

export default tokenDecoder;