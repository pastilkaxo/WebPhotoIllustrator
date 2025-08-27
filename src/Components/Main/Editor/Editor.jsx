import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import EditorContent from './CanvasFunctions/EditorContent';
import { fabric } from 'fabric';
import Tooltip from '@mui/material/Tooltip';
import MenuBar from './EditorMenu/MenuBar';

export default function Editor() {
  const canvasRef = useRef(null);
  const fabricRef = useRef(null);
  const [pointerCords, setPointerCords] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const [selectedTool, setSelectedTool] = useState(null);
  const [isActionMenuOpen, setIsActionMenuOpen] = useState(false);
  
  // Обработчик клика по инструменту
  const handleToolClick = (toolName) => {
    setSelectedTool(toolName);
    setIsActionMenuOpen(true);
  };

  const closeActionMenu = () => {
    setIsActionMenuOpen(false);
    setSelectedTool(null);
  };

  // Zoom handlers
  const handleZoomIn = () => {
    if (!fabricRef.current || zoom >= 3) return;
    const newZoom = zoom + 0.1;
    setZoom(newZoom);
    fabricRef.current.setZoom(newZoom);
  };

  const handleZoomOut = () => {
    if (!fabricRef.current || zoom <= 0.5) return;
    const newZoom = zoom - 0.1;
    setZoom(newZoom);
    fabricRef.current.setZoom(newZoom);
  };

  const handleResetZoom = () => {
    if (!fabricRef.current) return;
    setZoom(1);
    fabricRef.current.setZoom(1);
  };

  const addCircle = () => {
    if (!fabricRef.current) return;
    const circle = new fabric.Circle({
      radius: 50,
      fill: 'red',
      left: 100,
      top: 100,
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
      top: 150,
    });
  fabricRef.current.add(rect);
  fabricRef.current.setActiveObject(rect);
  fabricRef.current.renderAll();
  };

  return (
    <div className="paint-wrapper">
      <MenuBar
        x={pointerCords.x}
        y={pointerCords.y}
        selectedTool={selectedTool}
        isActionMenuOpen={isActionMenuOpen}
        closeActionMenu={closeActionMenu}
      />
      <EditorContent
        canvasRef={canvasRef}
        fabricRef={fabricRef}
        setPointerCords={setPointerCords}
        zoom={zoom}
        setZoom={setZoom}
        addRectangle={addRectangle}
        handleToolClick={handleToolClick}
      />
    </div>
  );
}
