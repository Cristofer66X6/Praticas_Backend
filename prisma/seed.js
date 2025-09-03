const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const cliente1 = await prisma.cliente.create({
    data: { nombre: "Andrés Pérez", email: "andres@example.com" },
  });

  const cliente2 = await prisma.cliente.create({
    data: { nombre: "María López", email: "maria@example.com" },
  });

  await prisma.pedido.createMany({
    data: [
      { clienteId: cliente1.id, estado: "pendiente", total: 500 },
      { clienteId: cliente1.id, estado: "enviado", total: 1200 },
      { clienteId: cliente2.id, estado: "pendiente", total: 750 },
    ],
  });
}

main()
  .then(() => console.log("✅ Seeds insertados"))
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
