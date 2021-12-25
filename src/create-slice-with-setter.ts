import {
  CaseReducerActions,
  createSlice,
  PayloadAction,
  SliceCaseReducers,
  ValidateSliceCaseReducers,
} from '@reduxjs/toolkit';

type SetterName<Name extends string = string> = `set${Capitalize<Name>}`;
type SetStateAction<T> = (state: T) => void;

export const createSliceWithSetter = <
  State extends {},
  CaseReducers extends SliceCaseReducers<State> = SliceCaseReducers<State>,
  Name extends string = string,
>(
  name: Name,
  initialState: State,
  reducers: ValidateSliceCaseReducers<State, CaseReducers> = {} as any,
) => {
  if (typeof initialState === 'object') {
    Object.keys(initialState).forEach((key) => {
      const capitalizeKey = key.charAt(0).toUpperCase() + key.slice(1);
      const setter = 'set' + capitalizeKey;
      if (!(reducers as any)[setter]) {
        (reducers as any)[setter] = (state: any, { payload }: any) => {
          if (typeof payload === 'function') {
            payload(state[key]);
          } else {
            state[key] = payload;
          }
        };
      }
    });
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
      {
        [K in keyof State as SetterName<string & K>]: (
          payload: State[K] | SetStateAction<State[K]>,
        ) => PayloadAction<any>;
      };
  };
};
