// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom hola
import '@testing-library/jest-dom';

/*
[build.environment]
  NODE_VERSION = "14"
  NPM_FLAGS = "--prefix=/dev/null"
[build]
  command = "CI=false && npx pnpm i --store=frontend/node_modules/.pnpm-store && npx pnpm run build"
*/
