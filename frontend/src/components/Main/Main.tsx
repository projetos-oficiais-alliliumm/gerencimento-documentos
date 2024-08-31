import React, { useState } from "react";
import './Main.css';
import ContainerList from "../containerBox/containerBox";

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
                    </ContainerList>
                </div>
            </div>
        </main>
    );
}

export default Main;
