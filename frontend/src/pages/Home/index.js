import React from "react";
import { useState,useEffect } from "react";
import axios from 'axios';
import Api from '../../api';

import { AreaMain } from "../../components/Main";
import { Container, ContainerBox } from "../../components/global/Container";
import { Title1 } from "../../components/global/Title";
import { Button } from "../../components/global/Button";
import { Input, TextArea } from "../../components/global/Input";
import { Label } from "../../components/global/Label";

import Modal from "../../components/global/Modal";
import TableIndex from "./components/tableIndex";
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

function Home() {
    const [openModal, setOpenModal] = useState(false);
    const [openModalErro, setOpenModalErro] = useState(false);
    const [optionTipoDoc, setOptionTipoDoc] = useState([]);

    const [filterNbDoc, setFilterNbDoc] = useState('');
    const [filterTitulo, setFilterTitulo] = useState('');
    const [filterTipo, setFilterTipo] = useState('');

    const fetchRecords = async () => {
        try {
            const res = await axios.get(api('/documento/'));
            return res;
        } catch (error) {
            setOpenModalErro(true);
            console.log(error);
        }
    };

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

    const [numeroDocumento, setNumeroDocumento] = useState('');
    const [titulo, setTitulo] = useState('');
    const [tipo, setTipo] = useState('');
    const [dataDocumento, setDataDocumento] = useState('');
    const [descricao, setDescricao] = useState('');
    const [arquivo, setArquivo] = useState(null);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        setNumeroDocumento('');
        setTitulo('');
        setTipo('');
        setDataDocumento('');
        setDescricao('');
    }, []);

    const validateForm = () => {
        const newErrors = {};
        if (!numeroDocumento) newErrors.numeroDocumento = "Número do documento é obrigatório";
        if (!titulo) newErrors.titulo = "Título é obrigatório";
        if (!tipo) newErrors.tipo = "Tipo é obrigatório";
        if (!dataDocumento) newErrors.dataDocumento = "Data do documento é obrigatória";
        if (!arquivo) newErrors.arquivo = "Arquivo é obrigatório";
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
                method: 'POST',
                body: formData,
            };

                response = await fetch(api('/documento'), requestOptions);
            if (response.ok) {
                console.log(`Documento criado com sucesso!`);
                setOpenModal(false);
            } else {
                throw new Error('Erro ao enviar o formulário');
            }
        } catch (error) {
            console.error("Erro ao enviar o formulário:", error);
        }
    };

    return(
        <>
            <AreaMain>
                <Container wd="7">
                    <Title1>
                        Gerenciamento de Documentos
                    </Title1>
                    <div>
                        <Button onClick={()=> setOpenModal(true)}>Novo Documento</Button>
                    </div>
                    <div style={styledContainerDiv}>
                        <div style={styledEntreDiv} >
                            <Label>Número Documento</Label>
                            <Input type="text" value={filterNbDoc} onChange={(e) => setFilterNbDoc(e.target.value)} />
                        </div>
                        <div style={styledEntreDiv} >
                            <Label >Título</Label>
                            <Input type="text" value={filterTitulo} onChange={(e) => setFilterTitulo(e.target.value)} />
                        </div>
                        <div style={styledEntreDiv} >
                            <Label>Tipo</Label>
                            <Form.Select value={filterTipo} onChange={(e) => setFilterTipo(e.target.value)}>
                                <option value={""}>Escolha...</option>
                            {
                                optionTipoDoc.map((d, i) => (
                                    <option key={i} value={d.id}>{d.DescTipoDocumento}</option>
                                ))
                            }
                            </Form.Select>
                        </div>
                    </div>
                    <ContainerBox bgC="#ffff" mh="55vh">
                        <TableIndex filterNbDoc={filterNbDoc} filterTitulo={filterTitulo} filterTipo={filterTipo} fetchRecords={fetchRecords}/>
                    </ContainerBox>                
                </Container>
            </AreaMain>

            <Modal
                isOpen={openModal} 
                childrenTitle= "Novo Documento"
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
                            >Adicionar</Button> 
                    </div>
                </Container>
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


export default Home;