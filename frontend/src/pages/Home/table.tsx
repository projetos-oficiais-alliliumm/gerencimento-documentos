import React from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';

interface RowData {
    nbDoc: string;
    titulo: string;
    tipo: string;
    dataD: string;
    status: string;
    icons: string;
}

const columns: TableColumn<RowData>[] = [
    {
        name: 'Nº Documento',
        selector: (row) => row.nbDoc,
    },
    {
        name: 'Titulo',
        selector: (row) => row.titulo,
    },
    {
        name: 'Tipo',
        selector: (row) => row.tipo,
    },
    {
        name: 'Data',
        selector: (row) => row.dataD,
    },
    {
        name: 'Status',
        selector: (row) => row.status,

    },
    {
        name: '',
        selector: (row) => row.icons,

    },
];
const customStyles = {
    rows: {
        style: {
            transition: 'background-color 0.3s ease',
        },
    },
    headCells: {
        style: {
            fontWeight: 'bold',
            fontSize: '14px',
            color: '#333',
        },
    },
};


const conditionalRowStyles = [
    {
        when: () => true, // Apply to all rows
        style: {
            ':hover': {
            backgroundColor: '#e6e6e69e',
            },
        },
    },
];

const data: RowData[] = [
    { nbDoc: '1', titulo: 'John Doe', tipo: '28', dataD: '2024-01-01', status: 'Active',icons:"oi" },
    { nbDoc: '2', titulo: 'Jane Smith', tipo: '34', dataD: '2024-02-01', status: 'Inactive' ,icons:"oi"},
    { nbDoc: '3', titulo: 'Michael Johnson', tipo: '45', dataD: '2024-03-01', status: 'Active',icons:"oi" },
];

// Componente DataTable
const TabelaData: React.FC = () => (
<DataTable
    columns={columns}
    data={data}
    pagination
    customStyles={customStyles}
    conditionalRowStyles={conditionalRowStyles}
    />
);

// export default TabelaData;
export const Table = () => <DataTable columns={columns} data={data}/>;