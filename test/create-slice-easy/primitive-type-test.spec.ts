import { should } from 'chai';
import { configureStore } from '@reduxjs/toolkit';
import { createSliceEasy } from '../../src/index';

const initialState = {
  boolean: false,
  number: 0,
  string: '',
};

const { reducer, actions } = createSliceEasy('slice', initialState);

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
const dispatch = store.dispatch;

describe('[create-slice-easy] primitive-type-test', () => {
  it('1. boolean', () => {
    should().equal(store.getState().boolean, false);
    dispatch(actions.setBoolean(true));
    should().equal(store.getState().boolean, true);
    dispatch(actions.setBoolean(false));
    should().equal(store.getState().boolean, false);
  });

  it('2. number', () => {
    should().equal(store.getState().number, 0);
    dispatch(actions.setNumber(3));
    should().equal(store.getState().number, 3);
    dispatch(actions.setNumber(0));
    should().equal(store.getState().number, 0);
  });

  it('3. string', () => {
    should().equal(store.getState().string, '');
    dispatch(actions.setString('abc'));
    should().equal(store.getState().string, 'abc');
    dispatch(actions.setString(''));
    should().equal(store.getState().string, '');
  });

  it('4. setState', () => {
    should().equal(store.getState().boolean, false);
    should().equal(store.getState().number, 0);
    should().equal(store.getState().string, '');
    dispatch(
      actions.setState((state) => {
        state.boolean = true;
        state.number = 3;
        state.string = '2';
      }),
    );
    should().equal(store.getState().boolean, true);
    should().equal(store.getState().number, 3);
    should().equal(store.getState().string, '2');
  });
});
