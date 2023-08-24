import React from 'react'

export default function AiModal({title, children, isOpen=false, onClose}:any) {
    if(!isOpen)return <></>;
    return (
        <div className="modal-overlay">
            <div className="modal glass-structure">
                <h3 className='modal-title'>{title}</h3>

                {children}
                <button className="modal-close-btn" onClick={()=> onClose()}>X</button>
            </div>
        </div>
    )
}
