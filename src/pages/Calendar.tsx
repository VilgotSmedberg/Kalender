import React, { useState } from 'react'
import CalendarCell from '../components/CalendarCell'
import AddActivityMenu from '../components/AddActivityMenu'

function getDaysInMonth(month: number, year: number): number {
    return new Date(year, month, 0).getDate();
}

function Calendar() {

    const [currentMonth, setCurrentMonth] = useState(11)
    const [currentYear, setCurrentYear] = useState(2025)

    const daysInMonth = getDaysInMonth(currentMonth, currentYear);

    const prevMonth = currentMonth === 1 ? 12 : currentMonth - 1;
    const prevMonthYear = currentMonth === 1 ? currentYear - 1 : currentYear;
    const daysInPrevMonth = getDaysInMonth(prevMonth, prevMonthYear);

    const firstDayOfWeek = (new Date(currentYear, currentMonth - 1, 1).getDay() + 6) % 7;
    const totalCells = Math.ceil((daysInMonth + firstDayOfWeek) / 7) * 7;

    const cellsArray = Array.from({length: totalCells }, (_, i) => {
        if (i < firstDayOfWeek) {
            // previous month
            const dayInPrevMonth = daysInPrevMonth - firstDayOfWeek + i + 1;
            return dayInPrevMonth;
        }
        const dayNum = i - firstDayOfWeek + 1;
        return dayNum <= daysInMonth ? dayNum : null;
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

    const handleNextMonth = () => {
        if (currentMonth === 12) {
            setCurrentMonth(1);
            setCurrentYear(prev => prev + 1); 
        } else {
            setCurrentMonth(prev => prev + 1)
        }
    };

    const handlePrevMonth = () => {
        if (currentMonth === 1) {
            setCurrentMonth(12);
            setCurrentYear(prev => prev - 1);
        } else {
            setCurrentMonth(prev => prev - 1)
        }
    }

    const weekDays = ['Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lördag', 'Söndag']
    const months = ['Januari', 'Februari', 'Mars', 'April', 'Maj', 'Juni', 'Juli', 'Augusti', 'September', 'Oktober', 'November', 'December']

    return (
        <div>
            <h1 className='text-3xl '>Kalender <span>{months[currentMonth-1]}</span> <span>{currentYear}</span></h1>
            <div className='flex'>
                <button 
                    className='border-blue-950 border-2 rounded-tl-md rounded-bl-md w-10 aspect-square flex items-center justify-center bg-[#f6efef] hover:cursor-pointer hover:bg-white'
                    onClick={handlePrevMonth}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="16" height="16"><path d="M257.5 445.1l-22.5 22.5c-9.4 9.4-24.6 9.4-33.9 0L7 273c-9.4-9.4-9.4-24.6 0-33.9L201.1 45.4c9.4-9.4 24.6-9.4 33.9 0l22.5 22.5c9.5 9.5 9.3 24.8-.4 34.3L134.1 256l123 123.4c9.7 9.5 9.9 24.8.4 34.3z"/></svg>
                </button> 
                <button 
                    className='border-blue-950 border-2 rounded-tr-md rounded-br-md w-10 aspect-square flex items-center justify-center bg-[#f6efef] hover:cursor-pointer hover:bg-white'
                    onClick={handleNextMonth}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="16" height="16"><path d="M190.5 66.9l22.5-22.5c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.9 466.6c-9.4 9.4-24.6 9.4-33.9 0l-22.5-22.5c-9.5-9.5-9.3-24.8.4-34.3L313.9 256 190.9 132.6c-9.7-9.5-9.9-24.8-.4-34.3z"/></svg>
                </button> 
            </div>
            <div>
                <div className='grid grid-cols-7 gap-1'>
                    { weekDays.map((day, index) => (
                         <p key={index} className='flex justify-center text-3xl mt-6 mb-4 font-bold' > {day}</p>
                    )) }
                </div>
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
