const mongoose = require("mongoose")

const flightPriceCreate = mongoose.Schema({
  source :String,
  destination : String,
    indigo: String,
    airAsia: String,
    vistara: String
})

module.exports = mongoose.model("flightPrice" , flightPriceCreate)
