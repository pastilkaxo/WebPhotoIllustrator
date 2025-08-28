import * as FabricTools from './FabricTools.js'

export const toolsMap = {
  arrange: (canvas) => FabricTools.enableArrange(canvas),
  selection: (canvas) => FabricTools.enableSelection(canvas),
  crop: (canvas) => FabricTools.enableCrop(canvas),
  figures: (canvas) => {}, // не вызываем сразу, настройки через меню
  eraser: (canvas) => FabricTools.enableEraser(canvas),
  cut: (canvas) => FabricTools.cutSelected(canvas),
  fill: (canvas) => {}, // через меню можно выбрать цвет
  gradient: (canvas) => {}, // через меню выбираем цвета
  zoom: (canvas) => {}, // через меню
  picker: (canvas) => {}, // через меню
  text: (canvas) => {}, // через меню
  pencil: (canvas) => FabricTools.enablePencil(canvas),
  hand: (canvas) => FabricTools.enableHand(canvas),
  lasso: (canvas) => FabricTools.enableLasso(canvas)
};
