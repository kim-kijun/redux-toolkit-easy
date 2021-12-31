import { should } from 'chai';
import { configureStore, PayloadAction } from '@reduxjs/toolkit';
import { createSliceEasy } from '../../src/index';

const initialState = {
  name: ['a', 'b', 'c', 'd'],
  number: [0, -1, 3, 4, 5],
  a: new Date(),
};

const { reducer, actions } = createSliceEasy('slice', initialState);

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
const dispatch = store.dispatch;

describe('[create-slice-easy] array-action-test', () => {
  it('1. string array', () => {
    should().equal(store.getState().name.toString(), 'a,b,c,d');
    dispatch(actions.pushName('k'));
    should().equal(store.getState().name.toString(), 'a,b,c,d,k');
    dispatch(actions.deleteName(3));
    should().equal(store.getState().name.toString(), 'a,b,c,k');
    dispatch(actions.deleteName((element) => element === 'f'));
    should().equal(store.getState().name.toString(), 'a,b,c,k');
    dispatch(actions.deleteName((element) => element === 'a'));
    should().equal(store.getState().name.toString(), 'b,c,k');
    dispatch(actions.popName());
    should().equal(store.getState().name.toString(), 'b,c');
    dispatch(actions.shiftName());
    should().equal(store.getState().name.toString(), 'c');
    dispatch(actions.unshiftName('m'));
    should().equal(store.getState().name.toString(), 'm,c');
    dispatch(actions.popName());
    should().equal(store.getState().name.toString(), 'm');
    dispatch(actions.initName());
    should().equal(store.getState().name.toString(), 'a,b,c,d');
  });

  it('2. number array', () => {
    should().equal(store.getState().number.toString(), '0,-1,3,4,5');
    dispatch(actions.pushNumber(0));
    should().equal(store.getState().number.toString(), '0,-1,3,4,5,0');
    dispatch(actions.deleteNumber(1));
    should().equal(store.getState().number.toString(), '0,3,4,5,0');
    dispatch(actions.deleteNumber((element) => element === 4));
    should().equal(store.getState().number.toString(), '0,3,5,0');
  });
});
