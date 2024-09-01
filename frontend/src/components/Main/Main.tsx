import React, { useState } from "react";
import './Main.css';
import ContainerList from "../containerBox/containerBox";
import Button from "../Button/Button";

function Main (){

    return(

        <main>
            <div className="container">
                <h1>
                    Gerenciamento de Documentos
                </h1>
                <div>
                    <ContainerList>
                        Teste
                        <Button>Teste botao</Button>
                    </ContainerList>
                </div>
            </div>
        </main>
    );
}

export default Main;