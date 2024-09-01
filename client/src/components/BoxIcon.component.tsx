// * Dependencies
import React from 'react';
import { Account } from '../types';

// * Styling
import './BoxIcon.component.scss';

// * Type definition
interface BoxIconProps {
  account: Account;
}

export default function BoxIcon({account}: BoxIconProps) {
  // ! TO REPLACE
  const dummyIconUrl = 'https://site-assets.fontawesome.com/releases/v6.6.0/svgs/solid/code.svg';

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
        src={dummyIconUrl}
        alt={account.name}
      />
    </div>
  )
}