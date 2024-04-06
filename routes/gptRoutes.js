const express = require("express")
const router = express.Router()
const {gptController}= require("./../controller/gptController")
const {userAuth} = require("./../middleware/userAuth")

router.post("/gptSearch",userAuth,gptController)

module.exports = router