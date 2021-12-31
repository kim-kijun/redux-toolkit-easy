# redux-toolkit-easy

It makes it easy to use redux-tookit.

# Installation

```
npm install redux-toolkit-easy
```

or

```
yarn add redux-toolkit-easy
```

# Usage

## `createSliceEasy`

Create new redux-toolkit slice with basic actions.

## example - basic

```typescript
import { createSliceEasy } from 'redux-toolkit-easy';
import { configureStore } from '@reduxjs/toolkit';

const initialState = {
  isSigned: false,
  count: 1,
};

const { actions, reducer } = createSliceEasy('my-slice', initialState);
const store = configureStore({ reducer });
const dispatch = store.dispatch;

/* You can use predefined actions. */
const { setCount, setIsSigned, initCount, initIsSigned, setState } = actions;

dispatch(setIsSigned(true));
// isSigned === true

dispatch(setCount(3));
// count === 3

/* You can also use action with previous state. */
dispatch(setCount((prevState) => prevState + 2));
// count === 5

/* Initialize to initial value. */
dispatch(initCount());
// count === 1
```

## example - custom, immer

You can define original slice reducers in redux-tookit.

https://redux-toolkit.js.org/api/createSlice#reducers

`createSliceEasy` use also the `immer` as you used in the redux-toolkit.

https://redux-toolkit.js.org/usage/immer-reducers

```typescript
import { createSliceEasy } from 'redux-toolkit-easy';
import { configureStore } from '@reduxjs/toolkit';

const initialState = {
  user: {
    name: 'Alex',
    age: 32,
  },
  hobbies: ['drum'],
};

const { actions, reducer } = createSliceEasy('my-slice', initialState, {
  /* You can define custom redux-tookit slice reducer */
  toUppercaseUserName(state) {
    state.user.name = state.user.name.toUpperCase();
  },
});
const store = configureStore({ reducer });
const dispatch = store.dispatch;

const {
  // predefined actions of createSliceEasy
  setUser,
  setHobbies,
  initUser,
  initHobbies,
  setState,

  // custom reducer action
  toUppercaseUserName,
} = actions;

dispatch(toUppercaseUserName());

/* actions with immer */
dispatch(
  setUser((user) => {
    user.name = 'Kijun';
  }),
);
dispatch(
  setState((prevState) => {
    prevState.user.age = 33;
  }),
);
dispatch(
  setHobbies((hobbies) => {
    hobbies.push('writing');
  }),
);
```

## example - Array actions

`createSliceEasy` provides more actions for array type states.

```typescript
import { createSliceEasy } from 'redux-toolkit-easy';
import { configureStore } from '@reduxjs/toolkit';

const { actions, reducer } = createSliceEasy('my-slice', {
  hobbies: ['drum', 'singing'],
});
const store = configureStore({ reducer });
const dispatch = store.dispatch;
const {
  setHobbies,
  initHobbies,
  setState,
  /* createSliceEasy provides actions
     related to array type. */
  pushHobbies,
  popHobbies,
  shiftHobbies,
  unshiftHobbies,
  deleteHobbies,
} = actions;

dispatch(pushHobbies('writing'));
// ['drum', 'singing', 'writing']

dispatch(unshiftHobbies('piano'));
// ['piano', 'drum', 'singing', 'writing']

dispatch(deleteHobbies(2));
// ['piano', 'drum', 'writing']

dispatch(deleteHobbies((hobby) => hobby === 'drum'));
// ['piano', 'writing']

dispatch(popHobbies());
// ['piano']
```

## Typescript

`createSliceEasy` support actions with typescript.

# Peer Dependency

- @reduxjs/toolkit@^1.7.1
- typescript@4.2.4
