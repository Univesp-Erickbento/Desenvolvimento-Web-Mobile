import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.product.createMany({
    data: [
      {
        title: "Notebook Dell Inspiron 15",
        description:
          "Notebook Dell com processador Intel Core i5, 8 GB de RAM e SSD de 512 GB.",
        price: 3499.90,
      },
      {
        title: "Mouse Logitech MX Master 3S",
        description:
          "Mouse sem fio ergonômico Logitech com sensor de alta precisão e conexão Bluetooth.",
        price: 599.90,
      },
      {
        title: "Teclado Mecânico Logitech G Pro",
        description:
          "Teclado mecânico compacto para uso profissional e jogos.",
        price: 499.90,
      },
      {
        title: "Monitor LG UltraGear 24",
        description:
          "Monitor LG de 24 polegadas com resolução Full HD e alta taxa de atualização.",
        price: 899.90,
      },
      {
        title: "SSD Kingston NV2 1TB",
        description:
          "SSD NVMe Kingston de 1 TB para armazenamento e melhoria de desempenho do computador.",
        price: 549.90,
      },
    ],
  });

  console.log("Produtos inseridos com sucesso!");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
