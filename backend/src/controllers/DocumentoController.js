const express = require("express");
const { PrismaClient } = require('@prisma/client');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const prisma = new PrismaClient();

router.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// ARQUIVOS 
const storaged = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null, 'uploads/');
    },
    filename: function(req,file,cb){
        const nb = req.body.nb || '|';
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})
const upload = multer({ storage: storaged });

// DOCUMENTO //

// Novo Documento
router.post("/",upload.single('arquivo'), async(req,res) => {
    const { path: filePath } = req.file;
    const { nb, titulo, desc, tipoid } = req.body;

    try{

        const response = await prisma.documento.create({
            data:{
                NbDocumento: nb,
                Titulo: titulo,
                DescDocumento: desc,
                PathArquivoPDF: filePath,
                TipoDocumento_id: parseInt(tipoid)
            }
        })

        return res.status(200).json(response);

    }
    catch(error){
        console.error('Erro ao criar documento:', error);
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

// Alteração Documento
const uploadTemporary = multer({ storage: multer.memoryStorage() });
router.put("/:id", uploadTemporary.single('arquivo'), async(req,res) => {

    const { id } = req.params;
    const { nb, titulo, desc, tipoid } = req.body;
    
    const updateData = {};
    if(nb) updateData.NbDocumento = nb;
    if(titulo) updateData.Titulo = titulo;
    if(desc) updateData.DescDocumento = desc;
    if(tipoid) updateData.TipoDocumento_id = parseInt(tipoid);
    if(req.file) {
        const filePath = `uploads/${Date.now()}-${req.file.originalname}`;
        fs.writeFileSync(filePath, req.file.buffer);
        updateData.PathArquivoPDF = filePath;
    }

    try{
        const response = await prisma.documento.update({
            where: {
                id: parseInt(id)
            },
            data: updateData
        })

        return res.status(200).json(response);
    }
    catch(error){
        console.error('Erro ao atualizar documento:', error);
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

// Deletar Documento
router.delete("/:id",async(req,res) => {
    const { id } = req.params;

    try{
        const response = await prisma.documento.delete({
            where:{
                id: parseInt(id)
            }
        })

        return res.status(200).json(response);
    }
    catch(error){
        console.error('Erro ao deletar documento:', error);
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

// Todos Documentos
router.get("/", async(req,res) => {
    try{
        const { id, nb, titulo, tipo } = req.query;

        const NbDocumento = nb
        const Titulo = titulo
        const TipoDocumento_id = tipo

        const whereCondition = {
            ...(
                id && { 
                    id: parseInt(id) 
                }
            ),
            ...(
                NbDocumento && { 
                    NbDocumento: { 
                        contains: NbDocumento, 
                        mode: "insensitive" 
                    }
                }
            ),
            ...(
                Titulo && { 
                    Titulo: { 
                        contains: titulo, 
                        mode: "insensitive" 
                    } 
                }
            ),
            ...(
                TipoDocumento_id && {
                    TipoDocumento_id: parseInt(tipo) 
                }
            ),
        };


        const response = await prisma.documento.findMany({
            where:Object.keys(whereCondition).length ? whereCondition : undefined,
            include: {
                TipoDocumento: {
                select: {
                    DescTipoDocumento: true,
                },
                },
            }
        })

        return res.status(200).json(response)
    }
    catch(error){
        console.error('Erro ao buscar os documentos:', error);
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

// Um Documento
router.get("/:id", async(req,res) => {
    const { id } = req.params;

    try{
        const response = await prisma.documento.findUnique({
            where: { 
                id: parseInt(id)
            },
            include: {
                TipoDocumento: {
                select: {
                    DescTipoDocumento: true,
                },
                },
            },
        });

        if (!response) {
            return res.status(404).json({ error: 'Documento não encontrado' });
        }

        const fileName = path.basename(response.PathArquivoPDF);
        const encodedFileName = encodeURIComponent(fileName);
        const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${encodedFileName}`;

        res.status(200).json({
            response
            ,arquivoUrl: fileUrl
        });
    }
    catch(error){
        console.error('Erro ao buscar o documento:', error);
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

// TIPO DO DOCUMENTO //

// Novo Tipo
router.post("/tipo", async(req,res) => {
    const { desc } = req.body;

    try{
        const response = await prisma.tipoDocumento.create({
            data: {
                DescTipoDocumento: desc
            }
        })

        return res.status(200).json(response);
    }
    catch(error){
        console.error('Erro ao criar tipo de documento:', error);
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

// Alterar Tipo
router.put("/tipo/:id", async(req,res) => {
    const { id } = req.params;
    const { desc } = req.body;

    try{
        const response = await prisma.tipoDocumento.update({
            where: {
                id: parseInt(id)
            },
            data: {
                DescTipoDocumento: desc
            }
        })

        return res.status(200).json(response);
    }
    catch(error){
        console.error('Erro ao atualizar tipo de documento:', error);
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

// Deletar Tipo
router.delete("/tipo/:id", async(req,res) => {
    const { id } = req.params;

    try{
        const response = await prisma.tipoDocumento.delete({
            where:{
                id: parseInt(id)
            }
        })

        return res.status(200).json(response);
    }
    catch(error){
        console.error('Erro ao deletar tipo de documento:', error);
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

// Todos os Tipos
router.get("/tipo", async(req,res) => {
    try{
        const response = await prisma.tipoDocumento.findMany()

        return res.status(200).json(response)
    }
    catch(error){
        console.error('Erro ao buscar os tipos de documento:', error);
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

// TRAMITAÇÃO //

// Enviar documento - Em trâmite - TESTE
router.post(":docId/tramite", async(req,res) => {
    const { docId } = req.params;
    const { setorEnvioId,setorRecebeId} = req.body;

    try{
        const response = await prisma.tramitacao.create({
            data: {
                Documento_id: parseInt(docId),
                Setor_Envio_id: parseInt(setorEnvioId),
                Setor_Recebe_id: parseInt(setorRecebeId)
            }
        })

        return res.status(200).json(response);
    }
    catch(error){
        console.error('Erro ao iniciar trâmite do documento:', error);
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

// Receber documento - Em trâmite - TESTE
router.put(":docId/tramite/:id", async(req,res) => {
    const { docId, id} = req.params;

    try{
        const response = await prisma.tramitacao.update({
            where: {
                id: parseInt(id),
                Documento_id: parseInt(docId)
            },
            data: {
                DataHoraRecebe: new Date()
            }
        })

        return res.status(200).json(response);
    }
    catch(error){
        console.error('Erro ao atualizar trâmite do documento:', error);
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

// Todos os Trâmites de um documento - TESTE
router.get(":docId/tramite", async(req,res) => {
    const { docId } = req.params;

    try{
        const response = await prisma.tramitacao.findMany({
            where: {
                Documento_id: parseInt(docId)
            },
            include: {
                SetorEnviado: true,
                SetorRecebe: true,
                Documento: true
            }
        })

        return res.status(200).json(response);
    }
    catch(error){
        console.error('Erro ao atualizar trâmite do documento:', error);
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