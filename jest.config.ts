module.exports = {
  displayName: 'api',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.json',
    },
  },
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': 'ts-jest',
  },
  testRegex: '.*\\.spec\\.ts$',
  // moduleFileExtensions: ['ts', 'js', 'html'],
  // modulePathIgnorePatterns: ['<rootDir>/test'],
  // testMatch: ['**/test/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[tj]s?(x)'],

  collectCoverageFrom: ['**/*.(t|j)s'],
  rootDir: '.',
};
