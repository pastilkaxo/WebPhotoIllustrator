import Tooltip from '@mui/material/Tooltip';
import React from 'react'
import { Link } from 'react-router-dom';

export default function MenuBar({x, y, width, height}) {
    const actionIcon = 'figures'; 
  return (
      <section id="menu-bar">
        <ul id="tool-menu">
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
        <section id="action-menu">
          <div className='selected-action-menu'>
            <img className="action-icon" src={`/Images/EditorIcons/${actionIcon}.png`} alt="action-icon" />
            <span className="action-name">
              <p className='mb-0 p-3'>Тип:</p>
              <ul className='action-list'>
                          <Tooltip title="ПРЯМОУГОЛЬНИК" arrow>
                              <li className='action-list-item figure-active'><img src='/Images/EditorIcons/Figures/rectangle.png' /></li>
                          </Tooltip>
                          <Tooltip title="ОКРУЖНОСТЬ" arrow>
                              <li className='action-list-item'><img src='/Images/EditorIcons/Figures/circle.png' /></li>
                          </Tooltip>
                            <Tooltip title="ЛИНИЯ" arrow>
                              <li className='action-list-item'><img src='/Images/EditorIcons/Figures/line.png' /></li>
                          </Tooltip>
              </ul>
              <Tooltip title="Цвет фигуры" arrow>
                          <input type='color' className='figure-color'/>
              </Tooltip>
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
        </section>
      </section>
  )
}
