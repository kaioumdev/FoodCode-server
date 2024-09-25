const { client } = require("../config/db");

const reviewCollection = client.db("bistroDB").collection("reviews");

const getReviews = async (req, res) => {
  const result = await reviewCollection.find().toArray();
  res.send(result);
};

module.exports = { getReviews };
