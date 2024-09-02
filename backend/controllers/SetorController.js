const express = require("express");
const axios = require("axios");
const fs = require('fs');
const FormData = require('form-data');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const url = process.env.URL;
const login = process.env.LOGIN;
const senha = process.env.SENHA;

const router = express.Router();

//middleware para realizar o login antes de cada requisição
router.use(async (req, res, next) => {
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
});


//INSERÇÃO 
router.post("/:cnpj", async (req, res) => {
    const { body } = req;
    const { cnpj } = req.params;
    try {
        const response = await axios.post(
            url + `teste/${cnpj}/testesCon`,
            body,
            {
                headers: {
                    Authorization: authorizationToken,
                },
            }
        );

        return res.status(200).json(response.headers.location);
        
    } catch (error) {
        if (error.response && error.response.data) {
            return res.status(error.response.status).json(error.response.data);
        } else {
            return res.status(500).json({ error: error.message });
        }
    }
});

//CONSULTAR
router.get("/:cnpj/:ano/:id", async (req, res) => {
    const { cnpj, ano, id } = req.params;

    try {
        const response = await axios.get(
            url + `teste/${cnpj}/testesCon/${ano}/${id}`,
            {
                headers: {
                    Authorization: authorizationToken,
                },
            }
        );

        // console.log(res.status(200).json(response.data))
        return res.status(200).json(response.data);
    } catch (error) {
        if (error.response && error.response.data) {
            return res.status(error.response.status).json(error.response.data);
        } else {
            return res.status(500).json({ error: error.message });
        }
    }
});

//RETIFICAR
router.put("/:cnpj/:ano/:id", async (req, res) => {
    const { body } = req;
    const { cnpj, ano, id } = req.params;
    try {
        const response = await axios.put(
            url + `teste/${cnpj}/testesCon/${ano}/${id}`,
            body,
            {
                headers: {
                    Authorization: authorizationToken,
                },
            }
        );
            return res.status(200).json(response.headers.location);
        } catch (error) {
            if (error.response && error.response.data) {
                return res.status(error.response.status).json(error.response.data);
            } else {
                return res.status(500).json({ error: error.message });
            }
        }
});


//INSERIR DOCUMENTO
router.post("/:cnpj/:ano/:id/arquivos", upload.single('arquivo'), async (req, res) => {
    const { cnpj, ano, id } = req.params;
    const titulo_documento = req.headers['titulo-documento'];
    const tipo_documento = req.headers['tipo-documento-id'];

    const arquivo = req.file;

    if (!arquivo) {
        return res.status(400).json({ error: 'Nenhum arquivo para ser enviado' });
    }

    const form = new FormData();
    form.append('arquivo', fs.createReadStream(arquivo.path), {
        filename: arquivo.originalname,
        contentType: arquivo.mimetype,
    });

    try {
        const response = await axios.post(
            process.env.URL + `teste/${cnpj}/testesCon/${ano}/${id}/arquivos`,
            form,
            {
                headers: {
                    ...form.getHeaders(),
                    Authorization: authorizationToken,
                    'Content-Type': 'multipart/form-data',
                    'Titulo-Documento': titulo_documento,
                    'Tipo-Documento-Id': tipo_documento
                },
            }
        );

        return res.status(200).json(response.headers.location);
    } catch (error) {
        if (error.response && error.response.data) {
            return res.status(error.response.status).json(error.response.data);
        } else {
            return res.status(500).json({ error: error.message });
        }
    }
});

//DELETAR ARQUIVO
router.delete("/:cnpj/:ano/:id/arquivos/:sequencialDocumento", async (req, res) => {
    const { cnpj, ano, id, sequencialDocumento } = req.params;
    const { justificativa } = req.body;

    try {
        const response = await axios.delete(
            url + `teste/${cnpj}/testesCon/${ano}/${id}/arquivos/${sequencialDocumento}`,
            {
                headers: {
                    Authorization: authorizationToken,
                },
                data: {
                    justificativa,
                },
            }
        );

        return res.status(200).json(response.data);
    } catch (error) {
        if (error.response && error.response.data) {
            return res.status(error.response.status).json(error.response.data);
        } else {
            return res.status(500).json({ error: error.message });
        }
    }
});

//DELETAR
router.delete("/:cnpj/:ano/:id", async (req, res) => {
    const { cnpj, ano, id } = req.params;
    const { justificativa } = req.body;

    try {
        const response = await axios.delete(
            url + `teste/${cnpj}/testesCon/${ano}/${id}`,
            {
                headers: {
                    Authorization: authorizationToken,
                },
                data: {
                    justificativa,
                },
            }
        );

        response.mensage = "Deletado do PNCP com sucesso!";
        return res.status(200).json(response);
    } catch (error) {
        if (error.response && error.response.data) {
            return res.status(error.response.status).json(error.response.data);
        } else {
            return res.status(500).json({ error: error.message });
        }
    }
});

module.exports = router;