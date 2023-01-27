const router = require("express").Router()
const bcrypt = require('bcrypt')
const User = require("../models/user")

//registertion

router.post("/", async (req, res) => {
    try {
        //genetrate new password
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(req.body.password, salt)

        // create new user
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashPassword,
        })

        //save and send response
        const saveUser = await newUser.save();
        res.status(200).json(saveUser._id)


    } catch (error) {
        res.status(500).json(error)
    }
})

//login

router.post("/login", async (req, res) => {
    try {
        //find user
        const user = await User.findOne({ username: req.body.username })
        if (user) {
            //validate password
            const validPassword = await bcrypt.compare(req.body.password, user.password)
            if (validPassword) {
                res.status(200).json("logined")
            } else {

                res.status(400).json("wrong username or password ")
            }

        } else {

            res.status(400).json("wrong username or password ")
        }

        //send response


    } catch (error) {
        res.status(500).json(error)
        // console.log(error);

    }
})

module.exports = router