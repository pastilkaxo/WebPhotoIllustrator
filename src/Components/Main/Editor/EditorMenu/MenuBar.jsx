import Tooltip from '@mui/material/Tooltip';
import React from 'react'
import { Link } from 'react-router-dom';
import Figures from './ObjectsMenu/Figures';
import Text from './ObjectsMenu/Text';
import Zoom from './ObjectsMenu/Zoom';
import Fill from './ObjectsMenu/Fill';
import EditorNavBar from './EditorNavBar/EditorNavBar';
import { useEffect } from 'react';

export default function MenuBar({x, y, width, height, selectedTool, isActionMenuOpen, closeActionMenu}) {
   
  useEffect(() => {
  if (isActionMenuOpen) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'auto';
  }
  return () => {
    document.body.style.overflow = 'auto';
  };
    }, [isActionMenuOpen]);
  
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
        <li className='tool-item'>
                      <Link className="nav-link text-white" to="/">
              <img className="logoIcon" src="/Images/logo.png" alt="logo" />
            </Link>
          </li>
          <li className="tool-item tool-toggler">Файл</li>
          <li className="tool-item tool-toggler">Редактировать</li>
          <li className="tool-item tool-toggler">Изображение</li>
        <li className="tool-item tool-toggler">Помощь</li>
        <li className='tool-item tool-toggler'>
          <Tooltip title="Сохранить" arrow>
            <button className='downloadButton'><img src='/Images/EditorIcons/download.png' /></button>
          </Tooltip>
        </li>
        <li className='tool-item'>
          <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#editorNavBar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"><img className='editor-toggler' src='/Images/EditorIcons/toggler.png'/></span>
          </button>
          <EditorNavBar/>
        </li>
        </ul>
        
        <section 
          id="action-menu" 
          className={`active-action-menu ${isActionMenuOpen ? 'show' : ''}`}
        >
          <div className='selected-action-menu'>
            <img 
              className="action-icon" 
              src={`/Images/EditorIcons/${selectedTool}.png`} 
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
          </div>
          <button className="close-menu-btn" onClick={closeActionMenu}><p className='mb-0'>✖</p></button>
        </section>
      </section>
  )
}