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

test('mocks things out correctly', () => {
  expect(bar.getMockName()).toBe('barMock');
  expect(bar()).toBe('bar');

  expect(baz.getMockName()).toBe('bazMock');
  expect(baz()).toBe('baz');

  expect(bazz.getMockName()).toBe('bazzMock');
  expect(bazz()).toBe('bazz');
});
