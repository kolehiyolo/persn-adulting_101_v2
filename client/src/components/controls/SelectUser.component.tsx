// * Dependencies
import React, {useEffect, useState} from 'react';

// * Other Components

// * Other Imports
import './SelectUser.component.scss';
import { User } from '../../types';

// * Component Props
interface SelectUserProps {
  constUsers: Array<User>,
  activeUser: User,
  setActiveUser: React.Dispatch<React.SetStateAction<User | undefined>>,
};

// * Component
export default function SelectUser({ 
  constUsers,
  activeUser,
  setActiveUser,
}: SelectUserProps) {
  const handleSelectChange = (value: string) => {
    console.log(`selectUser(${value})`);
    const result = constUsers.find(user => user.folder_name === value);
    setActiveUser(result);
  };

  // * Rendering
  return (
    <select
      className='select'
      value={activeUser.folder_name}
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