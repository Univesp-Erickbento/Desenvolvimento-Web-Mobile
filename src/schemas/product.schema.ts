import { z } from 'zod';

export const createProductSchema = z.object({
  title: z.string().min(3, 'O título deve ter no mínimo 3 caracteres.'),
  description: z.string().min(10, 'A descrição deve ter no mínimo 10 caracteres.'),
  price: z.number({ invalid_type_error: 'O preço deve ser um número.' }).positive('O preço deve ser maior que zero.'),
  imageUrl: z.string().min(1, 'A URL da imagem é obrigatória.'),
});

export const updateProductSchema = createProductSchema.partial();

export const productIdParamSchema = z.object({
  id: z.string().uuid('ID inválido. Deve ser um UUID válido.'),
});