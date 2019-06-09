# Basic module mocks

Mocking is essential for unit testing. It's very common in JavaScript to need to mock out an entire module or part of a module. We can do this with `jest.mock`.

For the code examples below we will use foo.js and bar.js

```js
// foo.js
import bar from './bar';

const foo = a => {
  return bar(a);
};

export default foo;


// bar.js
const bar = () => {
  // some complex calculation
  return null;
};

export default bar;
```

## jest.mock(moduleName, factory, options)

The first parameter (moduleName) decides which module to mock out.

The second parameter (factory) is optional. It is a function which returns what the mocked module will resolve to.

The third parameter (options) is also optional. It allows you to create virtual mocks, which are mocks of modules that don't actually exist in the file system.

For more information please see the API for [jest.mock](JestObjectAPI.md#jestmockmodulename-factory-options).

## Example - jest.mock('path/to/module')

Only providing the first argument will mock out the entire module. The return value will be a jest mock function (same as `jest.fn()`).

```js
import foo from './foo';

// Import module bar so we can assert on it
import bar from './bar';

// Mock out module bar
// When bar is called it will return undefined
jest.mock('./bar');

it('mock bar example', () => {
  // when we call foo, it will call bar.
  // bar is a jest mock function which returns undefined

  // Call foo with 5
  const result = foo(5);

  // Bar should have been called once.
  expect(bar).toHaveBeenCalledTimes(1);

  // Bar should have been called with 5.
  expect(bar).toHaveBeenCalledWith(5);

  // Foo directly returns what bar returned which should be undefined
  expect(result).toBe(undefined);
});

```

## Example - jest.mock('path/to/module', factory)

We can also make the mocked module resolve to whatever we want using the factory parameter.

```js
import foo from './foo';

// Import module bar so we can assert on it
import bar from './bar';

// Mock out module bar
// The second parameter is a function which returns what bar will be when we import it. In this case bar is a jest mock function which returns 20
jest.mock('./bar', () => jest.fn().mockReturnValue(20));

it('mock bar example with factory', () => {
  // when we call foo, it will call bar.
  // bar is a jest mock function which returns undefined

  // Call foo with 5
  const result = foo(5);

  // Bar should have been called once.
  expect(bar).toHaveBeenCalledTimes(1);

  // Bar should have been called with 5.
  expect(bar).toHaveBeenCalledWith(5);

  // Foo directly returns what bar returned which should be 20
  expect(result).toBe(20);
});
```
