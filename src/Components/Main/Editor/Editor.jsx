import React, { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';
import { Link } from 'react-router-dom';
import EditorContent from './CanvasFunctions/EditorContent';

export default function Editor() {
  const canvasRef = useRef(null);
  const fabricRef = useRef(null);
  const [width, setWidth] = React.useState(null);
  const [height,setHeight] = React.useState(null)
  const [pointerCords,setPointerCords] = React.useState({x:0,y:0})
  const [zoom, setZoom] = useState(1);

// init
  useEffect(() => {
    if (!canvasRef.current) return;
  
    const canvas = new fabric.Canvas(canvasRef.current);
    fabricRef.current = canvas;
    setWidth(canvasRef.current.offsetWidth);
    setHeight(canvasRef.current.offsetHeight);
    return () => {
      canvas.dispose();
    };
  },[])

  // mouse events
  useEffect(() => {
    if (!fabricRef.current) return;

    const canvas = fabricRef.current;

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
      const pointer = canvas.getPointer(e.e)
      setPointerCords({ x: Math.round(pointer.x), y: Math.round(pointer.y) })
    }
    const handleClearCords = () => {
      setPointerCords({x:0,y:0})
    }
    
    canvas.on('mouse:wheel', handleMouseWheel);
    canvas.on("mouse:out",handleClearCords)
    canvas.on("mouse:move", handleMouseMove);

    return () => {
      canvas.off('mouse:wheel', handleMouseWheel);
      canvas.off('mouse:out', handleClearCords);
      canvas.off('mouse:move', handleMouseMove);
    }
  }, [zoom]);

// funcs
  const handleZoomIn = () => {
    if (zoom >= 3) return;
    const newZoom = zoom + 0.1;
    setZoom(newZoom);
    fabricRef.current?.setZoom(newZoom);
  }

  const handleZoomOut = () => {
    if (zoom <= 0.5) return;
    const newZoom = zoom - 0.1
    setZoom(newZoom);
    fabricRef.current?.setZoom(newZoom);
  }

  const handleResetZoom = () => {
    setZoom(1);
    fabricRef.current?.setZoom(1);
  }

  const addCircle = () => {
    if (!fabricRef.current) return;
    const circle = new fabric.Circle({
      radius: 50,
      fill: 'red',
      left: 100,
      top: 100
    });
    fabricRef.current.add(circle);
    fabricRef.current.renderAll();
  };

  const addRectangle = () => {
    if (!fabricRef.current) return;
    const rect = new fabric.Rect({
      width: 100,
      height: 60,
      fill: 'blue',
      left: 150,
      top: 150
    });
    fabricRef.current.add(rect);
    fabricRef.current.renderAll();
  };

  const props = {addCircle,addRectangle}

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
        <section id='action-menu'>
          <ul className='pointer-cords mb-0'>
            <li>X:<span id='x-value'>{ pointerCords.x}</span></li>
            <li>Y:<span id='y-value'>{ pointerCords.y}</span></li>
          </ul>
          <ul className='canva-sizes mb-0'>
            <li>W:<span id='w-value'>{width}</span></li>
            <li>H:<span id='h-value'>{height}</span></li>
          </ul>
        </section>
      </section>
      <EditorContent canvasRef={canvasRef}
        addRectangle={addRectangle} 
        addCircle={addCircle}/>
    </div>
  );
}
