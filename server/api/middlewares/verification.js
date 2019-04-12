import Auth from '../utils/authenticate';

class Verification {
  static user(req, res, next) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = Auth.verifyToken(token);
      req.user = decoded;
      return next();
    } catch (error) {
      return res.status(401).json({
        status: res.statusCode,
        error: 'Authentication failed',
      });
    }
  }
}
export default Verification;
