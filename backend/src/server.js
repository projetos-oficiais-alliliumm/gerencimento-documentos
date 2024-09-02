const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

// const os = require('os');
// const hostname = os.hostname();

// let envFile;
// if (hostname === 'api-semad-prd') {
//     envFile = '.env_prod';
// } else {
//     envFile = '.env_dev';
// }

// require("dotenv").config({ path: envFile });

const app = express();
const port = 5000;
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());


// app.use('/', (req, res, next) => {
   //  if (req.path === '/') {
      //   res.redirect('https://--/');
    // } else {
       //  next();
    // }
// });


//const UserController = require("./controllers/UserController");
//const SetorController = require("./controllers/SetorController");

app.use("/usuarios", UserController);
app.use("/setores", SetorController);




// Uso prisma 1


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




// Uso prisma 2

// async function main() {
//     const users = await prisma.user.findMany();
//     console.log(users);
// }

//async function main() {
 //   const tipoDocumento = await prisma.tipoDocumento.create({
   //     data: {
     //       DescTipoDocumento: 'Relatório',
      //  },
   // });
   // console.log('TipoDocumento criado:', tipoDocumento);
//}



//main()
  //  .catch(e => {
    //    throw e;
   // })
    //.finally(async () => {
    //    await prisma.$disconnect();
   // });


app.listen(port, () => {
    console.log(`Server iniciado em http://localhost:${port}`)
})