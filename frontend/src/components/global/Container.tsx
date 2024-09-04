import styled from "styled-components";

interface ContainerProps {
    mh?: string;
    mw?: string;
    wd?: string;
    opacity?: string;
    bgC?: string;
}

export const Container = styled.div<ContainerProps>`
    width: ${(props) => props.wd || "10"}0%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content:center;
`;

export const ContainerBox = styled.div<ContainerProps>`
    background-color: ${(props) => props.bgC || "#e6e6e69e"};
    opacity: ${(props) => props.opacity || ""};
    max-width: ${(props) => props.mw || ""};
    max-height: ${(props) => props.mh || "55vh"};
    border: 1px solid #ddd;
    border-radius: 7px;
    margin: 10px 0;
    overflow: auto;   
`;