import Tooltip from '@mui/material/Tooltip';
import React from 'react'
import { Link } from 'react-router-dom';
import Figures from './ObjectsMenu/Figures';
import Text from './ObjectsMenu/Text';
import Zoom from './ObjectsMenu/Zoom';
import Fill from './ObjectsMenu/Fill';

export default function MenuBar({x, y, width, height, selectedTool, isActionMenuOpen, closeActionMenu}) {
    
  const getToolContent = () => {
    switch(selectedTool) {
      case 'figures':
        return (
          <Figures />
        );
      case 'text':
        return (
          <Text />
        );
      case 'copy':
      case 'fill':
        return (
          <Fill />
        );
      case 'zoom':
        return (
          <Zoom />
        );
      default:
        return (
          <p className='mb-0 p-3'>Инструмент: {selectedTool || 'Не выбран'}</p>
        );
    }
  };

  return (
      <section id="menu-bar">
        <ul id="tool-menu" className='mb-0'>
          <li className="tool-item">
            <Link className="nav-link text-white" to="/">
              <img className="logoIcon" src="/Images/logo.png" alt="logo" />
            </Link>
          </li>
          <li className="tool-item">Файл</li>
          <li className="tool-item">Редактировать</li>
          <li className="tool-item">Изображение</li>
          <li className="tool-item">Помощь</li>
        </ul>
        
        <section 
          id="action-menu" 
          className={`active-action-menu ${isActionMenuOpen ? 'show' : ''}`}
        >
          <div className='selected-action-menu'>
            <img 
              className="action-icon" 
              src={`/Images/EditorIcons/${selectedTool || 'select'}.png`} 
              alt="action-icon" 
            />
            <span className="action-name">
              {getToolContent()}
            </span>
          </div>
          <div className="action-variables">
            <ul className="pointer-cords mb-0">
              <li>X:<span id="x-value">{x}</span></li>
              <li>Y:<span id="y-value">{y}</span></li>
            </ul>
            <ul className="canva-sizes mb-0">
              <li>W:<span id="w-value">{width}</span></li>
              <li>H:<span id="h-value">{height}</span></li>
            </ul>
          </div>
          <button className="close-menu-btn" onClick={closeActionMenu}>×</button>
        </section>
      </section>
  )
}