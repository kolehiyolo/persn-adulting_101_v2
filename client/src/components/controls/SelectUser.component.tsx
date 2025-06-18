// * Dependencies
import React, {useEffect, useState} from 'react';

// * Other Components

// * Other Imports
import './SelectUser.component.scss';
import { User } from '../../types';

// * Component Props
interface SelectUserProps {
  constUsers: Array<User>,
  activeUser: string,
  setActiveUser: React.Dispatch<React.SetStateAction<string>>,
};

// * Component
export default function SelectUser({ 
  constUsers,
  activeUser,
  setActiveUser,
}: SelectUserProps) {
  const handleSelectChange = (value: string) => {
    console.log(`selectUser(${value})`);
    setActiveUser(value);
  };

  // * Rendering
  return (
    <select
      className='select'
      value={activeUser}
      onChange={(e) => {
        handleSelectChange(e.target.value)
      }}
    >
      {constUsers.map((User) => (
        <option key={User.id} value={User.folder_name}>
          {User.name} ({User.household_name})
        </option>
      ))}
    </select>
  );
};