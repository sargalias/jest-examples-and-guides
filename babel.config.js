module.exports = api => {
  const presets = [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
        corejs: 3,
        targets: '> 5%',
      },
    ],
  ];
  const plugins = ['@babel/plugin-syntax-dynamic-import'];

  const isTest = api.env('test');
  if (isTest) {
    plugins.push('dynamic-import-node');
  }

  return {
    presets,
    plugins,
  };
};
