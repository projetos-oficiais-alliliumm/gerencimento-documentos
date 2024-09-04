import React from 'react';
import styled from "styled-components";
import { TfiClose } from "react-icons/tfi";
import { Container, ContainerBox } from "./Container";
import { Button } from "./Button";
import { Title2 } from "./Title"

interface ModalProps {
    mw?: string;
    mh?: string;
    isOpen: boolean;
    setModalOpen: () => void;
    children: React.ReactNode;
    childrenTitle: string;
}

const BackModal= styled.div`
    display: flex;
    position: fixed;
    z-index: 1000; 
    padding-top: 100px;
    left: 0;
    top: 0;
    height: 100%;
    overflow: auto;
    background-color: rgba(0,0,0,0.5);
    flex-direction: column;
    align-items: center;
    justify-content:center;
`;

const ModalBox = styled.div<{ mw?: string; mh?: string }>`
    background-color: #ffff;
    max-width: ${(props) => props.mw || "85vh"};
    min-height: ${(props) => props.mh || "70vh"};
    border-radius: 15px;
    box-shadow: 0px -3px 8px #0000003d,
                0px 3px 8px #0000003d;
    margin: auto;
    display: block;
`;

const ModalHeader = styled.div`
    background-color: #ffff;
    border-radius: 15px;
    margin: auto;
    display: flex;
    padding: 20px;
    justify-content: space-between;
    align-items: center;
`;

const iconClose = {
    // width:"50px",
    height:"1.4em",
}

export default function Modal(
    {
        isOpen,
        setModalOpen,
        childrenTitle,
        children,
        mh,
        mw
    }: ModalProps
){
    if (!isOpen) return null;
    
    return (
        <BackModal>
            <ModalBox mh={mh} mw={mw}>
                <Container>
                    <ModalHeader>
                        <Title2>
                            {childrenTitle}
                        </Title2>
                        <Button 
                            txtC="black"
                            bdr="none"
                            bgHC="#ff0404"
                            hg="50px"
                            onClick={setModalOpen}
                            >
                                <TfiClose style={iconClose} />
                            </Button>
                    </ModalHeader>
                        {children}
                </Container>
            </ModalBox>
        </BackModal>
    );
}