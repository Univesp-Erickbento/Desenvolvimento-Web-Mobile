import express from 'express';
import cors from 'cors';
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from './controllers/product.controller';
import { errorHandler } from './middleware/errorHandler';

const app = express();

const allowedOrigin = process.env.ALLOWED_ORIGIN || 'http://localhost:5173';

app.use(
  cors({
    origin: allowedOrigin,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use(express.json());

app.get('/api/products', getAllProducts);
app.get('/api/products/:id', getProductById);
app.post('/api/products', createProduct);
app.put('/api/products/:id', updateProduct);
app.delete('/api/products/:id', deleteProduct);

app.use(errorHandler);

export default app;