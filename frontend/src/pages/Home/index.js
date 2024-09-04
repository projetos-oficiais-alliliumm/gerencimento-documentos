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
import TableIndex from "./tableIndex";
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
                        <TableIndex filterNbDoc={filterNbDoc} filterTitulo={filterTitulo} filterTipo={filterTipo} />
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
                                <Input type="text" />
                            </div>
                            <div >
                                <Label >Título</Label>
                                <Input type="text" />
                            </div>
                        </div>
                        <div style={styledContainerDiv}>
                            <div style={styledEntreDiv}>
                                <Label>Tipo</Label>
                                <Form.Select>
                                    <option value={""}>Escolha...</option>
                                    {
                                        optionTipoDoc.map((d, i) => (
                                            <option key={i} value={d.id}>{d.DescTipoDocumento}</option>
                                        ))
                                    }
                                </Form.Select>
                            </div>
                            <div style={styledEntreDiv}>
                                <Label >Data documento</Label>
                                <Input type="date"/>
                            </div>
                            <div >
                                <Label >Arquivo</Label>
                                <Input type="file"/>
                            </div>
                        </div>
                        <div style={styledContainerDiv}>
                            <div >
                                <Label >Descrição</Label>
                                <TextArea />
                            </div>
                        </div>
                        <div style={styledBotaoDiv}>
                            <Button
                                txtC="#1b3e75"
                                bgC='#caf1ff75'
                                bgHC="#1b3e75"
                                mr="0"
                                hg="38px"
                                
                                >Adicionar Documento</Button> 
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