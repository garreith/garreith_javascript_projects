
const express = require('express');
const cors = require('cors');
const fs = require('fs/promises');
const path = require('path');

const app = express();
const PORT = 5000;

const filePath = path.join(
  __dirname,
  'public',
  'products.json'
);

app.use(cors());
app.use(express.json());

// GET: Read products from public/products.json
app.get('/api/products', async (req, res) => {
  try {
    const content = await fs.readFile(filePath, 'utf8');
    const products = JSON.parse(content);

    if (!Array.isArray(products)) {
      return res.status(500).json({
        message: 'Products JSON must contain an array',
      });
    }

    res.json(products);
  } catch (error) {
    console.error('Read error:', error);

    res.status(500).json({
      message: 'Failed to read products.json',
    });
  }
});

// PUT: Replace the products array in public/products.json
app.put('/api/products', async (req, res) => {
  try {
    const products = req.body;

    if (!Array.isArray(products)) {
      return res.status(400).json({
        message: 'Request body must be an array of products',
      });
    }

    // Basic validation
    for (const product of products) {
      if (
        !product ||
        typeof product.name !== 'string' ||
        !product.name.trim() ||
        !Number.isFinite(Number(product.price)) ||
        Number(product.price) < 0
      ) {
        return res.status(400).json({
          message: 'Each product must have a valid name and price',
        });
      }
    }

    await fs.writeFile(
      filePath,
      JSON.stringify(products, null, 2) + '\n',
      'utf8'
    );

    res.json({
      success: true,
      message: 'Products saved successfully',
      products,
    });
  } catch (error) {
    console.error('Write error:', error);

    res.status(500).json({
      message: 'Failed to update products.json',
    });
  }
});

// Start API server
app.listen(PORT, () => {
  console.log(`API running at http://localhost:${PORT}`);
});
