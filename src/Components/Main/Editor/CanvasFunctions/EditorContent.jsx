import React, { useEffect } from 'react';
import { fabric } from 'fabric';
import Tooltip from '@mui/material/Tooltip';

export default function EditorContent({
  canvasRef,
  fabricRef,
  addRectangle,
  addCircle,
  setWidth,
  setHeight,
  setPointerCords,
  zoom,
  setZoom
}) {
useEffect(() => {
  if (!canvasRef.current) return;
  
  const container = canvasRef.current.parentElement;
  if (!container) return;      
  const canvas = new fabric.Canvas(canvasRef.current, {
    width: 800,
    height: 600,
    backgroundColor: 'white',
    selection: true
  });
  fabricRef.current = canvas;
  console.log('Canvas initialized:', canvas);
  
  setWidth(canvas.getWidth());
  setHeight(canvas.getHeight());

  canvas.renderAll();

  const handleMouseWheel = (e) => {
    if (e.e.ctrlKey) {
      e.e.preventDefault();
      const delta = e.e.deltaY > 0 ? -0.1 : 0.1;
      const newZoom = Math.min(Math.max(zoom + delta, 0.5), 3);
      setZoom(newZoom);
      canvas.setZoom(newZoom);
    }
  };

  const handleMouseMove = (e) => {
    const pointer = canvas.getPointer(e.e);
    setPointerCords({ x: Math.round(pointer.x), y: Math.round(pointer.y) });
  };

  const handleClearCords = () => {
    setPointerCords({ x: 0, y: 0 });
  };

  canvas.on('mouse:wheel', handleMouseWheel);
  canvas.on('mouse:move', handleMouseMove);
  canvas.on('mouse:out', handleClearCords);

  return () => {
    canvas.dispose();
  };
}, []);


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
          <li className='tool-action' onClick={addRectangle}>
            <Tooltip title="Фигура" arrow>
            <img src='/Images/EditorIcons/figures.png' alt='figures'/>
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
        <canvas ref={canvasRef}
       />
        </div>
      </div>
  )
}
