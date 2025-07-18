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
  setZoom,
  handleToolClick
}) {

 const [isMobile, setIsMobile] = React.useState(false);
  const [isTablet, setIsTablet] = React.useState(false);
  const [isDesktop, setIsDesktop] = React.useState(false);
  
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 768);
      setIsTablet(width > 768 && width <= 1024);
      setIsDesktop(width > 1024);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;
    
    // Адаптивные размеры canvas - чем больше экран, тем больше canvas
    let canvasWidth, canvasHeight;
    
    if (isMobile) {
      canvasWidth = Math.min(window.innerWidth - 20, 600);
      canvasHeight = Math.min(window.innerHeight - 150, 500);
    } else if (isTablet) {
      canvasWidth = Math.min(window.innerWidth - 40, 1000);
      canvasHeight = Math.min(window.innerHeight - 180, 700);
    } else if (isDesktop) {
      canvasWidth = Math.min(window.innerWidth - 250, 1400);
      canvasHeight = Math.min(window.innerHeight - 200, 900);
    } else {
      canvasWidth = 1200;
      canvasHeight = 800;
    }
    
    const canvas = new fabric.Canvas(canvasRef.current, {
      width: canvasWidth,
      height: canvasHeight,
      backgroundColor: 'white',
      selection: true,
      preserveObjectStacking: true
    });
    fabricRef.current = canvas;
    
    setWidth(canvas.getWidth());
    setHeight(canvas.getHeight());
    canvas.renderAll();

    // Улучшенное управление zoom с touch support
    const handleMouseWheel = (e) => {
      e.e.preventDefault();
      
      const delta = e.e.deltaY;
      let zoom = canvas.getZoom();
      zoom *= 0.999 ** delta;
      
      if (zoom > 20) zoom = 20;
      if (zoom < 0.01) zoom = 0.01;
      
      const point = new fabric.Point(e.e.offsetX, e.e.offsetY);
      canvas.zoomToPoint(point, zoom);
      setZoom(zoom);
    };

    // Pan functionality
    let isDragging = false;
    let lastPosX = 0;
    let lastPosY = 0;

    const handleMouseDown = (e) => {
      if (e.e.altKey || e.e.ctrlKey) {
        isDragging = true;
        canvas.selection = false;
        lastPosX = e.e.clientX;
        lastPosY = e.e.clientY;
        canvas.setCursor('grab');
      }
    };

    const handleMouseMove = (e) => {
      if (isDragging) {
        const vpt = canvas.viewportTransform;
        vpt[4] += e.e.clientX - lastPosX;
        vpt[5] += e.e.clientY - lastPosY;
        canvas.requestRenderAll();
        lastPosX = e.e.clientX;
        lastPosY = e.e.clientY;
        canvas.setCursor('grabbing');
      } else {
        const pointer = canvas.getPointer(e.e);
        setPointerCords({ x: Math.round(pointer.x), y: Math.round(pointer.y) });
      }
    };

    const handleMouseUp = () => {
      isDragging = false;
      canvas.selection = true;
      canvas.setCursor('default');
    };

    const handleClearCords = () => {
      setPointerCords({ x: 0, y: 0 });
    };

    // Touch events for mobile
    let isTouch = false;
    let lastTouchDistance = 0;

    const handleTouchStart = (e) => {
      if (e.e.touches.length === 2) {
        isTouch = true;
        const touch1 = e.e.touches[0];
        const touch2 = e.e.touches[1];
        lastTouchDistance = Math.sqrt(
          Math.pow(touch2.clientX - touch1.clientX, 2) +
          Math.pow(touch2.clientY - touch1.clientY, 2)
        );
      }
    };

    const handleTouchMove = (e) => {
      if (isTouch && e.e.touches.length === 2) {
        e.e.preventDefault();
        const touch1 = e.e.touches[0];
        const touch2 = e.e.touches[1];
        const currentDistance = Math.sqrt(
          Math.pow(touch2.clientX - touch1.clientX, 2) +
          Math.pow(touch2.clientY - touch1.clientY, 2)
        );

        const scale = currentDistance / lastTouchDistance;
        let zoom = canvas.getZoom() * scale;

        if (zoom > 20) zoom = 20;
        if (zoom < 0.01) zoom = 0.01;

        const centerX = (touch1.clientX + touch2.clientX) / 2;
        const centerY = (touch1.clientY + touch2.clientY) / 2;
        const point = new fabric.Point(centerX, centerY);

        canvas.zoomToPoint(point, zoom);
        setZoom(zoom);
        lastTouchDistance = currentDistance;
      }
    };

    const handleTouchEnd = () => {
      isTouch = false;
    };

    // Event listeners
    canvas.on('mouse:wheel', handleMouseWheel);
    canvas.on('mouse:down', handleMouseDown);
    canvas.on('mouse:move', handleMouseMove);
    canvas.on('mouse:up', handleMouseUp);
    canvas.on('mouse:out', handleClearCords);

    // Touch events
    canvas.on('touch:gesture', handleTouchStart);
    canvas.on('touch:drag', handleTouchMove);
    canvas.on('touch:orientation', handleTouchEnd);

    return () => {
      canvas.dispose();
    };
  }, [isMobile, isTablet, isDesktop]);

  return (
   <div className="editor-content">
        <ul id='tool-actions'>
          <li className='tool-action' onClick={() => handleToolClick('move')}>
            <Tooltip title="Перемещение" arrow>
             <img src='/Images/EditorIcons/arrange.svg' alt='arrange'/>
            </Tooltip>
          </li>
          <li className='tool-action' onClick={() => handleToolClick('select')}>
            <Tooltip title="Выделение" arrow>
              <img src='/Images/EditorIcons/selection.png' alt='selection'/>
            </Tooltip>
          </li>
          <li className='tool-action' onClick={() => handleToolClick('crop')}>
            <Tooltip title="Обрезание" arrow>
            <img src='/Images/EditorIcons/crop.png' alt='crop'/>  
            </Tooltip>
          </li>
          <li className='tool-action' onClick={() => handleToolClick('figures')}>
            <Tooltip title="Фигура" arrow>
            <img src='/Images/EditorIcons/figures.png' alt='figures'/>
            </Tooltip>
          </li>
          <li className='tool-action' onClick={() => handleToolClick('eraser')}>
            <Tooltip title="Ластик" arrow>
            <img src='/Images/EditorIcons/eraser.png' alt='eraser'/>
            </Tooltip>
          </li>
          <li className='tool-action' onClick={() => handleToolClick('cut')}>
            <Tooltip title="Вырезать" arrow>
            <img src='/Images/EditorIcons/cut.png' alt='cut'/>
            </Tooltip>
          </li>
          <li className='tool-action' onClick={() => handleToolClick('copy')}>
            <Tooltip title="Заливка" arrow>
            <img src='/Images/EditorIcons/fill.png' alt='fill'/>
            </Tooltip>
          </li>
          <li className='tool-action'   onClick={() => handleToolClick('paste')}>
            <Tooltip title="Градиент" arrow>
            <img src='/Images/EditorIcons/gradient.png' alt='gradient'/>
            </Tooltip>
          </li>
          <li className='tool-action' onClick={() => handleToolClick('zoom')}>
            <Tooltip title="Лупа" arrow>
            <img src='/Images/EditorIcons/zoom.png' alt='zoom'/>
            </Tooltip>
          </li>
          <li className='tool-action' onClick={() => handleToolClick('picker')}>
            <Tooltip title="Пипетка" arrow>
            <img src='/Images/EditorIcons/picker.png' alt='picker'/>
            </Tooltip>
          </li>
          <li className='tool-action' onClick={() => handleToolClick('text')}>
            <Tooltip title="Текст" arrow>
            <img src='/Images/EditorIcons/text.png' alt='text'/>
            </Tooltip>
          </li>
          <li className='tool-action' onClick={() => handleToolClick('pencil')}>
            <Tooltip title="Карандаш" arrow>
            <img src='/Images/EditorIcons/pencil.png' alt='pencil'/>
            </Tooltip>
          </li>
          <li className='tool-action' onClick={() => handleToolClick('hand')}>
            <Tooltip title="Рука" arrow>
            <img src='/Images/EditorIcons/hand.png' alt='hand'/>
            </Tooltip>
          </li>
          <li className='tool-action' onClick={() => handleToolClick('lasso')}>
            <Tooltip title="Рука" arrow>
            <img src='/Images/EditorIcons/lasso.png' alt='lasso'/>
            </Tooltip>
          </li>
          <li className='tool-action' onClick={() => handleToolClick('brush')}>
            <Tooltip title="Главный цвет" arrow>
              <input type='color' id='main-color' />
            </Tooltip>
          </li>
          <li className='tool-action' onClick={() => handleToolClick('secondaryColor')}>
            <Tooltip title="Вторичный цвет" arrow>
              <input type='color' id='secondary-color' value="#ffffff"/>
            </Tooltip>
          </li>
        </ul>
        <div className='canvas-wrapper'>
          <div className='canvas-container'>
            <canvas ref={canvasRef} />
          </div>
        </div>
      </div>
  )
}