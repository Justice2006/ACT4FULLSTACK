const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Obtener el token del header Authorization
      token = req.headers.authorization.split(' ')[1];

      // Verificar el token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Adjuntar el usuario al request
      req.user = decoded.id;

      next();
    } catch (error) {
      res.status(401).json({ message: 'No autorizado, token no válido' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'No autorizado, no se encontró el token' });
  }
};

module.exports = { protect };
