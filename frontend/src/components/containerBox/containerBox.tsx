import React, {ReactNode} from 'react';
import './containerBox.css'


interface ContainerListProps {
    children: ReactNode;
}


function ContainerList({children}:ContainerListProps){

    return (
        <div className="container-box">
            {children}
        </div>
    )

}

export default ContainerList;