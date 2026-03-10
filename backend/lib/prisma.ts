import { PrismaClient } from '@prisma/client';

const prismaClientsingleton = () => {
    return new PrismaClient()
}

declare const globalThis: {
    prismaGlobal: ReturnType<typeof prismaClientsingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientsingleton();

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma