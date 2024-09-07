// * Dependencies
import React from 'react';

// * Styling
import './BoxIcon.component.scss';

// * Type definition
interface BoxIconProps {
  color: string,
  icon_name: string;
}

export default function BoxIcon({color, icon_name}: BoxIconProps) {
  return (
    <div
      className={
        [
          'box-icon',
        ].join(' ')
      }
      style={{
        backgroundColor: '#' + color,
      }}
    >
      <img
        src={`/icons/${icon_name}.svg`}
        alt={`icon-${icon_name}`}
      />
    </div>
  )
}