const { sign } = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const { default: Users } = require("../../models/userSchema");
// "fullname"  : String,
// "nickname"  : String,
// "email"     : String,
// "password"  : String,
// "phone"     : Number

exports.addUser = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    const schema = Joi.object({
      fullname: Joi.string().min(3).required(),
      email: Joi.string().email().min(6).required(),
      password: Joi.string().min(4).required(),
      veriviedStatus: false,
    });

    const { error } = schema.validate(req.body);

    if (error)
      return res.status(400).send({
        message: error.details[0].message,
      });

    const checkData = await Users.findOne({ email }, "email").exec();

    if (checkData) {
      return res.status(400).send({
        status: "Failed",
        message: `Email already exsited`,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await Users.create({
      fullname,
      email,
      password: hashedPassword,
      verified: {
        status: false,
        otpCode: null,
      },
    });

    const result = await Users(user).save();

    res.send({
      status: "Success!",
      message: "User successfully registered!",
      result: result,
    });
  } catch (error) {
    res.send({
      status: "Failed",
      error: error,
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Users.findOne({ email }, "email password").exec();

    if (!user)
      return res.status(400).send({
        message: "Your Credentials is not valid",
      });

    const validPass = await bcrypt.compare(password, user.password);

    if (!validPass)
      return res.status(400).send({
        message: "Your Credentials is not valid",
      });

    const secretKey = process.env.SECRETKEY;
    const token = sign({ email }, secretKey);

    res.send({
      status: "Success!",
      message: "Login success!",
      user: user.email,
      token,
    });
  } catch (error) {
    res.status(500).send({
      status: "Failed",
      error,
    });
  }
};

exports.checkAuth = async (req, res) => {
  try {
    const email = req.jwt.email;
    console.log(req.jwt);

    const result = await Users.findOne({ email }, "-_id -password").exec();

    res.send({
      status: "Success!",
      message: "User authenticated!",
      user: result,
    });
  } catch (error) {
    res.status(500).send({
      status: "Failed!",
      error,
    });
  }
};
