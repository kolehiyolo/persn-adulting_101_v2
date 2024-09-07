// * Dependencies
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { Icon } from '../../types';
import { ChangeEvent, FormEvent } from 'react';

// * Styling
import './ModalCustomizeIcon.component.scss';

// * Components
import BoxIcon from '../containers/BoxIcon.component';

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
Modal.setAppElement('#root'); // This helps with screen readers and accessibility.

export default function ModalCustomizeIcon(
  { 
    isOpen, 
    onRequestClose, 
    iconStyle,
    setIconStyle,
    icons
  }: ModalCustomizeIconProps
) {
  const [iconID, setIconID] = useState<string>('20240903091701582');
  const [color, setColor] = useState<string>('202020');
  const [iconName, setIconName] = useState<string>('');

  useEffect(() => {
    setIconID(iconStyle.icon_id);
    setColor(iconStyle.color);
  }, [iconStyle]);

  const findIconName = (icon_id: string) => {
    const icon = icons.find(icon => icon.id === icon_id);
    return icon ? icon.name : '';
  }

  const handleChange = (
    e: ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    switch(name) {
      case 'icon_id':
        setIconID(value);
        setIconName(findIconName(value));
        break;
      case 'color':
        setColor(value);
        break;
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // * Update iconStyle
    setIconStyle({
      icon_id: iconID,
      color: color
    });

    onRequestClose(); // Close modal after submit
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Customize Icon"
    >
      <form onSubmit={handleSubmit}>
        <BoxIcon
          color={color}
          icon_name={iconName}
        />
        {/* ! Render selection dynamically */}
        <label htmlFor="icon_id">
          <p>Icon</p>
          <select
            id="icon_id"
            name="icon_id"
            value={iconStyle.icon_id}
            onChange={handleChange}
          >
            <option value="20240903091701588">chef-hat</option>
            <option value="20240903091701608">church</option>
            <option value="20240903091701610">cigarette</option>
          </select>
        </label>
        <label htmlFor="color">
          <p>Color</p>
          <select
            id="color"
            name="color"
            value={iconStyle.color}
            onChange={handleChange}
          >
            <option value="854c1d">854c1d</option>
            <option value="2b593f">2b593f</option>
            <option value="69314c">69314c</option>
          </select>
        </label>
        <div
          className="form-buttons"
        >
          <button type="submit">Set</button>
          <button onClick={onRequestClose}>Cancel</button>
        </div>
      </form>
    </Modal>
  );
}