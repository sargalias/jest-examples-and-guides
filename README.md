
# Jest examples and guides

This repository includes some guides on using Jest mocks, along with working example code.

## Table of contents
- [Guides and example code](#guides-and-example-code)
- [Getting started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
  - [Running the tests](#running-the-tests)
  - [Code formatting and linting](#code-formatting-and-linting)
  - [Build pipeline](#build-pipeline)
- [Notes](#notes)
  - [Note about the git hook](#note-about-the-git-hook)
- [Built with](#built-with)
- [License](#license)

## Guides and example code
- [Basic module mocks](guides/basic-module-mocks.md)
- [ES6 module mocks](guides/es6-module-mocks)

The examples can be found in the folder "examples".

## Getting started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- NPM

Installation requires [NPM](https://www.npmjs.com/) which is included with [Node](https://nodejs.org/). You can install Node by downloading the installer from the website.

To update NPM to the latest version:

```
npm install -g npm@latest
```

### Installation

1. Clone the repo

```
git clone https://github.com/sargalias/jest-examples-and-guides.git
```

2. Install NPM packages

```
npm install
```

## Usage

There are a few commands / NPM scripts included.

### Running the tests

- Run tests: `npm run test`
- Run tests with coverage: `npm run test:coverage`
- Run Jest tests in watch mode: `npm run test:watch`

### Code formatting and linting

- Format code with code formatter: `npm run format`
- Run lint check: `npm run lint`
- Run lint check in fix mode: `npm run lint:fix`

### Build pipeline

- Run the entire build process (code formatting, linting in fix mode, all tests): `npm run ci`

## Notes

For every option and configuration, please see the relevant documentation. E.g. for any Stylelint issues, please see the Stylelint docs and / or docs for the relevant Stylelint plugin.

### Note about the git hook

There is a pretty aggressive Git hook which runs the entire build process for every commit, ensuring linting and tests pass.

If needed, you can disable the Git hook by deleting the **.huskyrc** file, or using the `--no-verify` flag during commits. E.g.

## Built with

I used the [Front end project starter](https://github.com/sargalias/front-end-project-starter) repository as the basis for this project.

- [Jest](https://github.com/facebook/jest) - Test framework
- [ESLint](https://github.com/eslint/eslint) - JavaScript static code analysis
  - [eslint-config-airbnb](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb) - Aribnb's .eslintrc
  - [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier) - For using Prettier with ESLint
  - [eslint-plugin-import](https://github.com/benmosher/eslint-plugin-import) - Helps validate proper imports
  - [eslint-plugin-jest](https://github.com/jest-community/eslint-plugin-jest) - Rules and globals for Jest
  - [eslint-plugin-prettier](https://github.com/prettier/eslint-plugin-prettier) - Runs prettier as an ESLint rule
- [Babel](https://github.com/babel/babel) - To transpile code
  - [@babel/preset-env](https://github.com/babel/babel/tree/master/packages/babel-preset-env) - To transpile code in tests
  - [babel-jest](https://github.com/facebook/jest/tree/master/packages/babel-jest) - For Jest to transpile code
  - [babel-plugin-dynamic-import-node](https://github.com/airbnb/babel-plugin-dynamic-import-node) - To enable dynamic imports in Node (for tests)
  - [babel-plugin-syntax-dynamic-import](https://github.com/babel/babel/tree/master/packages/babel-plugin-syntax-dynamic-import) - To enable dynamic imports in the browser
- [Husky](https://github.com/typicode/husky) - Simple Git hooks
  - [lint-staged](https://github.com/okonet/lint-staged) - To allow us to run commands on git staged files
- [Prettier](https://github.com/prettier/prettier) - Code formatting
  - [pretty-quick](https://github.com/azz/pretty-quick) - Git hook helper for running prettier for staged files

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
