// * Dependencies
import React, { useEffect, useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

// * Styling
import './DivCircularProgress.component.scss';

export default function DivCircularProgress({ percentage }: { percentage: number }) {
  const [color, setColor] = useState('#3e98c7');
  
  useEffect(() => {
    if (percentage < 50) {
      setColor('#E8558B');
    } else if (percentage < 75) {
      setColor('#ffa455');
    } else {
      setColor('#00B298');
    }
  }, [percentage]);

  return (
    <CircularProgressbar
      className={
        [
          'div-circular-progress',
        ].join(' ')
      }
      value={percentage}
      text={`${percentage}`}
      styles={buildStyles({
        textColor: color,
        pathColor: color,
        trailColor: '#222224',
      })}
    />
  );
};