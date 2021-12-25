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

# The code before and after using `redux-toolkit-easy`

## [`Before`] Create slice and actions(original redux-toolkit)

```typescript
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  name: 'Alex',
  age: 32,
  hobbies: ['drum', 'swimming'],
  cat: {
    name: 'koon',
    age: 7,
  },
};

const { reducer, actions } = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setName(state, action: PayloadAction<string>) {
      state.name = action.payload;
    },
    setAge(state, action: PayloadAction<number>) {
      state.age = action.payload;
    },
    setHobbies(state, action: PayloadAction<string[]>) {
      state.hobbies = action.payload;
    },
    setCatName(state, action: PayloadAction<string>) {
      state.cat.name = action.payload;
    },
    setCatAge(state, action: PayloadAction<number>) {
      state.cat.age = action.payload;
    },
    addHobbies(state, action: PayloadAction<string>) {
      state.hobbies.push(action.payload);
    },
  },
});

// dispatch actions
dispatch(actions.setName('kijun'));
dispatch(actions.setAge(33));
dispatch(actions.setHobbies(['writing', 'drawing']));
dispatch(actions.setCatName('zingga'));
dispatch(actions.setCatAge(10));
dispatch(actions.addHobbies('baseball'));
```

## [`After`] Create slice and actions(with redux-tookit-easy)

```typescript
import { createSliceWithSetter } from 'redux-toolkit-easy';

const { reducer, actions } = createSliceWithSetter('user', initialState, {
  addHobbies(state, action: PayloadAction<string>) {
    state.hobbies.push(action.payload);
  },
});

// dispatch actions
dispatch(actions.setName('kijun'));
dispatch(actions.setAge(33));
dispatch(actions.setHobbies(['writing', 'drawing']));
dispatch(actions.setCat((cat) => (cat.name = 'zingga')));
dispatch(actions.setCat((cat) => (cat.age = 10)));
dispatch(actions.addHobbies('baseball'));
```

# Description

The function `createSliceWithSetter` makes a slice with setter actions. You don't need make simple actions like setAge(), setLoading(), setStage()..., also you can put the payload to function.

And support typescript.

# Peer Dependency

- @reduxjs/toolkit@^1.7.1
- typescript@4.2.4
