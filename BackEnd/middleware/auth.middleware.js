import jwt from 'jsonwebtoken';

export function authMiddleware (requestAnimationFrame, res, next) {
    const token = requestAnimationFrame.headers.authorization?.split('')[1];
    if (!token) return res.status(403).send('Token not found');

    try{
        const data = jwt.verify(token, process.env.Jwt_SECRET);
        req.user = data;
        next();
    } catch (e) {
        res.status(401).json(e);
    }
}