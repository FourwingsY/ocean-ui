module.exports = {
  rootDir: process.cwd(),
  transform: {
    '^.+\\.(jsx?)$': 'babel-jest',
    '^.+\\.(tsx?)$': 'ts-jest'
  },
  testRegex: '(/tests/.*|(\\.|/)(test|spec))\\.(tsx?|jsx?)$',
  moduleNameMapper: {
    '\\.(png|eot|woff|woff2)$': '<rootDir>/assets/__mocks__/fileMock.js',
    '@src/(.*)': '<rootDir>/src/$1'
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  moduleDirectories: ['node_modules'],
  setupFiles: ['<rootDir>/config/jest.setup.js'],
  setupTestFrameworkScriptFile: '<rootDir>/config/jest.framework.js',
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.test.{ts,tsx}',
    '!src/**/index.{ts,tsx}'
  ],

  globals: {
    'ts-jest': {
      tsConfigFile: 'config/jest.tsconfig.json'
    }
  }
};
