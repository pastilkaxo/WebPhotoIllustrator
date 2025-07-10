import React, { useEffect, useRef } from 'react';
import { fabric } from 'fabric';

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
    <div className="paint">
      <h1>FabricJS Manual Integration</h1>
      <button onClick={addCircle}>Add Circle</button>
      <button onClick={addRectangle}>Add Rectangle</button>
      <canvas ref={canvasRef} width={800} height={600} className="sample-canva" />
    </div>
  );
}
