import React, { useState, useEffect } from "react";
import axios from 'axios';
import Api from '../../../api';

import { Container } from "../../../components/global/Container";
import { Button } from "../../../components/global/Button";
import { Input, TextArea } from "../../../components/global/Input";
import { Label } from "../../../components/global/Label";

import Modal from "../../../components/global/Modal";
import Form from 'react-bootstrap/Form';

const { api } = Api();

const styledContainerDiv = {
    display: "flex", 
    justifyContent: "space-between", 
    marginTop: "20px", 
    marginBottom: "20px", 
    width: "100%"
}

const styledBotaoDiv = {
    display: "flex", 
    justifyContent: "flex-end",
    marginTop: "20px", 
    marginBottom: "20px", 
    width: "100%"
}

const styledEntreDiv = {
    marginRight: "20px"
}

const styledContDiv = {
    border:'1px solid black',
    padding: '20px',
}

const styleDivRow = {
    display: "flex", 
    border:'1px solid black',
}
export default function DetalhesDoc({ selectedDoc, openModalDetails, setOpenModalDetails,onSaveSuccess}){
    const [openModalErro, setOpenModalErro] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [optionTipoDoc, setOptionTipoDoc] = useState([]);
    
    const [records, setRecords] = useState(null)

    const [dataUpdate, setDataUpdate] = useState(null)

    const [numeroDocumento, setNumeroDocumento] = useState('');
    const [titulo, setTitulo] = useState('');
    const [tipo, setTipo] = useState('');
    const [dataDocumento, setDataDocumento] = useState('');
    const [descricao, setDescricao] = useState(''); // Adiciona estado para descrição
    const [arquivo, setArquivo] = useState(null);
    const [errors, setErrors] = useState({});

    const fetchRecordsDetails = () => {
        if(selectedDoc){
            axios.get(api('/documento/'+selectedDoc))
            .then(res => {
                const { response } = res.data;
                setRecords(res.data);
                setDataUpdate({
                    NbDocumento: response.NbDocumento,
                    Titulo: response.Titulo,
                    id: response.id,
                    PathArquivoPDF: response.PathArquivoPDF,
                    arquivoUrl: res.data.arquivoUrl,
                    DescDocumento: response.DescDocumento,
                    DescTipoDocumento: response.TipoDocumento?.DescTipoDocumento,
                    TipoDocumento_id: response.TipoDocumento_id,
                    DataDocumento: response.DataDocumento ? response.DataDocumento.substring(0, 10) : 'Data não disponível',
                    status: ""
                });
                // Preenche os campos do modal
                setNumeroDocumento(response.NbDocumento);
                setTitulo(response.Titulo);
                setTipo(response.TipoDocumento_id);
                setDataDocumento(response.DataDocumento ? response.DataDocumento.substring(0, 10) : '');
                setDescricao(response.DescDocumento);
            })
            .catch(error =>{
                setOpenModalErro(true);
                console.log(error)
            })
        }
    }

    useEffect(()=>{
        fetchRecordsDetails()
    },[selectedDoc, openModalDetails])

    useEffect(() => {
        axios
            .get(api("/documento/tipo/all"))
            .then((res) => {
                setOptionTipoDoc(res.data);
            })
            .catch((error) => {
                setOpenModalErro(true);
                console.log(error)
            });
    }, []);

    const validateForm = () => {
        const newErrors = {};
        if (!numeroDocumento) newErrors.numeroDocumento = "Número do documento é obrigatório";
        if (!titulo) newErrors.titulo = "Título é obrigatório";
        if (!tipo) newErrors.tipo = "Tipo é obrigatório";
        if (!dataDocumento) newErrors.dataDocumento = "Data do documento é obrigatória";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleFormDocAction = async () => {
        if (!validateForm()) return;

        const formData = new FormData();
        formData.append('nb', numeroDocumento);
        formData.append('titulo', titulo);
        formData.append('desc', descricao);
        formData.append('tipoid', tipo);
        formData.append('dataDocumento', dataDocumento);
        if (arquivo) formData.append('arquivo', arquivo);

        try {
            let response;
            const requestOptions = {
                method: 'PUT',
                body: formData,
            };

            response = await fetch(api(`/documento/${dataUpdate.id}`), requestOptions);

            if (response.ok) {
                console.log(`Documento alterado com sucesso!`);
                setOpenModal(false);
                onSaveSuccess();  // Notifica o pai para atualizar
                fetchRecordsDetails();  // Garante que o modal de detalhes seja reaberto
            } else {
                throw new Error('Erro ao enviar o formulário');
            }
        } catch (error) {
            console.error("Erro ao enviar o formulário:", error);
        }
    };

    const handleDelete = async () => {

        try {
            let response;
            const requestOptions = {
                method: 'DELETE',
            };

            response = await fetch(api(`/documento/${dataUpdate.id}`), requestOptions);

            if (response.ok) {
                console.log(`Documento excluído com sucesso!`);
                setOpenModalDetails(false);
                onSaveSuccess();
            } else {
                throw new Error('Erro ao enviar o formulário');
            }
        } catch (error) {
            console.error("Erro ao enviar o formulário:", error);
        }
    }


    return(
        <>
        <Modal 
            // mw='50vh'
            // mh='20vh'
            isOpen={openModalDetails}  
            childrenTitle= "Documento"
            setModalOpen={() => setOpenModalDetails(!openModalDetails)}
            >
                
            <Container wd="9" style={styledContDiv}>
                <div style={styleDivRow}>
                    <span>Número do Documento:</span><span>{dataUpdate?.NbDocumento}</span>
                    <span>Título:</span><span>{dataUpdate?.Titulo}</span>
                </div>
                <div style={styleDivRow}>
                    <span>Tipo:</span><span>{dataUpdate?.TipoDocumento ? dataUpdate?.DescTipoDocumento : 'Tipo não disponível'}</span>
                    <span>Data:</span><span>{dataUpdate?.DataDocumento}</span>
                </div>
                <div style={styleDivRow}>
                    {dataUpdate?.PathArquivoPDF && (
                        <p><a href={dataUpdate.arquivoUrl} download>Download do Arquivo</a></p>
                    )}
                </div>
                <div style={styleDivRow}>
                    <span><p>Descrição:</p>{dataUpdate?.DescDocumento}</span>
                </div>
                <div>
                    <Button
                            txtC="#1b3e75"
                            bgC='#caf1ff75'
                            bgHC="#e7cf11"
                            mr=""
                            hg="38px"
                            onClick={()=> setOpenModal(true)}
                            >Alterar</Button> 
                    <Button
                            txtC="#1b3e75"
                            bgC='#caf1ff75'
                            bgHC="#e70d0d"
                            mr="10px"
                            hg="38px"
                            onClick={()=> handleDelete(true)}
                            >Excluir</Button> 
                </div>
            <input value={selectedDoc} type='hidden'  id="idDocumento"/>

            </Container>

            <Modal
                isOpen={openModal} 
                childrenTitle= "Alterar Documento"
                setModalOpen={() => setOpenModal(!openModal)}
            >
                <Container wd="9">
                    <div style={styledContainerDiv}>
                        <div style={styledEntreDiv}>
                            <Label>Número Documento</Label>
                            <Input type="text" value={numeroDocumento} onChange={(e) => setNumeroDocumento(e.target.value)}/>
                            {errors.numeroDocumento && <span>{errors.numeroDocumento}</span>}
                        </div>
                        <div>
                            <Label>Título</Label>
                            <Input value={titulo} type="text" onChange={(e) => setTitulo(e.target.value)} />
                            {errors.titulo && <span>{errors.titulo}</span>}
                        </div>
                    </div>
                    <div style={styledContainerDiv}>
                        <div style={styledEntreDiv}>
                            <Label>Tipo</Label>
                            <Form.Select value={tipo} onChange={(e) => setTipo(e.target.value)}>
                                <option value="">Escolha...</option>
                                {optionTipoDoc.map((d) => (
                                    <option key={d.id} value={d.id}>
                                        {d.DescTipoDocumento}
                                    </option>
                                ))}
                            </Form.Select>
                            {errors.tipo && <span>{errors.tipo}</span>}
                        </div>
                        <div style={styledEntreDiv}>
                            <Label>Data documento</Label>
                            <Input value={dataDocumento} type="date" onChange={(e) => setDataDocumento(e.target.value)} />
                            {errors.dataDocumento && <span>{errors.dataDocumento}</span>}
                        </div>
                        <div >
                            <Label>Arquivo</Label>
                            <Input type="file" onChange={(e) => setArquivo(e.target.files?.[0] || null)} />
                            {errors.arquivo && <span>{errors.arquivo}</span>}
                        </div>
                    </div>
                    <div style={styledContainerDiv}>
                        <div >
                            <Label >Descrição</Label>
                            <TextArea value={descricao} 
                                onChange={(e) => setDescricao(e.target.value)}  />
                        </div>
                    </div>
                    <div style={styledBotaoDiv}>
                        <Button
                            txtC="#1b3e75"
                            bgC='#caf1ff75'
                            bgHC="#1b3e75"
                            mr="0"
                            hg="38px"
                            onClick={handleFormDocAction}
                            >Salvar</Button> 
                    </div>
                </Container>
            </Modal>
        </Modal>

            <Modal 
            mw='50vh'
            mh='20vh'
            isOpen={openModalErro}  
            childrenTitle= "Erro!"
            setModalOpen={() => setOpenModalErro(!openModalErro)}
            >
            <div style={{textAlign:'left', marginLeft: "40px"}}>
                <p>Erro ao executar a solicitação.</p>
            </div>
            </Modal>
        </>

    );

}