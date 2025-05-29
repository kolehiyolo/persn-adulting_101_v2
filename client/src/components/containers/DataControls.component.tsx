// * Dependencies
import React, {useEffect, useState} from 'react';

// * Other Components

// * Other Imports
import './DataControls.component.scss';

// * Component Props
interface DataControlsProps {
  handleClickGenerateData: () => void,
};

// * Component
export default function DataControls({ 
  handleClickGenerateData
}: DataControlsProps) {
  // * Rendering
  return (
    <div
      className='dataControls'
    >
      <button 
        className='button'
        onClick={handleClickGenerateData}
      >
        Generate
      </button>
    </div>
  );
};
