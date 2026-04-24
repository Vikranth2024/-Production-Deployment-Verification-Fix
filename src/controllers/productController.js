import Product from '../models/productModel.js';

export const getProducts = async (req, res) => {
  try {
    // Fix: build filter only when category is provided
    const filter = req.query.category ? { category: req.query.category } : {};
    
    const products = await Product.find(filter);
    res.json(products);
  } catch (err) {
    // Solution Fix: Added comprehensive console.error logging with context
    console.error('getProducts failed:', err.message, { query: req.query });
    res.status(500).json({ error: 'Server error' });
  }
};
