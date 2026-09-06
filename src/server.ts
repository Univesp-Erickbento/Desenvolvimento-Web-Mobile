import "dotenv/config";
import express from "express";
import { prisma } from "./prisma";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "API Catálogo de Produtos funcionando!",
  });
});

app.get("/api/status", (req, res) => {
  res.json({
    status: "ok",
    message: "API Catálogo de Produtos funcionando!",
  });
});

app.get("/products", async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        id: "asc",
      },
    });

    res.json(products);
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);

    res.status(500).json({
      error: "Erro interno do servidor",
    });
  }
});

app.get("/products/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        error: "ID inválido",
      });
    }

    const product = await prisma.product.findUnique({
      where: {
        id: id,
      },
    });

    if (!product) {
      return res.status(404).json({
        error: "Produto não encontrado",
      });
    }

    res.json(product);
  } catch (error) {
    console.error("Erro ao buscar produto:", error);

    res.status(500).json({
      error: "Erro interno do servidor",
    });
  }
});

app.post("/products", async (req, res) => {
  try {
    const { title, description, price } = req.body;

    if (!title || !description || price === undefined) {
      return res.status(400).json({
        error: "title, description e price são obrigatórios",
      });
    }

    const product = await prisma.product.create({
      data: {
        title,
        description,
        price,
      },
    });

    res.status(201).json(product);
  } catch (error) {
    console.error("Erro ao criar produto:", error);

    res.status(500).json({
      error: "Erro interno do servidor",
    });
  }
});

app.put("/products/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { title, description, price } = req.body;

    if (isNaN(id)) {
      return res.status(400).json({
        error: "ID inválido",
      });
    }

    const product = await prisma.product.update({
      where: {
        id,
      },
      data: {
        title,
        description,
        price,
      },
    });

    res.json(product);
  } catch (error) {
    console.error("Erro ao atualizar produto:", error);

    res.status(404).json({
      error: "Produto não encontrado",
    });
  }
});

app.delete("/products/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        error: "ID inválido",
      });
    }

    const product = await prisma.product.delete({
      where: {
        id,
      },
    });

    res.json({
      message: "Produto excluído com sucesso",
      product,
    });
  } catch (error) {
    console.error("Erro ao excluir produto:", error);

    res.status(404).json({
      error: "Produto não encontrado",
    });
  }
});

const PORT = 3333;

app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`);
});