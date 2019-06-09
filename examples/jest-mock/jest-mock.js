import foo from './foo';

// Import module bar so we can assert on it
import bar from './bar';

// Mock out module bar
jest.mock('./bar');

it('mock bar example with factory', () => {
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
