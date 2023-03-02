import { installGlobals } from "@remix-run/node";
import '@testing-library/jest-dom';
import matchers from '@testing-library/jest-dom/matchers';
import { expect, beforeAll, afterEach, afterAll } from 'vitest';

installGlobals();

// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom

// extends Vitest's expect method with methods from react-testing-library
expect.extend(matchers);

// Establish API mocking before all tests.
beforeAll(() => {

});

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => {
 
});

// Clean up after the tests are finished.
afterAll(() => {
 
});