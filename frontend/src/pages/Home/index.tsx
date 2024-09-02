import React from "react";
import { AreaMain } from "../../components/Main";

import { Container, ContainerBox } from "../../components/global/Container";
import { Title1 } from "../../components/global/Title";
import { Button } from "../../components/global/Button";


function Home() {
    return(
        <AreaMain>
            <Container wd="9">
                <Title1>
                    Gerenciamento de Documentos
                </Title1>
                <div className="mtop" >
                    <Button>Novo Documento</Button>
                </div>
                <ContainerBox mh="55vh">
                </ContainerBox>                
            </Container>
        </AreaMain>


        /* <div id="myModalFotoPerfil" style="display:none;" class="modal-foto">

            <span class="close-foto-modal">&times;</span>

            <img class="modal-foto-content" id="fotoVisualizarModal">

            <div class="modal-foto-caption" id="captionFoto"></div>
        </div> */
    );
}


export default Home;