var jwt = require("jsonwebtoken");

function getAuthToken(req) {
  let authHeader = req.get("Authorization");
  return authHeader && authHeader.split(" ")[1];
}
function authMiddleware(req, res, next) {
  let accessToken = getAuthToken(req);
  if (accessToken == null) {
    return res.status(403).json({
      error:
        'Request header "Authentication" does not exist or does not contain authentication token.',
    });
  }
  try {
    req.verifyResult = jwt.verify(accessToken, process.env.SECRET_KEY,);
  } catch (err) {
    return res.status(403).json({ error: "Access token is invalid" });
  }
  next();
}
module.exports = { getAuthToken, authMiddleware };
