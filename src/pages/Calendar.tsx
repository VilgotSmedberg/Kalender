import React, { useState, useEffect } from 'react'
import CalendarCell from '../components/CalendarCell'
import AddActivityMenu from '../components/AddActivityMenu'
import { createReadStream } from 'fs';

function getDaysInMonth(month: number, year: number): number {
    return new Date(year, month, 0).getDate();
}

function Calendar() {

    const currentMonth = 10;
    const currentYear = 2025;
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);

    const prevMonth = currentMonth === 1 ? 12 : currentMonth - 1;
    const prevMonthYear = currentMonth === 1 ? currentYear - 1 : currentYear;
    const nextMonth = currentMonth === 12 ? 1 : currentMonth + 1 : currentYear;
    const nextMonthYear = currentMonth === 12 ? currentYear + 1 : currentYear;
    const daysInPrevMonth = getDaysInMonth(prevMonth, prevMonthYear);

    const firstDayOfWeek = new Date(currentYear, currentMonth - 1, 1).getDay();
    const totalCells = Math.ceil((daysInMonth + firstDayOfWeek) / 7) * 7;

    const cellsArray = Array.from({length: totalCells }, (_, i) => {
        if (i < firstDayOfWeek) {
            // previous month
            return (
                day: dayInPrevMonth
            )
        }
        const dayNum = i - firstDayOfWeek + 1;
        return dayNum > 0 && dayNum <= daysInMonth ? dayNum : null;
    });

    const rows = Array.from({ length: totalCells / 7}, (_, rowIdx) => 
        cellsArray.slice(rowIdx * 7, rowIdx * 7 + 7)
    )

    const [count, setCount] = useState(0)
    const [showAddActivityMenu, setShowAddActivityMenu] = useState(false)

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


    useEffect(() => {
        const storedCount = localStorage.getItem('count');
        if (storedCount !== null) {
            setCount(Number (storedCount));
        }
    })

    return (
        <div>
            <h1 className='text-3xl '>Kalender <span>November</span></h1>
            <div>
                { rows.map((row, rowIdx) => (
                    <div key={ rowIdx } className='grid grid-cols-7 gap-1'>
                        {row.map((day, cellIdx) => (
                            <CalendarCell 
                                key={cellIdx + rowIdx * 7}
                                dayNumber={day}
                                onClick={() => day && handleCellClick(day)}
                            />
                        ))}
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
