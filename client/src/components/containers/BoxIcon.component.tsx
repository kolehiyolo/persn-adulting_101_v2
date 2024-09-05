// * Dependencies
import React from 'react';
import { Account } from '../../types';

// * Styling
import './BoxIcon.component.scss';

// * Type definition
interface BoxIconProps {
  account: Account;
  icon_name: string;
}

export default function BoxIcon({account, icon_name}: BoxIconProps) {
  return (
    <div
      className={
        [
          'box-icon',
        ].join(' ')
      }
      style={{
        backgroundColor: '#' + account.color,
      }}
    >
      <img
        src={`/icons/${icon_name}.svg`}
        alt={account.name}
      />
    </div>
  )
}