const axios = require("axios");
const API_KEY = "ff75b47fa53f43279e770caeef1c4b05";

async function getCoordsForAddress(address) {
  var config = {
    method: "get",
    url: `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(address)}&apiKey=${API_KEY}`,
    headers: {},
  };

  let data
  await axios(config)
    .then((response) => {
      data = response.data
    })
    return data
}

module.exports = getCoordsForAddress
