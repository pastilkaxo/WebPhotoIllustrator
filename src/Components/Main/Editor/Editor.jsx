import React, { useEffect, useRef } from 'react';
import { fabric } from 'fabric';
import { Link } from 'react-router-dom';

export default function Editor() {
  const canvasRef = useRef(null);
  const fabricRef = useRef(null);

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current);
    fabricRef.current = canvas;
    return () => canvas.dispose(); // очистка
  }, []);

  const addCircle = () => {
    const circle = new fabric.Circle({
      radius: 50,
      fill: 'red',
      left: 100,
      top: 100
    });
    fabricRef.current?.add(circle);
  };

  const addRectangle = () => {
    const rect = new fabric.Rect({
      width: 100,
      height: 60,
      fill: 'blue',
      left: 150,
      top: 150
    });
    fabricRef.current?.add(rect);
  };

  return (
    <div className="paint-wrapper">
      <section id='menu-bar'>
        <ul id='tool-menu'>
          <li className='tool-item'>
            <Link className=" nav-link text-white" to="/">
               <img className='logoIcon' src='/Images/logo.png' alt='logo' />
            </Link>
          </li>
          <li className='tool-item'>Файл</li>
          <li className='tool-item'>Редактировать</li>
          <li className='tool-item'>Изображение</li>
          <li className='tool-item'>Помощь</li>
        </ul>
      </section>
      <div className="editor-content">
        <ul id='tool-actions'>
          <li className='tool-action'>
            <img src='/Images/EditorIcons/arrange.svg' alt='arrange'/>
          </li>
          <li className='tool-action'>
            <img src='/Images/EditorIcons/selection.png' alt='selection'/>
          </li>
          <li className='tool-action'>
            <img src='/Images/EditorIcons/crop.png' alt='crop'/>
          </li>
          <li className='tool-action'>
            <img src='/Images/EditorIcons/figures.png' alt='figures'/>
          </li>
  
        </ul>
        <canvas ref={canvasRef} width={1200} height={700} className="sample-canva" />
      </div>
    </div>
  );
}
