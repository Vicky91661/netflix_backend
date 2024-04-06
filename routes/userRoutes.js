const express = require("express")
const router = express.Router()
const {userSignin}= require("./../controller/userController")

router.post("/signin",userSignin)


module.exports = router