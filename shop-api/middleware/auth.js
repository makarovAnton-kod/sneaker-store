import User from "../models/User.js";

const auth = async (req, res, next) => {
    const token = req.get('Authorization');
    if (!token) {
        return res.status(401).send({error: 'No token present!'});
    }
    const user = await User.findOne({token});
    if (!user) {
        return res.status(401).send({error: 'Wrong token!'});
    }
    req.user = user;
    next();
};
export default auth;