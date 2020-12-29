# ES6 module mocks

This guide depends on knowing the basics of `jest.mock`. Before reading this guide please see the guide to the basic-module-mocks file or the API for [jest.mock](https://jestjs.io/docs/en/jest-object#jestmockmodulename-factory-options).

Mocking ES6 modules in tests can have a few gotchas.

The first is mocking the "default" export. You need an additional setting in the factory parameter of `jest.mock` to make it work properly.

The second is that ES6 modules are "frozen". They cannot be altered once imported. To get around that you'll need to reset all modules with `jest.resetModules()` and also dynamically re-import the module in your test.

## Top-level mocking of ES6 module default export

To be able to correctly import and use the default export, you need a special property in the return object, `__esModule: true`.

```js
import boo, { bar, baz } from './bar';

jest.mock('./bar', () => {
  return {
    __esModule: true,
    default: jest
      .fn()
      .mockReturnValue('boo')
      .mockName('booMock'),
    bar: jest
      .fn()
      .mockReturnValue('bar')
      .mockName('barMock'),
    baz: jest
      .fn()
      .mockReturnValue('baz')
      .mockName('bazMock'),
  };
});

test('mocks things out correctly', () => {
  expect(boo.getMockName()).toBe('booMock');
  expect(boo()).toBe('boo');

  expect(bar.getMockName()).toBe('barMock');
  expect(bar()).toBe('bar');

  expect(baz.getMockName()).toBe('bazMock');
  expect(baz()).toBe('baz');
});
```

Without the property `__esModule: true`, jest rightfully treats the object as a "common" modules export. It imports an object with no concept of "default export". In this case the "default" property is just a property that happens to be named "default", rather than a default export.

```js
import boo, { bar, baz } from './bar';

jest.mock('./bar', () => {
  return {
    default: jest
      .fn()
      .mockReturnValue('boo')
      .mockName('booMock'),
    bar: jest
      .fn()
      .mockReturnValue('bar')
      .mockName('barMock'),
    baz: jest
      .fn()
      .mockReturnValue('baz')
      .mockName('bazMock'),
  };
});

test('mocks things out correctly', () => {
  // Passes
  expect(bar.getMockName()).toBe('barMock');
  expect(bar()).toBe('bar');

  // Passes
  expect(baz.getMockName()).toBe('bazMock');
  expect(baz()).toBe('baz');

  // Passes
  expect(boo.default.getMockName()).toBe('booMock');
  expect(boo.default()).toBe('boo');

  // Fails, there is no default export
  // expect(boo.getMockName()).toBe('booMock');
  // expect(boo()).toBe('boo');
});
```


## Re-mocking an ES6 module

In a test file you might want to alter a mock you've made to an ES6 module.

Normally this isn't possible because ES6 modules are "fronzen", they cannot be altered once imported.

You can get around this by resetting modules with `jest.resetModules()` and then importing it dynamically with `import()`.

```js
import bar, { baz, bazz } from './bar';

jest.mock('./bar', () => {
  return {
    __esModule: true,
    default: jest
      .fn()
      .mockReturnValue('bar')
      .mockName('barMock'),
    baz: jest
      .fn()
      .mockReturnValue('baz')
      .mockName('bazMock'),
    bazz: jest
      .fn()
      .mockReturnValue('bazz')
      .mockName('bazzMock'),
  };
});

test('re-mock already imported module INCORRECTLY', async () => {
  // Reset imported modules
  jest.resetModules();

  // Mock the module again only for this test
  jest.doMock('./bar', () => {
    return {
      __esModule: true,
      default: jest
        .fn()
        .mockReturnValue('bar2')
        .mockName('barMock2'),
      baz: jest
        .fn()
        .mockReturnValue('baz2')
        .mockName('bazMock2'),
      bazz: jest
        .fn()
        .mockReturnValue('bazz2')
        .mockName('bazzMock2'),
    };
  });

  /*
  // These fail.
  //jest.doMock has no effect here as the module is already imported and "frozen"

  expect(bar.getMockName()).toBe('barMock2');
  expect(bar()).toBe('bar2');

  expect(baz.getMockName()).toBe('bazMock2');
  expect(baz()).toBe('baz2');

  expect(bazz.getMockName()).toBe('bazzMock2');
  expect(bazz()).toBe('bazz2');
  */

  expect(bar.getMockName()).toBe('barMock');
  expect(bar()).toBe('bar');

  expect(baz.getMockName()).toBe('bazMock');
  expect(baz()).toBe('baz');

  expect(bazz.getMockName()).toBe('bazzMock');
  expect(bazz()).toBe('bazz');
});

test('re-mock already imported module correctly', async () => {
  // Reset imported modules
  jest.resetModules();

  // Mock the module again only for this test
  jest.doMock('./bar', () => {
    return {
      __esModule: true,
      default: jest
        .fn()
        .mockReturnValue('bar2')
        .mockName('barMock2'),
      baz: jest
        .fn()
        .mockReturnValue('baz2')
        .mockName('bazMock2'),
      bazz: jest
        .fn()
        .mockReturnValue('bazz2')
        .mockName('bazzMock2'),
    };
  });

  // Reimport the module
  // Needs to be done dynamically as there can only be one static import
  const bar2 = await import('./bar');

  expect(bar2.default.getMockName()).toBe('barMock2');
  expect(bar2.default()).toBe('bar2');

  expect(bar2.baz.getMockName()).toBe('bazMock2');
  expect(bar2.baz()).toBe('baz2');

  expect(bar2.bazz.getMockName()).toBe('bazzMock2');
  expect(bar2.bazz()).toBe('bazz2');
});
```
