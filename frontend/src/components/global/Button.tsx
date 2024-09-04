import styled from "styled-components";

interface ButtonProps {
    bgC?: string;
    txtC?: string;
    txtHC?: string;
    bgHC?: string;
    mr?: string;
    bdr?: string;
    hg?: string;
    wd?: string;
}

export const Button = styled.button<ButtonProps>`
    background-color: ${(props) => props.bgC || "#F6F9FE"};
    color: ${(props) => props.txtC || "#3f89ff"};
    padding: 8px 16px;
    transition: all 0.3s ease-in-out;
    margin: ${(props) => props.mr || "auto"};
    border-radius: 10px;
    border: ${(props) => props.bdr || "0.05px solid #3f89ff52"};
    font-size: 14px;
    align-items: center;
    appearance: none; // Remover Estilo Padrão
    display: inline-flex;
    height: ${(props) => props.hg || "48px"};
    letter-spacing: .25px;
    padding: 2px 24px;
    width: ${(props) => props.wd || "auto"};
    overflow: visible;    
    font-weight: 600;

    &:hover {
        background-color: ${(props) => props.bgHC || "#4cacff"};
        color: ${(props) => props.txtHC || "#F6F9FE"};   
        font-weight: 600;
        cursor: pointer;
    }
`;