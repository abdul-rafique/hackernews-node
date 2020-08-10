// PrismaClient constructor from @prisma/client
const { PrismaClient } = require("@prisma/client");

// Instantiate PrismaClient
const prisma = new PrismaClient();

// Async Function to send queries to Database
async function main() {
  const newLink = await prisma.link.create({
    data: {
      description: "Prisma is an open source database toolkit",
      url: "www.prisma.io",
    },
  });
  const allLinks = await prisma.link.findMany();
  console.log(allLinks);
}

// Calling the Function
main()
  .catch((e) => {
    throw e;
  })

  // Closing the Database Connection
  .finally(async () => {
    await prisma.$disconnect();
  });
