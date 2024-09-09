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

// * Others
// Accessibility setup for screen readers
Modal.setAppElement('#root');

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
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
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
      <form>
        <BoxIcon color={color} icon_name={iconName} />
        <label htmlFor="icon_id">
          <p>Icon</p>
          <select id="icon_id" name="icon_id" value={iconID} onChange={handleChange}>
            {/* Dynamically render icon options */}
            <option value="20240903091701588">chef-hat</option>
            <option value="20240903091701608">church</option>
            <option value="20240903091701610">cigarette</option>
          </select>
        </label>
        <label htmlFor="color">
          <p>Color</p>
          <select id="color" name="color" value={color} onChange={handleChange}>
            {/* Dynamically render color options */}
            <option value="854c1d">854c1d</option>
            <option value="2b593f">2b593f</option>
            <option value="69314c">69314c</option>
          </select>
        </label>
        <div className="form-buttons">
          <button type="button" onClick={handleSubmitButton}>Set</button>
          <button onClick={onRequestClose}>Cancel</button>
        </div>
      </form>
    </Modal>
  );
}
