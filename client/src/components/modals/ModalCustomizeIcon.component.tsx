// * Dependencies
import React, { useState, useEffect, useCallback, ChangeEvent } from 'react';
import Modal from 'react-modal';

// * Styling
import './ModalCustomizeIcon.component.scss';

// * Components
import BoxIcon from '../containers/BoxIcon.component';

// * Types
import { Icon } from '../../types';

// * Interfaces
interface IconStyle {
  icon_id: string;
  color: string;
}

interface ModalCustomizeIconProps {
  isOpen: boolean;
  onRequestClose: () => void;
  iconStyle: IconStyle;
  setIconStyle: (iconStyle: IconStyle) => void;
  icons: Icon[];
}

interface DivOptionsIconProps {
  iconID: string;
  icons: Icon[];
  findIconName: (icon_id: string) => string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

interface DivOptionsColorProps {
  color: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

// * Others
// Accessibility setup for screen readers
Modal.setAppElement('#root');

function DivOptionsIcon({
  iconID,
  icons,
  findIconName,
  handleChange
}: DivOptionsIconProps) {
  return (
    <div className="div-options-icon">
      <div className="div-options-icon-head">
        <p>Icon</p>
      </div>
      <div className="div-options-icon-body">
        {
          icons.map(icon => (
            <label key={icon.id}>
              <input
                type="radio"
                name="icon_id"
                value={icon.id}
                checked={iconID === icon.id}
                onChange={handleChange}
              />
              <BoxIcon
                color="1f1f23"
                icon_name={icon.name}
              />
            </label>
          ))
        }
      </div>
    </div>
  )
}

function DivOptionsColor({
  color,
  handleChange
}: DivOptionsColorProps) {
  const colors = [
    // Reds, Pinks, and Oranges
    '10.6,100.0%,60.0%', '342.8,100.0%,39.0%', '336.8,84.6%,30.6%', '5.6,78.1%,57.1%', 
    '23.9,100.0%,41.4%', '36.8,90.4%,51.2%', '28.2,79.7%,51.8%', '5.3,100.0%,69.0%', 
    '355.3,100.0%,77.3%', '346.9,100.0%,79.4%', '16.2,100.0%,50.0%', '348.0,83.3%,47.1%', 
    '0.0,67.9%,41.6%', '9.1,100.0%,63.9%', '16.1,100.0%,65.7%', '32.9,100.0%,50.0%', 
    '17.1,100.0%,73.9%',
  
    // Purples and Magentas
    '27.1,64.2%,31.8%', '331.1,36.4%,30.2%', '295.6,91.6%,23.3%', '293.2,72.6%,28.6%', 
    '304.6,70.5%,29.2%', '266.6,49.1%,57.6%', '282.6,38.9%,53.1%', '273.1,67.8%,58.6%', 
    '281.2,66.1%,64.1%', '275.0,72.7%,74.1%', '251.6,76.0%,70.6%', '300.0,100.0%,25.1%', 
    '259.6,59.8%,64.9%', '300.0,47.3%,74.7%', '300.0,76.1%,72.2%', '302.3,58.9%,64.7%', 
    '282.1,100.0%,41.4%',
  
    // Blues and Blue-Greys
    '210.0,28.8%,28.6%', '203.8,63.7%,44.3%', '204.1,69.9%,53.1%', '210.0,29.0%,24.3%', 
    '225.4,75.8%,69.2%', '222.4,81.9%,67.5%', '235.7,69.0%,60.8%', '225.0,72.7%,56.9%', 
    '220.6,44.1%,41.4%', '220.2,45.9%,47.8%', '225.5,26.6%,51.4%', '229.1,30.1%,64.1%', 
    '209.6,100.0%,55.9%', '207.3,44.0%,49.0%', '181.8,25.5%,50.0%', '197.4,71.4%,72.5%',
  
    // Greens and Teals
    '145.3,63.4%,41.8%', '145.4,63.2%,49.0%', '168.1,75.7%,42.0%', '168.3,75.8%,35.7%', 
    '146.1,34.8%,25.9%', '120.0,100.0%,25.1%', '120.0,60.7%,33.9%', '149.9,100.0%,50.0%', 
    '176.7,69.5%,41.2%', '159.6,50.7%,60.2%', '146.7,49.8%,46.9%', '120.0,100.0%,19.6%', 
    '120.0,25.1%,64.9%', '120.0,60.8%,50.0%', '157.0,100.0%,49.0%', '174.0,72.1%,56.5%',
  
    // Yellows and Golds
    '48.1,89.0%,50.2%', '50.6,100.0%,50.0%', '38.8,100.0%,50.0%', '47.9,100.0%,67.1%', 
    '48.0,100.0%,50.0%', '50.6,100.0%,50.0%', '52.5,100.0%,50.0%',
  
    // Greys and Neutrals
    '183.5,8.7%,61.8%', '184.3,5.8%,52.5%', '204.0,8.2%,76.1%', '221.5,18.3%,72.2%', 
    '218.2,17.1%,62.2%', '210.0,22.4%,66.7%', '248.6,5.3%,74.3%', '210.0,16.4%,76.1%', 
    '0.0,0.0%,50.2%', '0.0,0.0%,66.3%', '0.0,0.0%,75.3%', '0.0,0.0%,41.2%', 
    '210.0,14.3%,53.3%', '210.0,12.6%,50.2%'
  ];

  function convertHSLToHex(color: string) {
    // sample c value is '10.6,100.0%,60.0%'
    let h = parseFloat(color.split(',')[0]);
    let s = parseFloat(color.split(',')[1]);
    let l = parseFloat(color.split(',')[2]);

    // Must be fractions of 1
    s /= 100;
    l /= 100;

    // Calculate chroma
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs((h / 60) % 2 - 1));
    const m = l - c / 2;
    let r = 0;
    let g = 0;
    let b = 0;

    if (h >= 0 && h < 60) {
      r = c;
      g = x;
      b = 0;
    } else if (h >= 60 && h < 120) {
      r = x;
      g = c;
      b = 0;
    } else if (h >= 120 && h < 180) {
      r = 0;
      g = c;
      b = x;
    } else if (h >= 180 && h < 240) {
      r = 0;
      g = x;
      b = c;
    } else if (h >= 240 && h < 300) {
      r = x;
      g = 0;
      b = c;
    } else if (h >= 300 && h < 360) {
      r = c;
      g = 0;
      b = x;
    }

    // Having obtained RGB, convert channels to hex
    const rHex = Math.round((r + m) * 255).toString(16);
    const gHex = Math.round((g + m) * 255).toString(16);
    const bHex = Math.round((b + m) * 255).toString(16);

    // Prepend 0s, if necessary
    return `${rHex.padStart(2, '0')}${gHex.padStart(2, '0')}${bHex.padStart(2, '0')}`;
  }

