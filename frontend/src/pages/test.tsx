import SolidButton from '@components/SolidButton'
import React from 'react'


function TestPage() {
    return (
        <div className='container min-h-screen flex justify-center items-center'>
            <SolidButton text="Press Me!" className='w-16 text-white text-[0.6rem]' rounded />
            <SolidButton text="Press Me!" className='w-16 text-white text-[0.6rem]' rounded />
        </div>
    )
}

export default TestPage