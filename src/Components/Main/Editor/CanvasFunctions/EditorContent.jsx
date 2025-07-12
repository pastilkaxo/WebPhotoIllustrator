import React from 'react'
import Tooltip from '@mui/material/Tooltip'
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';

export default function EditorContent({ canvasRef,addRectangle }) {

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });


  React.useEffect(() => {
    if (canvasRef.current) {
      const container = canvasRef.current.parentElement;
      canvasRef.current.width = container.clientWidth - 300;
      canvasRef.current.height = container.clientHeight - 100;
    }
  }, [canvasRef]);
  return (
      <div className="editor-content">
        <ul id='tool-actions'>
          <li className='tool-action'>
            <Tooltip title="Перемещение" arrow>
             <img src='/Images/EditorIcons/arrange.svg' alt='arrange'/>
            </Tooltip>
          </li>
          <li className='tool-action'>
            <Tooltip title="Выделение" arrow>
              <img src='/Images/EditorIcons/selection.png' alt='selection'/>
            </Tooltip>
          </li>
          <li className='tool-action'>
            <Tooltip title="Обрезание" arrow>
            <img src='/Images/EditorIcons/crop.png' alt='crop'/>  
            </Tooltip>
          </li>
          <li className='tool-action'>
            <Tooltip title="Фигура" arrow>
            <img src='/Images/EditorIcons/figures.png' alt='figures' onClick={addRectangle}/>
            </Tooltip>
          </li>
          <li className='tool-action'>
            <Tooltip title="Ластик" arrow>
            <img src='/Images/EditorIcons/eraser.png' alt='eraser'/>
            </Tooltip>
          </li>
          <li className='tool-action'>
            <Tooltip title="Вырезать" arrow>
            <img src='/Images/EditorIcons/cut.png' alt='cut'/>
            </Tooltip>
          </li>
          <li className='tool-action'>
            <Tooltip title="Заливка" arrow>
            <img src='/Images/EditorIcons/fill.png' alt='fill'/>
            </Tooltip>
          </li>
          <li className='tool-action'>
            <Tooltip title="Градиент" arrow>
            <img src='/Images/EditorIcons/gradient.png' alt='gradient'/>
            </Tooltip>
          </li>
          <li className='tool-action'>
            <Tooltip title="Лупа" arrow>
            <img src='/Images/EditorIcons/zoom.png' alt='zoom'/>
            </Tooltip>
          </li>
          <li className='tool-action'>
            <Tooltip title="Пипетка" arrow>
            <img src='/Images/EditorIcons/picker.png' alt='picker'/>
            </Tooltip>
          </li>
          <li className='tool-action'>
            <Tooltip title="Текст" arrow>
            <img src='/Images/EditorIcons/text.png' alt='text'/>
            </Tooltip>
          </li>
          <li className='tool-action'>
            <Tooltip title="Карандаш" arrow>
            <img src='/Images/EditorIcons/pencil.png' alt='pencil'/>
            </Tooltip>
        </li>
        <Tooltip title="Главный цвет" arrow>
        <input type='color' id='main-color' />
        </Tooltip>
        <Tooltip title="Вторичный цвет" arrow>
        <input type='color' id='secondary-color' value="#ffffff"/>
        </Tooltip>
      </ul>
      <div className='canvas-wrapper'>
        <canvas ref={canvasRef} className="sample-canva"/>
        </div>
      </div>
  )
}
