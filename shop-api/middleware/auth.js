import User from '../models/User.js';

const auth = async (req, res, next) => {
  const headerValue = req.get('Authorization');

  if (!headerValue) {
    return res.status(401).send({ error: 'No Authorization header present' });
  }

  const [_bearer, token] = headerValue.split(' ');

  if (!token) {
    return res.status(401).send({ error: 'No token present' });
  }

  const user = await User.findOne({ token });

  if (!user) {
    return res.status(401).send({ error: 'Wrong token!' });
  }

  req.user = user;

  next();
};

export default auth;
