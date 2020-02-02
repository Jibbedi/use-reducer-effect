<h1 align="center">
🧪 useReducer Effects ↩️
</h1>

<h4 align="center">
A tiny library that enables side effects with the useReducer hook
</h4>

<hr>

[![Build](https://img.shields.io/travis/Jibbedi/use-reducer-effect.svg?style=flat)](https://travis-ci.org/Jibbedi/use-reducer-effect)
[![Coverage](https://img.shields.io/codecov/c/gh/Jibbedi/use-reducer-effect.svg?style=flat)](https://codecov.io/gh/Jibbedi/use-reducer-effect)
[![License](https://img.shields.io/npm/l/use-reducer-effect.svg?style=flat)](https://github.com/Jibbedi/use-reducer-effect/blob/master/LICENSE)
[![Version](https://img.shields.io/npm/v/use-reducer-effect.svg?style=flat)](https://www.npmjs.com/package/use-reducer-effect)
[![Types](https://img.shields.io/npm/types/use-reducer-effect.svg?style=flat)](https://www.npmjs.com/package/use-reducer-effect)
[![Size](https://img.shields.io/bundlephobia/min/use-reducer-effect.svg?style=flat)](https://www.npmjs.com/package/use-reducer-effect)
[![Dependencies](https://img.shields.io/badge/Dependencies-None-brightgreen.svg?style=flat)](https://www.npmjs.com/package/use-reducer-effect)
[![Pull Requests welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat)](http://makeapullrequest.com/)
[![Downloads](https://img.shields.io/npm/dm/use-reducer-effect.svg?style=flat)](https://www.npmjs.com/package/use-reducer-effect)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

## Table of Contents <!-- omit in toc -->

- [The Problem](#the-problem)
- [The Solution](#the-solution)
- [Getting started](#getting-started)
- [Defining the effect function](#defining-the-effect-function)
- [Data Flow](#data-flow)
- [API](#api)
  - [useReducerWithSideEffects(reducer, effect, initialValue?, init?)](#usereducerwithsideeffectsreducer-effect-initialvalue-init)
  - [Effect Function](#effect-function)
- [Advanced](#advanced)
  - [createSideEffectReducer](#createsideeffectreducer)
- [Examples](#examples)
  - [🔗 API Call](#%f0%9f%94%97-api-call)
  - [🔗 Logging](#%f0%9f%94%97-logging)
- [Contributors](#contributors)

## The Problem

You are using the `useReducer` hook to manage your state, but you need a way to perform side effects (like fetching data from an API or logging) without mixing those concern together.

## The Solution

`use-reducer-effect` let's you define a second function next to the reducer function, where you can manage your side effects.

This way you can run your side effect logic on certain actions, while also allowing side effects to update the store by dispatching new actions.

## Getting started

Install the library with

```bash
npm install --save use-reducer-effect
```

and import the hook into your code

```jsx
import { useReducerWithSideEffects } from "use-reducer-effect";
```

If you already use a reducer to manage your state you will feel right at home with using them to manage side effects to.

`useReducerWithSideEffects` uses the same API as `useReducer` does, but gives you the ability to define a function which is called **after** your reducer function has run to
run additional logic like fetching data from an API.

## Defining the effect function

The effect function takes the same argument as the `reducer function`.
`state` and `action`.

Instead of modifying the state, it is responsible for handling side effects like making http calls.

Let's assume we want to fetch from an API whenever an action called LOAD is dispatched.
When the data is there, we want to feed it back into our reducer.

Note: The effect function will be called after the reducer has updated the state.

```jsx
// define the reducer as usual
function reducer(state: State, action) {
  switch (action.type) {
    case ACTION_LOAD: // this action is dispatched by clicking on the button
      return { ...state, loading: true };
    case ACTION_LOAD_SUCCESSFUL: // this action is dispatched by the side effect. We'll learn how to do this in a minute.
      return { ...state, loading: false, data: action.payload };
  }

  return state;
}

// define the effect function which is executed after the reducer has run
async function effect(state, action) {
  switch (action.type) {
    case ACTION_LOAD:
      const response = await fetch(
        `https://api.github.com/users/${action.payload}/repos`
      );
      const data = await response.json();
      return {
        type: ACTION_LOAD_SUCCESSFUL,
        payload: data
      };
  }
}

// using the hook
const MyComponent = () => {
  const [dispatch, state] = useReducerWithSideEffects(reducer, effect);
};
```

## Data Flow

![Data flow visualization](<static/Use Reducer Side Effect Demo.png>)

1. The `action LOAD` is dispatched with a payload (in this case the GitHub username)
2. The `reducer function` is run and updated state is returned to the component
3. The `effect function` is called, which has access to the updated state and the dispatched action (LOAD)
4. The `effect function` triggers an http request
5. It dispatches the `action ACTION_LOAD_SUCCESSFUL` with the API response data as payload
6. The `reducer function` is called again (ACTION_LOAD_SUCCESSFUL) and updates the state
7. The `effect function` is called again with the new state (API response) and the `action ACTION_LOAD_SUCCESSFUL`. We didn't register a side effect for this action so it doesn't do anything.

## API

### useReducerWithSideEffects(reducer, effect, initialValue?, init?)

The only difference between this function and `useReducer` is the `effect function` you need to provide as the second argument.

### Effect Function

> function(state, action) => Promise<action|undefined>

The effect function is called with the updated state and the action that caused the state update.
It needs to return a `Promise` (async/await works great here) with either a action if you want to update the state again (i.e. after fetching from an API) or undefined
if you do not want to update the state (i.e. if you want to use a side effect for logging purposes only)

## Advanced

### createSideEffectReducer

It is possible to use the higher order function `createSideEffectReducer` which takes the `effect function` as it's only argument to create a hook which provides you with the exact API signature that `useReducer` uses.

This way you can provide a nice abstraction for shared functionality like logging.

```jsx
const useLoggingReducer = createSideEffectReducer(async (state, action) => {
  console.log("Action", action);
  console.log("Current State", state);
});

const MyComponent = () => {
  const [state, dispatch] = useLoggingReducer(reducer, {
    count: 0
  });
};
```

## Examples

### [🔗 API Call](https://codesandbox.io/s/happy-noether-oecng)

> Use the effect function to handle data fetching from an API

### [🔗 Logging](https://codesandbox.io/s/holy-surf-2mft6)

> Use createSideEffectReducer to create a useReducer like hook that logs all actions and state changes.

## Contributors

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://turnpro.in"><img src="https://avatars3.githubusercontent.com/u/19505532?v=4" width="100px;" alt="Johannes Kling"/><br /><sub><b>Johannes Kling</b></sub></a><br /><a href="https://github.com/Jibbedi/use-reducer-effect/commits?author=Jibbedi" title="Code">💻</a> <a href="https://github.com/Jibbedi/use-reducer-effect/commits?author=Jibbedi" title="Documentation">📖</a> <a href="#ideas-Jibbedi" title="Ideas, Planning, & Feedback">🤔</a> <a href="#example-Jibbedi" title="Examples">💡</a> <a href="https://github.com/Jibbedi/use-reducer-effect/commits?author=Jibbedi" title="Tests">⚠️</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->
