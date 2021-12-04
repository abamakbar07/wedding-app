const { sign } = require("jsonwebtoken")
const { default: Users } = require("../../models/userSchema")
// "fullname"  : String,
// "nickname"  : String,
// "email"     : String,
// "password"  : String,
// "phone"     : Number

exports.addUser = async (req, res) => {
    try {
        const result = await Users(req.body).save()

        console.log("User successfully added!")
        console.log(result._id)

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

exports.loginUser = async (req, res) => {
    try {
        const {email, password} = req.body
        const result = await Users.findOne({email, password}, "_id email nickname password").exec()

        if (!result) 
            return res.status(400).send({
                "status": "Login failed",
                "message": "Email atau password salah!"
            })

        console.log(result._id)

        const secretKey = process.env.SECRETKEY
        const token = sign({id:result._id}, secretKey)

        if (email === result.email && password === result.password) {
            res.send({
                "status": "Login success!",
                "user" : {
                    "_id" : result._id,
                    "nickname" : result.nickname,
                    "email" : result.email,
                    token,
                },
            })
        } 
    } catch (error) {
        res.status(500).send({
            "status" : "userControllers",
            error,
        })
        
    }
}

exports.checkAuth = async (req, res) => {
    try {
        const id = req.jwt.id;
        console.log(req.jwt);

        console.log(id)
    
        const result = await Users.findOne({
            _id: id,
        }).exec()

        res.send({
            result
        })

    } catch (error) {
        console.log(error)
    }
}