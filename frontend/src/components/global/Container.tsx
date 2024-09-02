import styled from "styled-components";

interface ContainerProps {
    mh?: string;
    mw?: string;
    wd?: string;
}

export const Container = styled.div<ContainerProps>`
    width: ${(props) => props.wd || "10"}0%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content:center;
`;

export const ContainerBox = styled.div<ContainerProps>`
    background-color: #e6e6e69e;
    opacity: 0.7;
    max-width: ${(props) => props.mw || ""};
    min-height: ${(props) => props.mh || "55vh"};
    box-shadow: 0px -3px 8px #0000003d,
                0px 3px 8px #0000003d;   
`;