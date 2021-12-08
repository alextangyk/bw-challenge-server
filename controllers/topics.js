const axios = require('axios');
const {StatusCodes} = require('http-status-codes');

const getTopics = async (req, res) => {
  // This can be changed in further development, such as retrieving data from database
  // The returned data can also be minimised, because front end application does not need to show all the properties
  const response = await axios.get('https://gist.githubusercontent.com/grahamscott/65b43572ad18c5fbdd87/raw/d755523d6a281695e3b882db8c115ff37fc070fa/topics.json')
  return response.data.topics || [];
};

module.exports = {
  getTopics
};
