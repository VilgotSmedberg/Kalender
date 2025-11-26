import React from 'react'

type CalendarCellProps = {
    dayNumber: number | null;
    onClick?: () => void;
}

function CalendarCell({ dayNumber, onClick }: CalendarCellProps) {
  return (
    <div 
        className={`bg-blue-300 w-full h-30 mb-1 mr-4 hover:cursor-pointer hover:bg-blue-400 active:bg-blue-500 ${!dayNumber ? 'opacity-0 pointer-events-none' : ''}`}
        onClick={onClick}
    >
        {dayNumber && <span> { dayNumber }</span>}
    </div>
  )
}

export default CalendarCell
