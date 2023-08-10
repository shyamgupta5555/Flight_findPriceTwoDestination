const router = require("express").Router()
const {login} = require("../controller/user/login")
const {signUp} = require("../controller/user/signUp")
const {findPriceTwoLocation}=require("../controller/flight/flight")

router.post("/api/register" ,signUp)
router.post("/api/login" ,login)
router.get("/api/flightPrice", findPriceTwoLocation)



module.exports = router