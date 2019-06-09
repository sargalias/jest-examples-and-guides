import bar, { baz, bazz } from './bar';

const foo = () => {
  return bar();
};

const far = () => {
  return baz();
};

const faz = () => {
  return bazz();
};

export { foo as default, far, faz };
