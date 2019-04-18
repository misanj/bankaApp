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

  static staff(req, res, next) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = Auth.verifyToken(token);
      req.user = decoded;
      if (req.user.type !== 'staff') {
        return res.status(403).send({
          status: res.statusCode,
          error: 'The endpoint you are requesting is forbidden',
        });
      }
      return next();
    } catch (error) {
      return res.status(401).json({
        status: res.statusCode,
        error: 'Authentication failed',
      });
    }
  }

  static admin(req, res, next) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = Auth.verifyToken(token);
      req.user = decoded;
      if (!req.user.isAdmin) {
        return res.status(403).send({
          status: res.statusCode,
          error: 'The endpoint you are requesting is forbidden',
        });
      }
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
