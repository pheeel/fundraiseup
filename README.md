[![CI](https://github.com/pheeel/fundraiseup/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/pheeel/fundraiseup/actions/workflows/ci.yml)

# Fundraiseup E2E testing framework
This repository contains an E2E-testing framework based on [Playwright](https://playwright.dev/) and [Typescript](https://www.typescriptlang.org/), using Playwright Test as a test runner. <br /><br />
Features:
 - Two projects, for Desktop and Mobile layouts that run sequentially
 - HTML report generation
 - Configurable amount of retries and max workers via `.env` file
 - Basic ESLint and Prettier configuration
 - Static code analysis on CI with TypeScript Compiler and ESLint

## Setup
First you'll need to install dependencies:
```sh
$ npm install
```

> NOTE: If you don't have the correct version of Chromium installed, you can run the following command to install it:
> ```sh
> $ npx playwright install chromium 
> ```

Now, we can optionally set up the environment variables. You can find `.env` file in the root directory of the project and change the following variables depending on your needs::
```
# Number of workers to run tests in parallel, default: 2
MAX_WORKERS=2 

# Number of retries for each test, default: 0
RETRIES=0 
```

## Running tests
To run tests sequentially first in Desktop and then in Mobile project, just run the following command:
```sh
$ npm run test:e2e:all-platforms
```
> NOTE: You can also run tests in Desktop and Mobile projects separately:
> ```sh
> $ npm run test:e2e:chromium # Run Desktop Project
> $ npm run test:e2e:mobile # Run Mobile Project
> ```

## Generating Report
To generate and open HTML report of the last tests run:
```sh
$ npx playwright show-report
```

## Static Code Analysis
You can also check static code analysis issues with the following commands:
```sh
$ npm run list:fix # Check and fix ESLint issues
$ npm run prettier # Format code with Prettier
$ npm run tsc # Check TypeScript compilation issues
```

## CI
This repository has a GitHub Actions workflow that runs static code analysis on each push to the `main` branch. You can find it in `.github/workflows/ci.yml` file.



