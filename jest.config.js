module.exports = {
  verbose: true,
  bail: true,
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  testEnvironment: 'node',   
  cacheDirectory: ".jest/cache",
  testPathIgnorePatterns: [
    "\\.snap$",
    "<rootDir>/node_modules/"
  ],
  transformIgnorePatterns: [
    "\\.snap$",
    'node_modules/(?!(react-native|react-native-vector-icons|react-native/Libraries/Image/RelativeImageStub|react-navigation|jest-resolve|expo|lodash|enzyme|react|jest-enzyme|enzyme|jest-expo|jest-serializer-enzyme|react-native-elements|react-native-google-places-autocomplete)/)',
  ],
  transform: {
    "\\.(ts|tsx)$": "ts-jest",
    "^.+\\.js$": "<rootDir>/node_modules/react-native/jest/preprocessor.js"
  },
  testRegex: "(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$",
  testMatch: null,
  setupFiles: [
    '<rootDir>/config/jest/globalFetch.ts',
    '<rootDir>/config/enzyme/index.ts',
    '<rootDir>/config/setupTests.js',
  ],
  moduleDirectories: ['node_modules'],
  unmockedModulePathPatterns: [
    '<rootDir>/node_modules/react',
    '<rootDir>/node_modules/react-dom',
    '<rootDir>/node_modules/react-addons-test-utils',
  ],  
  moduleNameMapper: {
    ".+\\.(css|styl|less|sass|scss)$": "identity-obj-proxy",
    ".+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/config/fileMock.js"
  }
};
