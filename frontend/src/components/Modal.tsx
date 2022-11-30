import React from 'react'

type Props = {
    isVisible: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

function Modal({ isVisible, onClose, children }: Props) {

    if (!isVisible) return null

    const handleClose = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if ((e.target as Element).id === 'wrapper') {
            onClose()
        }
    }

    return (
        <div className='z-50 fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center'
            id='wrapper' onClick={(e) => handleClose(e)}>
            <div className='w-auto flex flex-col'>
                <button className='text-white text-xl place-self-end' onClick={() => onClose()}>X</button>
                <div className='bg-slate-900 border-2 border-white p-4'>{children}</div>
            </div>
        </div>
    )
}

export default Modal