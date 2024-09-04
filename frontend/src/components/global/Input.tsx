import styled from "styled-components";

interface InputProps {
    hg?: string;
}

export const Input = styled.input <InputProps>`
    width: 100%;
    height: ${(props) => props.hg || "38px"};
    border: 1px solid #ddd;
    border-radius: 5px;
    padding-left: 10px;
    box-sizing: border-box;
    margin: 1px 0;
    min-width: 100px;

    &:hover {
        border: 1px solid #3f89ff;
        box-shadow: 0 0 5px #3f89ff;
        transition: all 0.3s ease-in-out;
        color: #3f89ff;
    }

    &:focus {
        outline: none;
        border: 1px solid #3f89ff;
        box-shadow: 0 0 5px #3f89ff;
        transition: all 0.3s ease-in-out;
        color: #3f89ff;
    }
    
`;

export const TextArea = styled.textarea <InputProps>`
    width: 100%;
    height: ${(props) => props.hg || "150px"};
    border: 1px solid #ddd;
    border-radius: 5px;
    padding-left: 10px;
    box-sizing: border-box;
    margin: 1px 0;
    min-width: 100px;

    resize: none;

    &:hover {
        border: 1px solid #3f89ff;
        box-shadow: 0 0 5px #3f89ff;
        transition: all 0.3s ease-in-out;
        color: #3f89ff;
    }

    &:focus {
        outline: none;
        border: 1px solid #3f89ff;
        box-shadow: 0 0 5px #3f89ff;
        transition: all 0.3s ease-in-out;
        color: #3f89ff;
    }
`