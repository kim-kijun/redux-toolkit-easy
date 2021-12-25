import { should } from 'chai';
import { configureStore, PayloadAction } from '@reduxjs/toolkit';
import { createSliceWithSetter } from '../../src/index';

const initialState = {
  names: ['a', 'b', 'c', 'd'],
  animals: [
    {
      name: 'cat',
      age: 5,
    },
  ],
};

const { reducer, actions } = createSliceWithSetter('slice', initialState, {
  addName(state, action: PayloadAction<string>) {
    state.names.push(action.payload);
  },
  setAgeAnimal(
    state,
    action: PayloadAction<{ targetName: string; age: number }>,
  ) {
    const targetAnimal = state.animals.find(
      ({ name }) => name === action.payload.targetName,
    );
    if (targetAnimal) targetAnimal.age = action.payload.age;
  },
});

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
const dispatch = store.dispatch;

describe('[create-slice-with-setter] array-type-test', () => {
  it('1. string array', () => {
    should().equal(store.getState().names.toString(), 'a,b,c,d');
    dispatch(actions.setNames(['a', 'b', 'c']));
    should().equal(store.getState().names.toString(), 'a,b,c');
    dispatch(actions.addName('d'));
    should().equal(store.getState().names.toString(), 'a,b,c,d');
    dispatch(
      actions.setNames((name) => {
        name[2] = 'k';
      }),
    );
    should().equal(store.getState().names.toString(), 'a,b,k,d');
  });

  it('2. object array', () => {
    should().equal(
      JSON.stringify(store.getState().animals),
      '[{"name":"cat","age":5}]',
    );
    dispatch(
      actions.setState((state) => {
        state.animals.push({
          name: 'chick',
          age: 1,
        });
      }),
    );
    should().equal(
      JSON.stringify(store.getState().animals),
      '[{"name":"cat","age":5},{"name":"chick","age":1}]',
    );
    dispatch(actions.setAgeAnimal({ targetName: 'cat', age: 8 }));
    should().equal(
      JSON.stringify(store.getState().animals),
      '[{"name":"cat","age":8},{"name":"chick","age":1}]',
    );
  });
});
