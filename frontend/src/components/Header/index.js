import React, { useState,useEffect } from "react";
import axios from 'axios';
import Api from '../../api';

import { AreaHeader } from './styled'
import { Button } from "../global/Button";
import { FaMagnifyingGlassPlus } from "react-icons/fa6";
import { Label } from "../global/Label";

import Modal from "../global/Modal"

import Container from 'react-bootstrap/Container';
import { ContainerS } from "../global/Container";
import { Table } from '../global/Table';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Input } from "../global/Input";

const { api } = Api();

export default function Header(){
    const [columns, setColumns] = useState([]);
    const [records, setRecords] = useState([]);
    const [openModalSetor, setOpenModalSetor] = useState(false);
    const [openModalNewSetor, setOpenModalNewSetor] = useState(false);
    const [openModalErro, setOpenModalErro] = useState(false);
    const [optionSetores, setOptionSetores] = useState([]);
    const [navDropString, setnavDropString] = useState('Selecionar Setor');
    const [idSetorEnvio, setIdSetorEnvio] = useState(0);
    const [selectedSetorD, setSelectedSetorD] = useState(null); 

    const headers = ["Sigla", "Setor", ""];

    const styledContainerDiv = {
        display: "flex", 
        justifyContent: "space-between", 
        marginTop: "20px", 
        marginBottom: "20px", 
        width: "100%"
    }

    const styledEntreDiv = {
        marginRight: "20px"
    }
    

    const styledBotaoDiv = {
        display: "flex", 
        justifyContent: "flex-end",
        marginTop: "20px", 
        marginBottom: "20px", 
        width: "100%"
    }

    const fetchRecordsSetor = async () => {
        try {
            const res = await axios.get(api('/setor/'));
            return res;
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchRecordsSetor()
        .then(res =>{
            setColumns(headers);
            setRecords(res.data);
            setOptionSetores(res.data);
        })
        .catch(error => {
            setOpenModalErro(true);
            console.log(error)
        });
    }, []);

    const handleButtonClick = (dsetoId) => {
        setSelectedSetorD(dsetoId);
        // setOpenModalDetails(true);
    };

    const data = records.map(d => ({
        id: d.id,
        sigla: d.Sigla,
        setor: d.DescSetor,
        icons: (
            <Button
                txtC="black"
                bgC='#ffeb00'
                bgHC="#ffae00"
                wd="64px"
                hg="40px"
                onClick={() => handleButtonClick(d.id)}
            >
                <FaMagnifyingGlassPlus />
            </Button>
        )
    }));


    const [Sigla, setSigla] = useState('');
    const [DescSetor, setTitulo] = useState('');
    const [errors, setErrors] = useState({});

    useEffect(() => {
        setSigla('');
        setTitulo('');
    }, []);

    const validateForm = () => {
        const newErrors = {};
        if (!Sigla) newErrors.Sigla = "Sigla é obrigatório";
        if (!DescSetor) newErrors.DescSetor = "Setor é obrigatório";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };


    const handleFormDocActionSetor = async () => {
        if (!validateForm()) return;

        try {
            const response = await fetch(api('/setor'),{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    sigla: Sigla,
                    desc: DescSetor,
                }),
            })

            if (response.ok) {
                console.log('Setor criado com sucesso!');
                setOpenModalNewSetor(false);
                const res = await fetchRecordsSetor();
                setRecords(res.data);
            } else {
                setOpenModalErro(true);
                throw new Error('Erro ao enviar o formulário');
            }
        } catch (error) {
            console.error("Erro ao enviar o formulário:", error);
        }
    };

    return (
        <AreaHeader>
            <Navbar expand="lg" className="navbarStyle">
                <Container>
                    <Navbar.Brand className="navbarStyleBrand"  href="#home"></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                        <Nav.Link href="#"></Nav.Link>
                            <NavDropdown title={navDropString} idSetorEnvio={idSetorEnvio} id="basic-nav-dropdown">
                                {optionSetores.map((d) => (
                                    <NavDropdown.Item onClick={()=> {setnavDropString(`${d.Sigla} - ${d.DescSetor}`);setIdSetorEnvio(d.id)}} href="#">
                                        {d.Sigla} - {d.DescSetor}
                                    </NavDropdown.Item>
                                ))}
                            <NavDropdown.Divider />
                                <NavDropdown.Item onClick={()=> setOpenModalSetor(true)} href="#">
                                    Setores
                                </NavDropdown.Item>
                                <NavDropdown.Item onClick={()=> {setnavDropString(`Selecionar Setor`);setIdSetorEnvio(0)}} href="#">
                                    Sair do Setor
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Modal
                isOpen={openModalSetor} 
                childrenTitle= "Setores"
                setModalOpen={() => setOpenModalSetor(!openModalSetor)}
            >
                <ContainerS wd="9">
                    <div style={{marginBottom:"20px"}}>
                        <Button onClick={()=> setOpenModalNewSetor(true)}>Novo Setor</Button>
                    </div>
                    <Table>
                        <thead>
                            <tr>
                                {columns.map((header, index) => (
                                    <th key={index}>{header}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((d, i) => (
                                <tr key={i}>
                                    <td>{d.sigla}</td>
                                    <td>{d.setor}</td>
                                    <td>{d.icons}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </ContainerS>
            </Modal>

            <Modal 
                mw='50vh'
                mh='30vh'
                isOpen={openModalNewSetor}  
                childrenTitle= "Novo Setor"
                setModalOpen={() => setOpenModalNewSetor(!openModalNewSetor)}
                >
                    <ContainerS wd="9">
                        <div style={styledContainerDiv}>
                        <div style={styledEntreDiv}>
                            <Label>Sigla</Label>
                            <Input type="text" value={Sigla} onChange={(e) => setSigla(e.target.value)}/>
                            {errors.Sigla && <span>{errors.Sigla}</span>}
                        </div>
                        <div>
                            <Label>Setor</Label>
                            <Input value={DescSetor} type="text" onChange={(e) => setTitulo(e.target.value)} />
                            {errors.DescSetor && <span>{errors.DescSetor}</span>}
                        </div>
                        <div style={styledBotaoDiv}>
                            <Button
                                txtC="#1b3e75"
                                bgC='#caf1ff75'
                                bgHC="#1b3e75"
                                mr="0"
                                hg="38px"
                                onClick={handleFormDocActionSetor}
                                >Adicionar</Button> 
                        </div>
                    </div>
                    </ContainerS>
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

        </AreaHeader>
    );
}