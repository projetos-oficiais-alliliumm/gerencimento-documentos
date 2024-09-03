const express = require('express');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const SetorController = require("./controllers/SetorController");
const DocumentoController = require("./controllers/DocumentoController"); //Tipo e tramite do documento

app.use("/setor", SetorController);
app.use("/documento", DocumentoController);

app.listen(port, () => {
   console.log(`Server iniciado em http://localhost:${port}`)
})