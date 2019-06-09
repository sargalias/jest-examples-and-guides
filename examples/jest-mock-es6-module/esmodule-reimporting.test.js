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
