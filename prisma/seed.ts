// prisma/seed.ts
import { UserRole, PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({
  adapter,
});


// ID constante en formato UUID
const MOCK_USER_ID = "00000000-0000-0000-0000-000000000001";

async function main() {
  console.log("🌱 Iniciando el proceso de seed...");

  // 1. Crear o actualizar Usuario Mock
  const mockUser = await prisma.user.upsert({
    where: { email: "cliente.mock@calabaza.com" },
    update: {},
    create: {
      id: MOCK_USER_ID,
      firstName: "Cliente",
      lastName: "Prueba",
      email: "cliente.mock@calabaza.com",
      phone: "+5491112345678",
      role: UserRole.CUSTOMER,
    },
  });

  console.log(
    `✅ Usuario Mock asegurado: ${mockUser.email} (ID: ${mockUser.id})`,
  );

  console.log("Secuencia reiniciada con éxito.");
  // 2. Crear Categorías base iniciales
  const categories = [
    { name: "Herramientas y Ferretería", slug: "herramientas-y-ferreteria" },
    { name: "Ropa y Moda", slug: "ropa-y-moda" },
    { name: "Electrónica y Tecnología", slug: "electronica-y-tecnologia" },
    { name: "Juguetes y Juegos", slug: "juguetes-y-juegos" },
    { name: "Cotillón y Fiestas", slug: "cotillon-y-fiestas" },
  ];

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
  }

  console.log("✅ Categorías base cargadas exitosamente.");
}


main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌ Error durante la ejecución del seed:", e);
    await prisma.$disconnect();
    process.exit(1);
  });