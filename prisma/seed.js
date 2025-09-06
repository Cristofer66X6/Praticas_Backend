const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.pedido.deleteMany();
  await prisma.cliente.deleteMany();
  const cliente1 = await prisma.cliente.create({
    data: { nombre: "Andrés Pérez", email: "andres@example.com" },
  });

  const cliente2 = await prisma.cliente.create({
    data: { nombre: "María López", email: "maria@exmple.com" },
  });

  const cliente3 = await prisma.cliente.create({
    data: { nombre: "Miguel Uriel", email: "miguel@xample.com" },
  });

  const cliente6 = await prisma.cliente.create({
    data: { nombre: "Andres Manuel", email: "anuel89@ample.com" },
  });

  await prisma.pedido.createMany({
    data: [
      { clienteId: cliente1.id, estado: "pendiente", total: 500 },
      { clienteId: cliente1.id, estado: "enviado", total: 1200 },
      { clienteId: cliente2.id, estado: "pendiente", total: 750 },
      { clienteId: cliente3.id, estado: "pendiente", total: 750 },
      { clienteId: cliente6.id, estado: "pendiente", total: 750 },
    ],
  });
}

main()

  .then(() => console.log("✅ Seeds insertados"))
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
