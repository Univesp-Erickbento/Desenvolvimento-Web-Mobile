import { Request, Response, NextFunction } from 'express';
import { prisma } from '../lib/prisma';
import { createProductSchema, updateProductSchema, productIdParamSchema } from '../schemas/product.schema';

export const getAllProducts = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await prisma.product.findMany();
    return res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = productIdParamSchema.parse(req.params);
    const product = await prisma.product.findUnique({ where: { id } });

    if (!product) {
      return res.status(404).json({ error: 'Produto não encontrado.' });
    }

    return res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const body = createProductSchema.parse(req.body);
    const newProduct = await prisma.product.create({ data: body });
    return res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = productIdParamSchema.parse(req.params);
    const body = updateProductSchema.parse(req.body);

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: body,
    });

    return res.status(200).json(updatedProduct);
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = productIdParamSchema.parse(req.params);

    await prisma.product.delete({ where: { id } });
    return res.status(204).send();
  } catch (error) {
    next(error);
  }
};