export interface IGameData {
  canvas: Array<number|null>;
  cellSize: number;
  direction: number;
  gameOver: boolean;
  paused: boolean;
  snake: number[];
  numCols: number;
  numRows: number;
  speed: number;
}

export interface IUseGame {
  data: IGameData;
  pause: () => void;
  reset: () => void;
  updateGame: (data: Partial<IGameData>) => void;
  resume: () => void;
}