import React from 'react';
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react"


export default function Editor() {
  const { editor, onReady } = useFabricJSEditor();

  const onAddCircle = () => {
    if (editor) {
      editor.addCircle();
    } else {
      console.error("Editor is not initialized");
    }
  };

  const onAddRectangle = () => {
    if (editor) {
      editor.addRectangle();
    } else {
      console.error("Editor is not initialized");
    }
  };

  return (
    <div className="paint">
      <h1>FabricJS React Sample</h1>
      <button onClick={onAddCircle}>Add Circle</button>
      <button onClick={onAddRectangle}>Add Rectangle</button>
      <FabricJSCanvas onReady={onReady} className="sample-canva" />
    </div>
  );
}
