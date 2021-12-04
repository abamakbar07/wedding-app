const jwt = require("jsonwebtoken");

exports.loginAuth = (req, res, next) => {
  let header, token;

  if (
    !(header = req.header("Authorization")) ||
    !(token = header.replace("Bearer ", ""))
  )
    return res.status(400).send({
      message: "Access Denied",
    });

  try {
    const secretKey = process.env.SECRETKEY;
    const verified = jwt.verify(token, secretKey);

    (req.jwt = verified),
      console.log("hasil req verified in auth", verified.id);

    next();
  } catch (error) {
    res.status(400).send({
      message: "Invalid Token",
    });
  }
};
