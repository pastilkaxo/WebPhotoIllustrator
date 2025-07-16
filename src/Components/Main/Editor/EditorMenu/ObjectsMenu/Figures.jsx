import React from 'react'
import Tooltip from '@mui/material/Tooltip';

export default function Figures() {
    return (
          <>
            <p className='mb-0 p-3'>Тип:</p>
            <ul className='action-list'>
              <Tooltip title="ПРЯМОУГОЛЬНИК" arrow>
                <li className='action-list-item figure-active'>
                  <img src='/Images/EditorIcons/Figures/rectangle.png' alt="rectangle" />
                </li>
              </Tooltip>
              <Tooltip title="ОКРУЖНОСТЬ" arrow>
                <li className='action-list-item'>
                  <img src='/Images/EditorIcons/Figures/circle.png' alt="circle" />
                </li>
              </Tooltip>
              <Tooltip title="ЛИНИЯ" arrow>
                <li className='action-list-item'>
                  <img src='/Images/EditorIcons/Figures/line.png' alt="line" />
                </li>
              </Tooltip>
            </ul>
            <p className='mb-0 p-2'>Заполнить:</p>
            <Tooltip title="Цвет фигуры" arrow>
            <input type='color' className='fill-color' />
            </Tooltip>
          </>
  )
}
