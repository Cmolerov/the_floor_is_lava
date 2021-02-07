import React from 'react';
import { useHistory } from "react-router-dom"
import './Modal.css'; 

export function Modal({ open, children, onClose }) {
    let history = useHistory();
    const handleClick = () => {
        history.push(`/routes/`);
    }

    return (
        <div>
            {open ? 
            <>
                    <div className='modal-overlay' onClick={() => {
                        onClose()
                        handleClick()
                    }
                    } />
            </>
                :
                null
            }
                <div>
                    {children}
                    </div>
        </div>
    )
}