import { should } from 'chai';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createSliceEasy } from '../../src/index';

const initialStateA = {
  user: {
    id: 1,
    name: 'kijun',
    age: 32,
  },
};

const initialStateB = {
  score: 100 as number | undefined,
  data: [] as string[] | null,
};

const { reducer: reducerA, actions: actionA } = createSliceEasy(
  'sliceA',
  initialStateA,
);

const { reducer: reducerB, actions: actionB } = createSliceEasy(
  'sliceB',
  initialStateB,
);

const store = configureStore({
  reducer: combineReducers({
    a: reducerA,
    b: reducerB,
  }),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
const dispatch = store.dispatch;

describe('[create-slice-easy] object-type-test', () => {
  it('1. combine', () => {
    should().equal(store.getState().a, initialStateA);
    dispatch(
      actionA.setUser((user) => {
        user.name = 'Kim-kijun';
      }),
    );
    dispatch(actionB.setScore(12));
    should().equal(store.getState().a.user.name, 'Kim-kijun');
    should().equal(store.getState().b.score, 12);
    dispatch(
      actionA.setUser((user) => {
        user.age = 33;
      }),
    );
    should().equal(store.getState().a.user.age, 33);
  });

  it('2. null undefined test', () => {
    dispatch(actionB.setScore(100));
    should().equal(
      JSON.stringify(store.getState().b),
      '{"score":100,"data":[]}',
    );
    dispatch(actionB.setScore(undefined));
    should().equal(store.getState().b.score, undefined);
    dispatch(actionB.setScore(45));
    should().equal(store.getState().b.score, 45);
    dispatch(
      actionB.setData((state) => {
        state?.push('abcd');
      }),
    );
    should().equal(JSON.stringify(store.getState().b.data), '["abcd"]');
    dispatch(actionB.setData(null));
    should().equal(store.getState().b.data, null);
  });
});
