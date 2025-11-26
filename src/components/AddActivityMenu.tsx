import React from 'react'

function AddActivityMenu() {

    const handleAddActivityClick = () => {
        console.log("Add activity button clicked")
    }

    return (
        <>
        <div className='fixed inset-0 flex items-center justify-center backdrop-blur bg-opacity-40 z-50'>
            <div className='bg-amber-300 p-8 rounded shadow-lg'>
                <div>
                    <p>Lägg till aktivitet</p>
                    <p>Datum</p>
                    <input 
                        type="text" 
                        placeholder='YYYY-MM-DD'
                    />
                    <p>Tid</p>
                    <input 
                        type="text" 
                        placeholder='HH:MM'
                    />
                    <p>Titel</p>
                    <input 
                        type="text" 
                        placeholder='Titel'
                    />
                </div>
                <button 
                    className='bg-green-500 rounded-md px-4 py-2 text-white font-semibold hover:bg-green-600 hover:cursor-pointer active:opacity-80'
                    onClick={ handleAddActivityClick }
                >
                    Lägg till
                </button>
            </div>
        </div>
        
        </>
    )
}

export default AddActivityMenu
