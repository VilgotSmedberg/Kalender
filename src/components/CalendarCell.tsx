import React from 'react'

type CalendarCellProps = {
    onClick?: () => void;
}

function CalendarCell({ onClick }: CalendarCellProps) {
  return (
    <div className='bg-blue-300 w-full h-30 mb-1 mr-4 hover:cursor-pointer hover:bg-blue-400 active:bg-blue-500'
        onClick={onClick}
    >
        <p>Calendar cell</p>    
    </div>
  )
}

export default CalendarCell
