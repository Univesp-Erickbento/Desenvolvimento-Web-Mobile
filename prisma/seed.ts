import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.product.deleteMany();

  await prisma.product.createMany({
    data: [
      { title: 'Mouse Gamer RGB', description: 'Mouse óptico de alta precisão com 12000 DPI.', price: 150.0, imageUrl: 'https://placehold.co/600x400' },
      { title: 'Teclado Mecânico', description: 'Teclado mecânico switch blue ABNT2 com iluminação.', price: 280.0, imageUrl: 'https://placehold.co/600x400' },
      { title: 'Monitor 24 Polegadas', description: 'Monitor IPS Full HD com taxa de atualização de 144Hz.', price: 899.9, imageUrl: 'https://placehold.co/600x400' },
      { title: 'Headset Wireless', description: 'Headset sem fio com som surround 7.1 e isolamento acústico.', price: 420.0, imageUrl: 'https://placehold.co/600x400' },
      { title: 'Webcam Full HD 1080p', description: 'Webcam para streaming com microfone embutido e foco automático.', price: 210.0, imageUrl: 'https://placehold.co/600x400' },
    ],
  });

  console.log('Seed concluído com 5 produtos inseridos.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });