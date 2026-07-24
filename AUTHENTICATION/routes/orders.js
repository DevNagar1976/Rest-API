// Task 3: Protected route that only allows access with a valid JWT
const express = require("express");
const verifyToken = require("../middleware/verifyToken");

const router = express.Router();

router.get("/my-orders", verifyToken, (req, res) => {
  // If we reach here, verifyToken already confirmed the JWT is valid
  // and req.user holds the decoded { id, email } payload.
  const fakeOrders = [
    { orderId: "ORD-1001", itemName: "Wireless Mouse" },
    { orderId: "ORD-1002", itemName: "Mechanical Keyboard" },
    { orderId: "ORD-1003", itemName: "USB-C Hub" },
  ];

  res.status(200).json({
    user: req.user.email,
    orders: fakeOrders,
  });
});

module.exports = router;
