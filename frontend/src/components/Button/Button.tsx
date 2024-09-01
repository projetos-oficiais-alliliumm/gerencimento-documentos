import React, {ReactNode} from 'react';
import './Button.css'


interface ButtonProps {
    children: ReactNode;
}


function Button({children}: ButtonProps){

    return (
        <button>
            {children}
        </button>
    )

}

export default Button;