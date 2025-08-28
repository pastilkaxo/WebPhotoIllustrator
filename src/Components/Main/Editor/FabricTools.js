import { fabric } from "fabric";

// --- ARRANGE / MOVE ---
export function enableArrange(canvas) {
  canvas.isDrawingMode = false;
  canvas.selection = true;
  canvas.forEachObject(obj => obj.selectable = true);
}

// --- SELECTION ---
export function enableSelection(canvas) {
  canvas.isDrawingMode = false;
  canvas.selection = true;
  canvas.forEachObject(obj => obj.selectable = true);
}

// --- CROP ---
export function enableCrop(canvas) {
  canvas.isDrawingMode = false;
  canvas.selection = false;
  // Можно добавить прямоугольник маски для обрезки
  // Возвращает функцию, чтобы обрезать выбранный объект
  return function cropSelected() {
    const active = canvas.getActiveObject();
    if (!active) return;
    active.clone(cloned => {
      canvas.remove(active);
      canvas.add(cloned);
      cloned.clipPath = new fabric.Rect({
        left: 0,
        top: 0,
        width: cloned.width,
        height: cloned.height
      });
    });
  };
}

// --- FIGURES ---
export function addFigure(canvas, type = "rect", options = {}) {
  if (!canvas) return;

  const canvasWidth = canvas.getWidth();
  const canvasHeight = canvas.getHeight();

  let shape;
  switch (type) {
    case "rect":
      shape = new fabric.Rect({ width: 100, height: 60, ...options });
      break;
    case "circle":
      shape = new fabric.Circle({ radius: 50, ...options });
      break;
    case "line":
      shape = new fabric.Line([0, 0, 100, 0], { strokeWidth: 2, stroke: options.fill || "black", ...options });
      break;
    default:
      return;
  }

  // Центрирование фигуры
  shape.set({
    originX: 'center',
    originY: 'center',
    left: canvasWidth / 2,
    top: canvasHeight / 2
  });

  canvas.add(shape);
  canvas.setActiveObject(shape);
  canvas.requestRenderAll();
}

// --- ERASER ---
export function enableEraser(canvas) {
  canvas.isDrawingMode = false;
  canvas.selection = false;

  const eraser = new fabric.EraserBrush(canvas);
  canvas.freeDrawingBrush = eraser;
  canvas.isDrawingMode = true;
}

// --- CUT ---
export function cutSelected(canvas) {
  const active = canvas.getActiveObject();
  if (!active) return;
  canvas.remove(active);
}

// --- FILL ---
export function fillSelected(canvas, color = "red") {
  const active = canvas.getActiveObject();
  if (!active) return;
  if ("fill" in active) active.set({ fill: color });
  canvas.renderAll();
}

// --- GRADIENT ---
export function applyGradient(canvas, active, colors = ["red", "blue"]) {
  if (!active) return;
  active.set("fill", new fabric.Gradient({
    type: 'linear',
    gradientUnits: 'pixels',
    coords: { x1: 0, y1: 0, x2: active.width, y2: active.height },
    colorStops: colors.map((c, i) => ({ offset: i / (colors.length - 1), color: c }))
  }));
  canvas.renderAll();
}

// --- ZOOM ---
export function enableZoom(canvas) {
  canvas.isDrawingMode = false;
  canvas.selection = false;
  // Реализация через события wheel уже есть в EditorContent
}

// --- PICKER ---
export function pickColor(canvas, pointer, callback) {
  const objects = canvas.getObjects();
  for (let i = objects.length - 1; i >= 0; i--) {
    const obj = objects[i];
    if (obj.containsPoint(pointer)) {
      callback(obj.fill || "#000000");
      break;
    }
  }
}

// --- TEXT ---
export function addText(canvas, text = "Text") {
  const t = new fabric.Textbox(text, { left: 100, top: 100, fontSize: 20 });
  canvas.add(t);
  canvas.setActiveObject(t);
}

// --- PENCIL ---
export function enablePencil(canvas, color = "black", width = 2) {
  canvas.isDrawingMode = true;
  canvas.freeDrawingBrush.color = color;
  canvas.freeDrawingBrush.width = width;
}

// --- HAND / PAN ---
export function enableHand(canvas) {
  canvas.isDrawingMode = false;
  canvas.selection = false;
  // Пан через mouse:down, mouse:move уже реализован в EditorContent
}

// --- LASSO ---
export function enableLasso(canvas) {
  canvas.isDrawingMode = false;
  canvas.selection = true;
  // Можно использовать polygon selection (доп. реализация)
}