  return (
    <div className="div-options-color">
      <div className="div-options-color-head">
        <p>Color</p>
      </div>
      <div className="div-options-color-body">
        {
          colors.map(c => (
            // <label key={c} style={{ backgroundColor: `#${c}` }}>
            //   <input
            //     type="radio"
            //     name="color"
            //     value={c}
            //     checked={color === c}
            //     onChange={handleChange}
            //   />
            // </label>
            <BoxIcon color={convertHSLToHex(c)} icon_name="chef-hat" />
          ))
        }
      </div>
    </div>
  )
}

// * Default Component
export default function ModalCustomizeIcon({
  isOpen,
  onRequestClose,
  iconStyle,
  setIconStyle,
  icons
}: ModalCustomizeIconProps) {
  // * States
  const [iconID, setIconID] = useState(iconStyle.icon_id);
  const [color, setColor] = useState(iconStyle.color);
  const [iconName, setIconName] = useState('');

  // * Functions
  const findIconName = useCallback((icon_id: string) => {
    const icon = icons.find(icon => icon.id === icon_id);
    return icon ? icon.name : '';
  }, [icons]);

  // * Update local states when isOpen is true
  // This only runs when the modal is opened
  useEffect(() => {
    setIconID(iconStyle.icon_id);
    setColor(iconStyle.color);
    setIconName(findIconName(iconStyle.icon_id));
  }, [isOpen, iconStyle, findIconName]);

  // * When changes to the form fields are made
  // Run every time a change is made to the form fields
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target; 
    switch (name) {
      case 'icon_id':
        setIconID(value);
        setIconName(findIconName(value));
        break;
      case 'color':
        setColor(value);
        break;
      default:
        break;
    }
  };

  // * When form is submitted
  // Update the parent iconStyle with local states, and close this
  const handleSubmitButton = () => {
    setIconStyle({ icon_id: iconID, color: color });
    onRequestClose();
  };

  // * Modal and form rendering
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Customize Icon"
    >
      <form className='modal-form-customize-icon'>
        <div className='modal-form-customize-icon-head'>
          <BoxIcon color={color} icon_name={iconName} />
        </div>
        <div className='modal-form-customize-icon-body'>
          <DivOptionsColor
            color={color}
            handleChange={handleChange}
          />
          <DivOptionsIcon
            iconID={iconID}
            icons={icons}
            findIconName={findIconName}
            handleChange={handleChange}
          />
        </div>
        <div className='modal-form-customize-icon-foot'>
          <div className="form-buttons">
            <button type="button" onClick={handleSubmitButton}>Set</button>
            <button onClick={onRequestClose}>Cancel</button>
          </div>
        </div>
      </form>
    </Modal>
  );
}
