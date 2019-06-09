import bar, { baz, bazz } from './bar';

jest.mock('./bar', () => {
  return {
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

test('mocks things out correctly', () => {
  // Passes
  expect(baz.getMockName()).toBe('bazMock');
  expect(baz()).toBe('baz');

  // bar.baz will also work
  expect(bar.baz.getMockName()).toBe('bazMock'); // eslint-disable-line
  expect(bar.baz()).toBe('baz'); // eslint-disable-line

  // Passes
  expect(bazz.getMockName()).toBe('bazzMock');
  expect(bazz()).toBe('bazz');

  // bar.bazz will also work
  expect(bar.bazz.getMockName()).toBe('bazzMock'); // eslint-disable-line
  expect(bar.bazz()).toBe('bazz'); // eslint-disable-line

  // Passes
  expect(bar.default.getMockName()).toBe('barMock');
  expect(bar.default()).toBe('bar');

  // Fails
  // expect(bar.getMockName()).toBe('barMock');
  // expect(bar()).toBe('bar');
});
