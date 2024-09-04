import styled from "styled-components";

export const Table = styled.table `
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
    border: 1px solid #ddd;
    text-align: center;

    td {
        padding: 16px;
        border: 1px solid #ddd;
        width: auto;
    }

    th {
        padding: 16px;
        border: 1px solid #ddd;
        width: auto;
    }

    tr:nth-child(even) {
        background-color: #f2f2f2;
    }  
    
    tr:hover {
        background-color: #ddd;
    }

    th {
        padding-top: 12px;
        padding-bottom: 12px;
        text-align: left;
        background-color: #4fb4fb;
        color: white;
    }
    
    td {
        padding-top: 12px;
        padding-bottom: 12px;
    }
    
    td, th {
        border: 1px solid #ddd;
        padding: 8px;
    }
`;