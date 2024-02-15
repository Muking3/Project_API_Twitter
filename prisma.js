import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

// async function main() {
prisma.user.create({
    data: {
        name: 'Alice',
        email: 'alice@prisma.io',
        password:'&&&&&&&'
    },
}).then(result => console.log(result))