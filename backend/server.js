const express = require('express');
const cors = require('cors');
// const { PrismaClient } = require('@prisma/client');

const app = express();
const port = 5000;
// const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.get('/api/message', (req, res) => {
    res.json({ message: 'Backend' });
});

// app.get('/api/users', async (req, res) => {
//     try {
//         const users = await prisma.user.findMany();
//         res.json(users);
//     } catch (error) {
//         res.status(500).json({ error: 'Failed to fetch users' });
//     }
// });

// app.get('/api/users', async (req, res) => {
//     const users = await prisma.user.findMany();
//     res.json(users);
// });

// app.post('/api/users', async (req, res) => {
//     const { name, email } = req.body;
//     try {
//         const user = await prisma.user.create({
//         data: { name, email }
//         });
//         res.status(201).json(user);
//     } catch (error) {
//         res.status(500).json({ error: 'Failed to create user' });
//     }
// });


// Uso prisma

// async function main() {
//     const users = await prisma.user.findMany();
//     console.log(users);
// }

// main()
//     .catch(e => {
//         throw e;
//     })
//     .finally(async () => {
//         await prisma.$disconnect();
//     });


app.listen(port, () => {
    console.log(`Server iniciado em http://localhost:${port}`)
})