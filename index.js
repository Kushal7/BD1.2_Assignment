const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3000;

app.use(express.static('static'));

// Server side values
let taxRate = 5; // 5%
let discountPercentage = 10; // 10%
let loyaltyRate = 2; // 2 points per $1

// Endpoint 1: Calculate the total price of items in the cart

app.get('/cart-total', (req, res) => {
  let newItemPrice = parseFloat(req.query.newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal);
  cartTotal = cartTotal + newItemPrice;

  res.send(cartTotal.toString());
});

//Endpoint 2:  Apply a discount based on membership status

function membershipDiscount(isMember, cartTotal) {
  if (isMember) {
    return cartTotal - cartTotal * 0.1;
  } else {
    return cartTotal;
  }
}

app.get('/membership-discount', (req, res) => {
  let isMember = req.query.isMember === 'true';
  let cartTotal = parseFloat(req.query.cartTotal);
  res.send(membershipDiscount(isMember, cartTotal).toString());
});

// Endpoint 3 : Calculate tax on the cart total

app.get('/calculate-tax', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let result = (cartTotal / 100) * 5;
  res.send(result.toString());
});

// Endpoint 4 : Estimate delivery time based on shipping method

function estimateDelivery(shippingMethod, distance) {
  if (shippingMethod === 'Standard') {
    return distance / 50;
  } else if (shippingMethod === 'Express') {
    return distance / 100;
  }
}

app.get('/estimate-delivery', (req, res) => {
  let shippingMethod = req.query.shippingMethod;
  let distance = parseFloat(req.query.distance);
  res.send(estimateDelivery(shippingMethod, distance).toString());
});

// Endpoint 5 : Calculate the shipping cost based on weight and distance

function calculateShippingCost(weight, distance) {
  let shippingCost = weight * distance * 0.1;
  return shippingCost.toString();
}

app.get('/shipping-cost', (req, res) => {
  let weight = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);
  res.send(calculateShippingCost(weight, distance));
});

// Endpoint 6 : Calculate loyalty points earned from a purchase

function calculateloyaltyPoints(purchaseAmount) {
  let loyaltyPoints = purchaseAmount * 2;
  return loyaltyPoints.toString();
}

app.get('/loyalty-points', (req, res) => {
  let purchaseAmount = parseFloat(req.query.purchaseAmount);
  res.send(calculateloyaltyPoints(purchaseAmount));
});



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
