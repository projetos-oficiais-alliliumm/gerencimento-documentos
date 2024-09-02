const express = require("express");
const axios = require("axios");

//const url = process.env.URL;
//const login = process.env.LOGIN;
//const senha = process.env.SENHA;
const router = express.Router();


// Login do usuário
router.post("/login", async (req, res) => {
    const { login, senha } = req.body;

    try {
        const response = await axios.post(url + "usuarios/login", {
            login,
            senha,
        });

        authorizationToken = response.headers.authorization;
        res
            .status(200)
            .json({ message: "Login bem-sucedido", headers: response.headers });
    } catch (error) {
        if (error.response && error.response.data) {
            res.status(error.response.status).json(error.response.data);
        } else {
            res.status(500).json({ error: error.message });
        }
    }
});


// // Função para atualizar o token
router.use(async (req, res, next) => {
    if (
      req.method === "POST" ||
      req.method === "PUT" ||
      req.method === "DELETE" ||
      req.method === "PATCH" ||
      req.method === "GET"
    ) {
      // Realizar login e gerar novo token
      try {
        const response = await axios.post(url + "usuarios/login", {
          login: login,
          senha: senha,
        });
  
        authorizationToken = response.headers.authorization;
        next();
      } catch (error) {
        if (error.response && error.response.data) {
          res.status(error.response.status).json(error.response.data);
        } else {
          res.status(500).json({ error: error.message });
        }
      }
    } else {
      next();
    }
  });


  
router.get("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const response = await axios.get(url + `usuarios/${id}`, {
            headers: {
                Authorization: authorizationToken,
            },
        });

        console.log("Resposta da API:", response.data);
        res.status(200).json(response.data.entesAutorizados);
    } catch (error) {
        if (error.response && error.response.data) {
            res.status(error.response.status).json(error.response.data);
        } else {
            res.status(500).json({ error: error.message });
        }
    }
});