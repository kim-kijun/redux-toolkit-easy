export class ReducersManager {
  constructor(private initialState: any, private reducers: any) {}
  addReducers() {
    Object.keys(this.initialState).forEach((key) => {
      if (Array.isArray(this.initialState[key])) {
        this.defineReducer('push', key, (state: any, { payload }: any) => {
          state[key].push(payload);
        });
        this.defineReducer('pop', key, (state: any) => {
          state[key].pop();
        });
        this.defineReducer('shift', key, (state: any) => {
          state[key].shift();
        });
        this.defineReducer('unshift', key, (state: any, { payload }: any) => {
          state[key].unshift(payload);
        });
        this.defineReducer('delete', key, (state: any, { payload }: any) => {
          if (typeof payload === 'function') {
            const index = state[key].findIndex(payload);
            index > -1 && state[key].splice(index, 1);
          } else {
            payload > -1 && state[key].splice(payload, 1);
          }
        });
      }

      this.defineReducer('set', key, (state: any, { payload }: any) => {
        if (typeof payload === 'function') {
          const result = payload(state[key]);
          if (result !== undefined) {
            state[key] = result;
          }
        } else {
          state[key] = payload;
        }
      });
      this.defineReducer('init', key, (state: any) => {
        state[key] = this.initialState[key];
      });
    });
    return this.reducers;
  }

  private concatStringWithCapitalized(prefix: string, word: string) {
    const capitalizeKey = word.charAt(0).toUpperCase() + word.slice(1);
    return prefix + capitalizeKey;
  }

  private defineReducer(
    command: string,
    key: string,
    reducer: (state: any, action?: any) => void,
  ) {
    const actionName = this.concatStringWithCapitalized(command, key);
    if (!this.reducers[actionName]) {
      this.reducers[actionName] = reducer;
    }
  }
}
