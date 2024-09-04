// import React, {useEffect, useState} from 'react';
// import axios from 'axios';
// import Api from '../../../api';

// import { Table } from '../../../components/global/Table';
// import { Button } from '../../../components/global/Button';
// import { FaMagnifyingGlassPlus } from "react-icons/fa6";

// import Modal from "../../../components/global/Modal";

// const { api } = Api();


// export default function TableTramite({ selectedDoc }){

//     const [columns, setColumns] = useState([])
//     const [records, setRecords] = useState([])
//     // const [openModal, setOpenModal] = useState(false);
//     const [openModalErro, setOpenModalErro] = useState(false);
//     // const [selectedDoc, setSelectedDoc] = useState(null); // Armazena o documento selecionado

//     const headers = ["Nº Documento", "Título", "Tipo", "Data", "Status", "Icon"];

//     useEffect(()=>{
//         axios.get(api('/documento/'+selectedDoc+'/tramite'))
//         .then(res => {
//             setColumns(headers)
//             setRecords(res.data)
//         })
//         .
//         catch(error =>{
//             setOpenModalErro(true);
//             console.log(error)
//         })
//     },[])

//     const data = filteredData.map(d => ({
//         nbDoc: d.NbDocumento,
//         titulo: d.Titulo,
//         tipo: d.TipoDocumento.DescTipoDocumento,
//         dataD: d.DataDocumento.substring(0, 10),
//         status: "Active", 
//         icons: (
//             <Button
//                 txtC="black"
//                 bgC='#ffeb00'
//                 bgHC="#ffae00"
//                 wd="64px"
//                 hg="40px"
//                 onClick={()=> handleButtonClick(d.id)}
//                 ><FaMagnifyingGlassPlus /></Button> 
//         )
//     }))


//     return (
//         <>
//         <div style={{opacity:"0.7"}}>
//             <Table>
//                 <thead>
//                     <tr>
//                         {columns.map((header, index) => (
//                             <th key={index}>{header}</th>
//                         ))}
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {
//                         data.map((d, i) => (
//                             <tr key={i}>
//                                 <td>{d.nbDoc}</td>
//                                 <td>{d.titulo}</td>
//                                 <td>{d.tipo}</td>
//                                 <td>{d.dataD}</td>
//                                 <td>{d.status}</td>
//                                 <td>{d.icons}</td>
//                             </tr>
//                         ))
//                     }
//                 </tbody>
//             </Table>
//         </div>

//         <Modal 
//             mw='50vh'
//             mh='20vh'
//             isOpen={openModalErro}  
//             childrenTitle= "Erro!"
//             setModalOpen={() => setOpenModalErro(!openModalErro)}
//             >
//             <div style={{textAlign:'left', marginLeft: "40px"}}>
//                 <p>Erro ao executar a solicitação.</p>
//             </div>
//         </Modal>        
//         </>
//     );
// }