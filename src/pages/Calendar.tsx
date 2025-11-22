import React, { useState, useEffect } from 'react'
import CalendarCell from '../components/CalendarCell'
import AddActivityMenu from '../components/AddActivityMenu'

function Calendar() {

    const [count, setCount] = useState(0)
    const [showAddActivityMenu, setShowAddActivityMenu] = useState(false)

    const rows = Array.from({ length: 4 }, () => Array.from({ length: 7  }));

    const handleAddActivityClick = () => {
        console.log("Add activity clicked")
        setShowAddActivityMenu(true);
    }

    const handleCellClick = (cellIndex: number) => {
        console.log(`Clicked cell number ${cellIndex}`)
    }

    const handleButtonClick = () => {
        setCount(prevCount => {
            const newCount = prevCount +1;
            localStorage.setItem('count', newCount.toString())
            return newCount;
        })
    }

    const handleResetCounter = () => {
        localStorage.setItem('count', '0'.toString())
        setCount(0)
    }

    const handleAddActivity = () => {

    }

    useEffect(() => {
        const storedCount = localStorage.getItem('count');
        if (storedCount !== null) {
            setCount(Number (storedCount));
        }
    })

    return (
        <div>
            <h1 className='text-3xl '>Kalender</h1>
            <div>
                { rows.map((row, rowIdx) => (
                    <div key={ rowIdx } className='grid grid-cols-7 gap-1'>
                        {row.map((_, cellIdx) => {
                            const cellIndex = cellIdx + rowIdx * 7;
                            return (
                                <CalendarCell 
                                    key={cellIdx + rowIdx * 7}
                                    onClick={() => handleCellClick(cellIndex)}
                                />
                            );
                        })}

                    </div>
                ))}
            </div>
            <button 
                className='bg-green-500 w-11 aspect-square flex items-center justify-center text-3xl text-white hover:cursor-pointer hover:bg-green-600 rounded-lg mb-4'
                onClick={handleAddActivityClick}
            >
                +
            </button>
            { showAddActivityMenu && (
                <AddActivityMenu />
            )}
            
            <button
                className='bg-blue-400 px-3 py-1 rounded-lg mr-2 hover:cursor-pointer hover:bg-blue-500 active:opacity-90' 
                onClick={() => handleButtonClick()}
            >
                Increase count: { count }
            </button>
            <button 
                className='bg-red-400 rounded-md px-2 py-1 hover:bg-red-500 hover:cursor-pointer active:opacity-90'
                onClick={ handleResetCounter}
            >
                Reset 
            </button>
        </div>
    )
}

export default Calendar
