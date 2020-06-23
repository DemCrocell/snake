import {
  UPDATE_GAME,
} from '../../constants/game';
import {IGameData} from '../../types/common';

export const updateGame = (payload: Partial<IGameData>) => ({
  payload,
  type: UPDATE_GAME,
});