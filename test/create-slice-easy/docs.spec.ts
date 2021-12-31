import { configureStore } from '@reduxjs/toolkit';
import { should } from 'chai';
import { createSliceEasy } from '../../src';

describe('[create-slice-easy] docs', () => {
  it('1. basic', () => {
    const initialState = {
      isSigned: false,
      count: 1,
    };

    const { actions, reducer } = createSliceEasy('my-slice', initialState);
    const store = configureStore({
      reducer,
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }),
    });
    const dispatch = store.dispatch;
    const { setCount, setIsSigned, initCount, initIsSigned, setState } =
      actions;

    dispatch(setIsSigned(true));
    should().equal(store.getState().isSigned, true);
    dispatch(setCount(3));
    should().equal(store.getState().count, 3);
    dispatch(setCount((prevState) => prevState + 2));
    should().equal(store.getState().count, 5);
    dispatch(initCount());
    should().equal(store.getState().count, 1);
  });

  it('2. immer', () => {
    const initialState = {
      user: {
        name: 'Alex',
        age: 32,
      },
      hobbies: ['drum'],
    };

    const { actions, reducer } = createSliceEasy('my-slice', initialState, {
      toUppercaseUserName(state) {
        state.user.name = state.user.name.toUpperCase();
      },
    });
    const store = configureStore({
      reducer,
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }),
    });
    const dispatch = store.dispatch;
    const {
      setUser,
      setHobbies,
      initUser,
      initHobbies,
      setState,
      toUppercaseUserName,
    } = actions;

    dispatch(toUppercaseUserName);
    dispatch(
      setUser((user) => {
        user.name = 'Kijun';
      }),
    );
    should().equal(store.getState().user.name, 'Kijun');
    dispatch(
      setState((prevState) => {
        prevState.user.age = 33;
      }),
    );
    should().equal(store.getState().user.age, 33);
    dispatch(
      setHobbies((hobbies) => {
        hobbies.push('writing');
      }),
    );
    should().equal(store.getState().hobbies.join(','), 'drum,writing');
  });

  it('3. array', () => {
    const initialState = {
      hobbies: ['drum', 'singing'],
    };

    const { actions, reducer } = createSliceEasy('my-slice', initialState);
    const store = configureStore({
      reducer,
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }),
    });
    const dispatch = store.dispatch;
    const {
      setHobbies,
      initHobbies,
      setState,
      pushHobbies,
      popHobbies,
      shiftHobbies,
      unshiftHobbies,
      deleteHobbies,
    } = actions;

    dispatch(pushHobbies('writing'));
    should().equal(store.getState().hobbies.join(','), 'drum,singing,writing');
    dispatch(unshiftHobbies('piano'));
    should().equal(
      store.getState().hobbies.join(','),
      'piano,drum,singing,writing',
    );
    dispatch(deleteHobbies(2));
    should().equal(store.getState().hobbies.join(','), 'piano,drum,writing');
    dispatch(deleteHobbies((hobby) => hobby === 'drum'));
    should().equal(store.getState().hobbies.join(','), 'piano,writing');
    dispatch(popHobbies());
    should().equal(store.getState().hobbies.join(','), 'piano');
  });
});
