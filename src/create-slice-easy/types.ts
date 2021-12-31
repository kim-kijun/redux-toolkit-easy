import type { PayloadAction } from '@reduxjs/toolkit';

type NameWithPrifix<
  Prifix extends string,
  Name extends string = string,
> = `${Prifix}${Capitalize<Name>}`;

type ArrayElement<ArrayType extends Array<any>> =
  ArrayType extends (infer ElementType)[] ? ElementType : any[];

export type SetStateAction<T> = (state: T) => void;

type ActionSet<State extends {}> = {
  [K in keyof State as NameWithPrifix<'set', K & string>]: (
    payload: State[K] | SetStateAction<State[K]>,
  ) => PayloadAction<any>;
};

type ActionInit<State extends {}> = {
  [K in keyof State as NameWithPrifix<
    'init',
    K & string
  >]: () => PayloadAction<void>;
};

type ActionPush<State extends {}> = {
  [K in keyof State as State[K] extends Array<any>
    ? NameWithPrifix<'push', K & string>
    : any]: (
    payload: State[K] extends Array<any> ? ArrayElement<State[K]> : any,
  ) => PayloadAction<any>;
};

type ActionPop<State extends {}> = {
  [K in keyof State as State[K] extends Array<any>
    ? NameWithPrifix<'pop', K & string>
    : any]: () => PayloadAction<void>;
};

type ActionShift<State extends {}> = {
  [K in keyof State as State[K] extends Array<any>
    ? NameWithPrifix<'shift', K & string>
    : any]: () => PayloadAction<void>;
};

type ActionUnshift<State extends {}> = {
  [K in keyof State as State[K] extends Array<any>
    ? NameWithPrifix<'unshift', K & string>
    : any]: (
    payload: State[K] extends Array<any> ? ArrayElement<State[K]> : any,
  ) => PayloadAction<any>;
};

type ActionDelete<State extends {}> = {
  [K in keyof State as State[K] extends Array<any>
    ? NameWithPrifix<'delete', K & string>
    : any]: (
    payload: State[K] extends Array<any>
      ? number | ((state: ArrayElement<State[K]>) => boolean)
      : any,
  ) => PayloadAction<any>;
};

export type CreateSliceEasyActionTypes<State extends {}> = ActionSet<State> &
  ActionInit<State> &
  ActionPush<State> &
  ActionPop<State> &
  ActionShift<State> &
  ActionUnshift<State> &
  ActionDelete<State>;
