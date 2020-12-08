const jwt = require('jsonwebtoken')

module.exports.requireAuth = function (req, res, next) {
  let accessToken = req.cookies.jwt;

  if (!accessToken) {
    res.status(403).send()
  }

  try {
    const data = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
    next()
  } catch(e) {
    console.log(e)
    return res.status(401).send()
  }
}
