// controllers/tokenController.js
const tokenModel = require('../models/tokenModel');

function generateToken(req, res) {
  const tokenLength = req.params.length || 8; // Panjang token default: 8 karakter
  const randomToken = tokenModel.generateRandomToken(tokenLength);

  res.json({ token: randomToken });
}

module.exports = {
  generateToken,
};
