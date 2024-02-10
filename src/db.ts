import { PrismaClient } from "@prisma/client";
import { Client } from "@planetscale/database";
import { PrismaPlanetScale } from "@prisma/adapter-planetscale";

// Setup
const connectionString = `${process.env.DATABASE_URL}`;

// Init prisma client
const client = new Client({ url: connectionString });
const adapter = new PrismaPlanetScale(client);

declare global {
  var prisma: PrismaClient;
}

const prisma: PrismaClient = global.prisma || new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") {
  if (!global.prisma) {
    global.prisma = new PrismaClient({ adapter });
  }
}

export default prisma;
