import React from "react";
import { useState } from "react";
import { AreaMain } from "../../components/Main";
import { Container, ContainerBox } from "../../components/global/Container";
import { Title1 } from "../../components/global/Title";
import { Button } from "../../components/global/Button";
import Modal from "../../components/global/Modal";
import {Table} from "./table";

function Home() {
    const [openModal, setOpenModal] = React.useState(false);

    return(
        <>
            <AreaMain>
                <Container wd="9">
                    <Title1>
                        Gerenciamento de Documentos
                    </Title1>
                    <div className="mtop" >
                        <Button onClick={()=> setOpenModal(true)}>Novo Documento</Button>
                    </div>
                    <ContainerBox bgC="#ffff" opacity="0.7" mh="55vh">
                        <Table />
                    </ContainerBox>                
                </Container>
            </AreaMain>
            <Modal 
                isOpen={openModal} 
                childrenTitle= "Novo Documento"
                setModalOpen={() => setOpenModal(!openModal)}
                >
                    Teste
            </Modal>
        </>
    );
}


export default Home;