import React from "react";
import {
  render,
  fireEvent,
  waitForDomChange,
  cleanup
} from "react-testing-library";
import {
  useReducerWithSideEffects,
  createSideEffectReducer
} from "../src/index";

afterEach(cleanup);
afterEach(jest.clearAllMocks);

interface State {
  loading: boolean;
  data: any;
}

const ACTION_LOAD = "LOAD";
const ACTION_LOAD_SUCCESSFUL = "LOAD_SUCCESSFUL";

const TEST_NAME = "TEST_NAME";

const reducer = jest.fn((state: State, action: any) => {
  switch (action.type) {
    case ACTION_LOAD: // this action is dispatched by clicking on the button
      return { ...state, loading: true };
    case ACTION_LOAD_SUCCESSFUL: // this action is dispatched by the side effect
      return { ...state, loading: false, data: action.payload };
  }

  return state;
});

const effect = jest.fn(async (state: State, action: any) => {
  switch (action.type) {
    case ACTION_LOAD:
      const response = await loadData(action.payload);
      return {
        type: ACTION_LOAD_SUCCESSFUL,
        payload: response
      };
  }
});

const loadData = jest.fn((url: string) => {
  return Promise.resolve({
    mockData: true
  });
});

const useMySideEffectReducer = createSideEffectReducer(effect);

const MyComponent = () => {
  const [state, dispatch] = useMySideEffectReducer(reducer, {
    loading: false,
    data: null
  });
  return (
    <div>
      {state.loading && <div>Loading...</div>}
      {state.data && (
        <div data-testid="result">{state.data.mockData && "Mocked value"}</div>
      )}
      {!state.loading && !state.data && <div>Please press the button</div>}
      <button
        data-testid="load-data-button"
        onClick={e => dispatch({ type: ACTION_LOAD, payload: TEST_NAME })}
      >
        Load data
      </button>
    </div>
  );
};

test("test side effects", async () => {
  const { getByText, getByTestId } = render(<MyComponent />);

  const loadButton = getByText("Please press the button");
  expect(loadButton).toBeTruthy();

  fireEvent.click(getByTestId("load-data-button"));

  // it should run reducer first
  expect(reducer).toHaveBeenCalledWith(
    { loading: false, data: null },
    {
      type: ACTION_LOAD,
      payload: TEST_NAME
    }
  );

  // it should run effect with updated state
  expect(effect).toHaveBeenCalledWith(
    { loading: true, data: null },
    {
      type: ACTION_LOAD,
      payload: TEST_NAME
    }
  );

  //state should be updated correctly
  expect(getByText("Loading...")).toBeTruthy();

  await waitForDomChange();

  // Promise is resolved and reducer should be called again
  expect(reducer).toHaveBeenCalledWith(
    { loading: true, data: null },
    {
      type: ACTION_LOAD_SUCCESSFUL,
      payload: { mockData: true }
    }
  );

  // effect should be called again with updated state
  expect(effect).toHaveBeenCalledWith(
    { loading: false, data: { mockData: true } },
    {
      type: ACTION_LOAD_SUCCESSFUL,
      payload: { mockData: true }
    }
  );

  //state should be returned to component
  expect(getByTestId("result").innerHTML).toBe("Mocked value");

  //verify that effect is not called multiple times
  expect(effect).toHaveBeenCalledTimes(2);
});
