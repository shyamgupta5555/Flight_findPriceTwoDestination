const { query } = require("express");
const flightModel = require("../../model/flightModel");

exports.findPriceTwoLocation = async (req, res) => {
  try {
    const { source, destination } = req.query;

    if (!source) return res.status(400).send({ message: "enter source input" });
    if ( !destination)
      return res.status(400).send({ message: "enter destination input" });
    if(source == destination)return res.status(400).send({message :"input different destination "})

    const prices = await flightModel.findOne({source:source ,destination :destination});

  
    if(!prices) return res.status(400).send({message :" sorry not available flight price  "})

    const price = {
      indigo: prices.indigo,
      airAsia: prices.airAsia,
      vistara: prices.vistara,
    };
    return res.status(200).send(price);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
