const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51N6SokEyrZyjTHe0p6XLtVz9PsbTuhtvaxAf4TNaUGdOUS69nxVgjuwvRljbzzJVBnxGPZgiZ7OronMgVBiTvfcf00Ag1ytyht"
);
const serverless = require("serverless-http");

const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 3001;

app.get("/", (req, res) => res.status(200).json({ msg: "hi" }));

app.post("/test", (req, res) => res.status(200).json({ msg: "hi" }));

app.post("/create-payment-intent", async (req, res) => {
  const { amount } = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
    });
    console.log(paymentIntent);
    res.status(200).json(paymentIntent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// app.listen(PORT, () => console.log("Server running on port 5000"));
module.exports.handler = serverless(app);
