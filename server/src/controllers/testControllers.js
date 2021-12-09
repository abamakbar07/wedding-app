const { default: Users } = require("../../models/userSchema")

exports.test = async (req,res) => {
    try {
        const {email} = req.body

        const checkData = await Users.findOne({email}, "email").exec()

        if (checkData) {
            return res.status(400).send({
              status: "Failed",
              message: `Email already exsited`,
            });
          }

          res.send({
              status: "email ready",
              checkData,
          })
        
    } catch (error) {
        res.status(500).send({
            message:"Test error",
            error,
        })
    }
}