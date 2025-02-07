const { client } = require("../config/db");

const reviewCollection = client.db("bistroDB").collection("reviews");

const getReviews = async (req, res) => {
  try {
    const result = await reviewCollection.find().toArray();
    res.send(result);
  } catch (error) {
    console.error("Can not get reviews:", error);
    res.status(500).send({ message: "Can not get reviews" });
  }
};

module.exports = { getReviews };
