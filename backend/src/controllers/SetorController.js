const express = require("express");
const { PrismaClient } = require('@prisma/client');

const router = express.Router();
const prisma = new PrismaClient();

// SETORES //

// Novo Setor
router.post("/", async(req,res) => {
    const { sigla, desc } = req.body;

    try{
        const response = await prisma.setor.create({
            data: {
                Sigla: sigla,
                DescSetor: desc
            }
        })

        return res.status(200).json(response);
    }
    catch(error){
        if (error.response && error.response.data) {
            return res.status(error.response.status).json(error.response.data);
        } else {
            return res.status(500).json({ error: error.message });
        }
    }
    finally{
        await prisma.$disconnect();
    }
})

//Atualizar Setor
router.put("/:id", async(req,res) => {
    const { id } = req.params;
    const { sigla, desc } = req.body;

    const updateData = {};
    if(sigla) updateData.Sigla = sigla;
    if(desc) updateData.DescSetor = desc;

    try{
        const response = await prisma.setor.update({
            where: {
                id: parseInt(id)
            },
            data: updateData
        })

        return res.status(200).json(response);
    }
    catch(error){
        if (error.response && error.response.data) {
            return res.status(error.response.status).json(error.response.data);
        } else {
            return res.status(500).json({ error: error.message });
        }
    }
    finally{
        await prisma.$disconnect();
    }
})

// Deletar Setor
router.delete("/:id", async(req,res) => {
    const { id } = req.params;

    try{
        const response = await prisma.setor.delete({
            where:{
                id: parseInt(id)
            }
        })

        return res.status(200).json(response);
    }
    catch(error){
        if (error.response && error.response.data) {
            return res.status(error.response.status).json(error.response.data);
        } else {
            return res.status(500).json({ error: error.message });
        }
    }
    finally{
        await prisma.$disconnect();
    }
})

// Todos os Setores
router.get("/", async(req,res) => {
    try{
        const response = await prisma.setor.findMany()

        return res.status(200).json(response)
    }
    catch(error){
        if (error.response && error.response.data) {
            return res.status(error.response.status).json(error.response.data);
        } else {
            return res.status(500).json({ error: error.message });
        }
    }
    finally{
        await prisma.$disconnect();
    }
})






module.exports = router;