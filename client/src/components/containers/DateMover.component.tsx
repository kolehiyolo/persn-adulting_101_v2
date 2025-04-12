import React from 'react';

// Helper function to get the last valid day of a month
const getLastDayOfMonth = (year: number, month: number): number => {
  return new Date(year, month + 1, 0).getDate();
};

export default function DateMover({ 
  selectedDate, 
  setSelectedDate 
}: { 
  selectedDate: Date, 
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>> 
}) {

  // Get formatted month and year
  const monthYearString = selectedDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
  });

  // Get the first and last days of the selected month
  const firstDay = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
  const lastDay = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth(),
    getLastDayOfMonth(selectedDate.getFullYear(), selectedDate.getMonth())
  );

  const durationString = `${firstDay.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })} - ${lastDay.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })}`;

  // Move the date backward by one month
  const handlePrevious = () => {
    let newYear = selectedDate.getFullYear();
    let newMonth = selectedDate.getMonth() - 1;

    if (newMonth < 0) {
      newMonth = 11; // December
      newYear -= 1;
    }

    const lastValidDate = getLastDayOfMonth(newYear, newMonth);
    const newDate = new Date(
      newYear,
      newMonth,
      Math.min(selectedDate.getDate(), lastValidDate)
    );

    setSelectedDate(newDate);
  };

  // Move the date forward by one month
  const handleNext = () => {
    let newYear = selectedDate.getFullYear();
    let newMonth = selectedDate.getMonth() + 1;

    if (newMonth > 11) {
      newMonth = 0; // January
      newYear += 1;
    }

    const lastValidDate = getLastDayOfMonth(newYear, newMonth);
    const newDate = new Date(
      newYear,
      newMonth,
      Math.min(selectedDate.getDate(), lastValidDate)
    );

    setSelectedDate(newDate);
  };

  return (
    <div
      className="date-mover"
      style={
        {
          display: 'flex',
          flexDirection: 'row',
          gap: '10px',
          alignItems: 'center'
        }
      }
      >
      <button onClick={handlePrevious}>⬅ Back</button>
      <div
        style={
          {
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
          }
        }
      >
        <h2
          style={
            {
              margin: '0px'
            }
          }
        >{monthYearString}</h2>
        <p
          style={
            {
              margin: '0px'
            }
          }
        >{durationString}</p>
      </div>
      <button onClick={handleNext}>Next ➡</button>
    </div>
  );
}
