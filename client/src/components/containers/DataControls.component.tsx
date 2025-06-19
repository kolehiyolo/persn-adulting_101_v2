// * Dependencies
import React, {useEffect, useState} from 'react';

// * Other Components
import SelectUser from '../controls/SelectUser.component';
import FormSearchTotal from '../controls/FormSearchTotal.component';

// * Other Imports
import './DataControls.component.scss';
import { User } from '../../types';
import { CalDate } from '../../types';

// * Component Props
interface DataControlsProps {
  constUsers: Array<User>,
  activeUser: string,
  setActiveUser: React.Dispatch<React.SetStateAction<string>>,
  calendarDatesData: Array<CalDate>,
  setActiveDate: React.Dispatch<React.SetStateAction<Date>>,
};

// * Component
export default function DataControls({ 
  constUsers,
  activeUser,
  setActiveUser,
  calendarDatesData,
  setActiveDate,
}: DataControlsProps) {
  // * Rendering
  return (
    <div
      className='dataControls'
    >
      <SelectUser
        constUsers={constUsers}
        activeUser={activeUser}
        setActiveUser={setActiveUser}
      />
      <FormSearchTotal
        calendarDatesData={calendarDatesData}
        setActiveDate={setActiveDate}
      />
    </div>
  );
};
