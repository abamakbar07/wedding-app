const { default: Users } = require("../../models/userSchema")

exports.addUser = async (req, res) => {
    try {
        const result = await Users(req.body).save()
        res.send({
            "status" : "User success added!",
            "result" : result
        })
    } catch (error) {
        console.log(error)
        res.send({
            "status" : "Failed",
            "error" : error
        })
    }
}