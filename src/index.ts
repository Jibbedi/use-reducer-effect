import {
  useReducer,
  Reducer,
  ReducerState,
  Dispatch,
  ReducerAction,
  useRef
} from "react";

type SideEffectFunction<R extends Reducer<any, any>> = (
  state: ReducerState<R>,
  action: ReducerAction<R>
) => Promise<ReducerAction<R> | null | undefined>;

export function createSideEffectReducer<R extends Reducer<any, any>, I>(
  sideEffects: SideEffectFunction<R>
) {
  return (reducer: R, initialState: ReducerState<R>, initializer?: any) => {
    return useReducerWithSideEffects(
      reducer,
      sideEffects,
      initialState,
      initializer
    );
  };
}

export function useReducerWithSideEffects<R extends Reducer<any, any>, I>(
  reducer: R,
  sideEffects: SideEffectFunction<R>,
  initialState: ReducerState<R>,
  initializer?: any
): [ReducerState<R>, Dispatch<ReducerAction<R>>] {
  const currentAction = useRef<ReducerAction<R> | null>(null);
  const [state, dispatch] = useReducer(
    (state: any, action: any) => {
      const newState = reducer(state, action);

      /* prevent calling side effects again if reducer function is called twice,
      which is the expected behavior in some occasions https://github.com/facebook/react/issues/16295
      */
      if (currentAction.current !== action) {
        sideEffects(newState, action).then(newAction => {
          if (!newAction) return;
          dispatch(newAction);
        });
        currentAction.current = action;
      }

      return newState;
    },
    initialState,
    initializer
  );

  return [state, dispatch];
}
