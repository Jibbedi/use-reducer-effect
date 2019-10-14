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

## Table of Contents

- [Table of Contents](#table-of-contents)
- [The Problem](#the-problem)
- [The Solution](#the-solution)
- [Getting started](#getting-started)
- [Examples](#examples)
  - [🔗 API Call](#%f0%9f%94%97-api-call)
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
import { useReducerWithSideEffect } from "use-reducer-effect";
```

## Examples

### [🔗 API Call](https://codesandbox.io/s/happy-noether-oecng)

> Use the effect function to handle data fetching from an API

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
