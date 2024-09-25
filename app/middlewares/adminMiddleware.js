const { client } = require("../config/db");

const verifyAdmin = async (req, res, next) => {
  const email = req.decoded.email;
  const userCollection = client.db("bistroDB").collection("users");
  const query = { email: email };
  const user = await userCollection.findOne(query);
  const isAdmin = user?.role === "admin";
  if (!isAdmin) {
    return res
      .status(403)
      .send({ message: "Forbidden access & user not admin" });
  }
  next();
};

module.exports = verifyAdmin;
