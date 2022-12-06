import React from 'react'

type Props = {
    isVisible: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const FileModal = ({ isVisible, onClose, children }: Props) => {

    if (!isVisible) return null

    const handleClose = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if ((e.target as Element).id === 'wrapper') {
            onClose()
        }
    }

    return (
        <div className='z-50 fixed inset-0 overflow-y-hidden bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center'
            id='wrapper' onClick={(e) => handleClose(e)}>
            <div className='flex flex-col w-1/2'>
                <button className='text-white text-xl place-self-end' onClick={() => onClose()}>X</button>
                <div className='border-2 bg-slate-400 border-slate-600 py-12 px-16'>{children}</div>
            </div>
        </div>
    )
}

export default FileModal