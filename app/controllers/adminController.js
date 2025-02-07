const { client } = require("../config/db");

const userCollection = client.db("bistroDB").collection("users");
const menuCollection = client.db("bistroDB").collection("menu");
const paymentCollection = client.db("bistroDB").collection("payments");

const getAdminStats = async (req, res) => {
  try {
    const users = await userCollection.estimatedDocumentCount();
    const menuItems = await menuCollection.estimatedDocumentCount();
    const orders = await paymentCollection.estimatedDocumentCount();

    const result = await paymentCollection
      .aggregate([
        {
          $group: {
            _id: null,
            totalRevenue: {
              $sum: "$price",
            },
          },
        },
      ])
      .toArray();

    const revenueResult = result.length > 0 ? result[0].totalRevenue : 0;
    const revenue = parseFloat(revenueResult.toFixed(2));

    res.send({ users, menuItems, orders, revenue });
  } catch (error) {
    console.error("Can not get admin stats:", error);
    res.status(500).send({ message: "Can not get admin stats" });
  }
};

const getOrderStats = async (req, res) => {
  const result = await paymentCollection
    .aggregate([
      {
        $unwind: "$menuItemIds",
      },
      {
        $set: {
          menuItemIds: { $toObjectId: "$menuItemIds" }, // Convert to ObjectId
        },
      },
      {
        $lookup: {
          from: "menu",
          localField: "menuItemIds",
          foreignField: "_id",
          as: "menuItems",
        },
      },
      {
        $unwind: "$menuItems",
      },
      {
        $group: {
          _id: "$menuItems.category",
          quantity: { $sum: 1 },
          revenue: { $sum: "$menuItems.price" },
        },
      },
      {
        $project: {
          _id: 0,
          category: "$_id",
          quantity: "$quantity",
          revenue: { $round: ["$revenue", 2] }, // Round revenue to 2 decimal places
        },
      },
    ])
    .toArray();

  res.send(result);
};



module.exports = {
  getAdminStats,
  getOrderStats,
};
