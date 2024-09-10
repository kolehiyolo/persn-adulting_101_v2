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
    '696969', '808080', 'a9a9a9', 'c0c0c0', 'b22222', 'ff6f61', 'e74c3c', 'ff6347', 'ff5733', 'ff7f50', 'ff4500', 'ffa07a', 'd35400', '854c1d', 'e67e22', 'ff8c00', 'f39c12', 'ffa500', 'ffdd57', 'ffcc00', 'f1c40f', 'ffd700', 'ffdf00', '8fbc8f', '228b22', '32cd32', '006400', '008000', '27ae60', '2ecc71', '2b593f', '3cb371', '00ff7f', '00fa9a', '66cdaa', '1abc9c', '16a085', '40e0d0', '20b2aa', '5f9ea0', '95a5a6', '7f8c8d', '87ceeb', '2980b9', 'bdc3c7', '3498db', '4682b4', '1e90ff', '708090', '778899', 'b8c2cc', '97aabd', '34495e', '2c3e50', '8e9aaf', '4267b2', '3b5998', 'abb3c5', '6890f0', '4169e1', '7592ec', '6272a4', '8892bf', '5660e0', 'bbbac1', '917bed', '9370db', '8d5ec8', '9d4edd', 'c58ded', 'ba67e0', '9400d3', '9b59b6', '72147e', '6a0572', 'dda0dd', 'ee82ee', '800080', 'da70d6', '7f1677', '69314c', '900c3f', 'c70039', 'ff96ad', 'dc143c', 'ff8b94'
  ];

  return (
    <div className="div-options-color">
      <div className="div-options-color-head">
        <p>Color</p>
      </div>
      <div className="div-options-color-body">
        {
          colors.map(c => (
            <label key={c} style={{ backgroundColor: `#${c}` }}>
              <input
                type="radio"
                name="color"
                value={c}
                checked={color === c}
                onChange={handleChange}
              />
            </label>
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
      className='modal-customize-icon'
    >
      <form className='modal-form-customize-icon'>
        <div className='modal-form-customize-icon-head'>
          <BoxIcon color={color} icon_name={iconName} />
          <div className="form-buttons">
            <button type="button" onClick={handleSubmitButton}>Set</button>
            <button onClick={onRequestClose}>Cancel</button>
          </div>
        </div>
        <div className='modal-form-customize-icon-body'>
          <DivOptionsIcon
            iconID={iconID}
            icons={icons}
            findIconName={findIconName}
            handleChange={handleChange}
          />
          <DivOptionsColor
            color={color}
            handleChange={handleChange}
          />

        </div>
      </form>
    </Modal>
  );
}