import {initState} from '../store/reducers/game';

export interface IUseGame {
  data: typeof initState;
  pause: () => void;
  reset: () => void;
  updateGame: (data: Partial<typeof initState>) => void;
  resume: () => void;
}