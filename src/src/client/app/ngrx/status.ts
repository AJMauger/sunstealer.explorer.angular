
import { Action, createAction, createReducer, on, props } from "@ngrx/store"

// ajm: createAction( action ) / createReducer( actions=>state ) / link => myReducer()
// ajm: app.module imports StoreModule.forRoot({ myreducer: myReducer })
// ajm: Component: constructor(private store: Store<AppState: myState interface>) => consumer store service
// ajm:            Observable(action)
// ajm:            .this.store.select(state => myState
// ajm:            .subscribe() => component field.

// ajm: state -------------------------------------------------------------------------------------
export type StateStatus = {
  error: string,
  warning: string
}

// ajm: action ------------------------------------------------------------------------------------
export const actionStatusError = createAction("statusError", props<{error: string}>());
export const actionStatusWarning = createAction("statusWarning", props<{warning: string}>());

// ajm: reducer -----------------------------------------------------------------------------------
const reducer = createReducer(
  {
    error: "none",
    warning: "none"
  },
  on(actionStatusError, (state, { error }) => {
    return {
      ...state,
      error
    }
  }),
  on(actionStatusWarning, (state, { warning }) => {
    return {
      ...state,
      warning
    }
  })
);

// ajm: export reducer ----------------------------------------------------------------------------
export const statusReducer = (state: StateStatus | undefined, action: Action) => {
  return reducer(state, action);
}
