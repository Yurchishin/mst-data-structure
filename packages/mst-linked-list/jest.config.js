module.exports = {
  displayName: 'mobx-state-tree',
  testEnvironment: "node",
  //
  collectCoverageFrom: ['__tests__/**/*.js'],
  moduleFileExtensions: [
    'js',
  ],
  testRegex: '(/__tests__/.*|(\\.|/)(spec))\\.(js)?$',
  coverageDirectory: 'coverage',
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  transform: {
    '^.+\\.js?$': 'babel-jest'
  },
}
