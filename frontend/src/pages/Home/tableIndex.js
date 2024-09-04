import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Api from '../../api';

import { Table } from '../../components/global/Table';
import { Button } from '../../components/global/Button';
import { FaMagnifyingGlassPlus } from "react-icons/fa6";
import Modal from "../../components/global/Modal";

const { api } = Api();

export default function TableIndex({ filterNbDoc, filterTitulo, filterTipo }){

    const [columns, setColumns] = useState([])
    const [records, setRecords] = useState([])
    const [openModal, setOpenModal] = useState(false);
    const [openModalErro, setOpenModalErro] = useState(false);
    const [selectedDoc, setSelectedDoc] = useState(null); // Armazena o documento selecionado

    const headers = ["Nº Documento", "Título", "Tipo", "Data", "Status", "Icon"];

    useEffect(()=>{
        axios.get(api('/documento/'))
        .then(res => {
            setColumns(headers)
            setRecords(res.data)
        })
        .
        catch(error =>{
            setOpenModalErro(true);
            console.log(error)
        })
    },[])

    const handleButtonClick = (docId) => {
        setSelectedDoc(docId);
        setOpenModal(true);
    };

    const filteredData = records.filter(d =>
        (filterNbDoc === '' || d.NbDocumento.includes(filterNbDoc)) &&
        (filterTitulo === '' || d.Titulo.includes(filterTitulo.toLowerCase())) &&
        (filterTipo === '' || d.TipoDocumento_id === filterTipo)
    )

    console.log('Filtros:', { filterNbDoc, filterTitulo, filterTipo });
    console.log('Dados originais:', records);
    console.log('Dados filtrados:', filteredData);

    const data = filteredData.map(d => ({
        nbDoc: d.NbDocumento,
        titulo: d.Titulo,
        tipo: d.TipoDocumento.DescTipoDocumento,
        dataD: d.DataDocumento.substring(0, 10),
        status: "Active", 
        icons: (
            <Button
                txtC="black"
                bgC='#ffeb00'
                bgHC="#ffae00"
                wd="64px"
                hg="40px"
                onClick={()=> handleButtonClick(d.id)}
                ><FaMagnifyingGlassPlus /></Button> 
        )
    }))

    return (
        <>
        <div style={{opacity:"0.7"}}>
            <Table>
                <thead>
                    <tr>
                        {columns.map((header, index) => (
                            <th key={index}>{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((d, i) => (
                            <tr key={i}>
                                <td>{d.nbDoc}</td>
                                <td>{d.titulo}</td>
                                <td>{d.tipo}</td>
                                <td>{d.dataD}</td>
                                <td>{d.status}</td>
                                <td>{d.icons}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        </div>

        <Modal 
            // mw='50vh'
            // mh='20vh'
            isOpen={openModal}  
            childrenTitle= "Documento"
            setModalOpen={() => setOpenModal(!openModal)}
            >
                <div style={{textAlign:'left', marginLeft: "40px",height:"auto"}}>
                    <p>Detalhes do documento {selectedDoc}</p>
                </div>
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
