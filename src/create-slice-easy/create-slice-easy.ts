import {
  CaseReducerActions,
  createSlice,
  PayloadAction,
  SliceCaseReducers,
  ValidateSliceCaseReducers,
} from '@reduxjs/toolkit';
import { ReducersManager } from './reducers-manager';
import type { CreateSliceEasyActionTypes, SetStateAction } from './types';

export function createSliceEasy<
  State extends {},
  CaseReducers extends SliceCaseReducers<State> = SliceCaseReducers<State>,
  Name extends string = string,
>(
  name: Name,
  initialState: State,
  reducers: ValidateSliceCaseReducers<State, CaseReducers> = {} as any,
) {
  if (typeof initialState === 'object') {
    new ReducersManager(initialState, reducers).addReducers();
  } else {
    throw new Error('Only support the object type');
  }

  const slice = createSlice({
    name,
    initialState,
    reducers: {
      setState(
        state,
        { payload }: PayloadAction<SetStateAction<typeof state>>,
      ) {
        payload(state);
      },
      ...reducers,
    },
  });

  return slice as typeof slice & {
    actions: typeof slice.actions &
      CaseReducerActions<CaseReducers> &
      CreateSliceEasyActionTypes<State>;
  };
}
