module.exports = {
  preset: 'jest-expo',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  transformIgnorePatterns: [
    'node_modules/(?!(expo|@expo|expo-font|expo-linear-gradient|expo-asset|expo-constants|@expo/vector-icons|expo-modules-core|@rneui|@unimodules|react-native|@react-native|expo-router|react-native-size-matters|react-native-ratings)/)',
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    "^expo-font$": "<rootDir>/__mocks__/expo-font.js",
    "^@expo/vector-icons$": "<rootDir>/__mocks__/@expo/vector-icons.js"
  },
};
