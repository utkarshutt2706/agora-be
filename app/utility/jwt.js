import { expressjwt } from 'express-jwt';
import { getUserById } from '../services/userService.js';

const jwt = () => {
    const secret = process.env.JWT_SECRET;
    return expressjwt({
        secret,
        isRevoked,
        algorithms: ['HS256'],
        getToken: (req) => {
            if (
                req.headers.authorization &&
                req.headers.authorization.split(' ')[0] === 'Bearer'
            ) {
                return req.headers.authorization.split(' ')[1];
            }
            return null;
        },
    }).unless({
        path: [
            // paths that dont require authentication
            '/',
            '/api-docs',
            '/api/health',
            '/api/user',
            '/api/user/login',
        ],
    });
};

const isRevoked = async (req, { payload }) => {
    try {
        const user = await getUserById(payload.sub._id);
        req.user = payload.sub;
        if (!user) {
            return true;
        }
        return false;
    } catch (error) {
        return true;
    }
};

export default jwt;
