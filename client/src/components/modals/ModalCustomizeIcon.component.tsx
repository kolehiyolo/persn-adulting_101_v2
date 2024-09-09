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
        <label>
          <input
            type="radio"
            name="icon_id"
            value="20240903091701588"
            checked={iconID === '20240903091701588'}
            onChange={handleChange}
          />
          <BoxIcon
            color="1f1f23"
            icon_name={findIconName('20240903091701588')}
          />
        </label>
        <label>
          <input
            type="radio"
            name="icon_id"
            value="20240903091701608"
            checked={iconID === '20240903091701608'}
            onChange={handleChange}
          />
          <BoxIcon
            color="1f1f23"
            icon_name={findIconName('20240903091701608')}
          />
        </label>
        <label>
          <input
            type="radio"
            name="icon_id"
            value="20240903091701610"
            checked={iconID === '20240903091701610'}
            onChange={handleChange}
          />
          <BoxIcon
            color="1f1f23"
            icon_name={findIconName('20240903091701610')}
          />
        </label>
      </div>
    </div>
  )
}

function DivOptionsColor({
  color,
  handleChange
}: DivOptionsColorProps) {
  return (
    <div className="div-options-color">
      <div className="div-options-color-head">
        <p>Color</p>
      </div>
      <div className="div-options-color-body">
        <label
          style={{ backgroundColor: '#854c1d' }}
        >
          <input
            type="radio"
            name="color"
            value="854c1d"
            checked={color === '854c1d'}
            onChange={handleChange}
          />
        </label>
        <label
          style={{ backgroundColor: '#2b593f' }}
        >
          <input
            type="radio"
            name="color"
            value="2b593f"
            checked={color === '2b593f'}
            onChange={handleChange}
          />
        </label>
        <label
          style={{ backgroundColor: '#69314c' }}
        >
          <input
            type="radio"
            name="color"
            value="69314c"
            checked={color === '69314c'}
            onChange={handleChange}
          />
        </label>
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
