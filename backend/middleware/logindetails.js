const jwt = require("jsonwebtoken");

const JWT_secret = "haryyisgoodteacher";

const fetchuser = (req, res, next) => {
  // get user from jwt token
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).send({ error: "please authenticate with valid token" });
  }

  try {
    const data = jwt.verify(token, JWT_secret);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({ error: "please authenticate with valid token" });
  }
};
module.exports = fetchuser;
