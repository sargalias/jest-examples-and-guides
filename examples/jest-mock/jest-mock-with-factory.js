import foo from './foo';

// Import module bar so we can assert on it
import bar from './bar';

// Mock out module bar
// The second parameter is a function which returns what bar will be when we import it. In this case bar is a jest mock function which returns 20
jest.mock('./bar', () => jest.fn().mockReturnValue(20));

it('mock bar example', () => {
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
