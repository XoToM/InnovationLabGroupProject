import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';

// Core mocks
jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);
jest.mock('expo-font');
jest.mock('@expo/vector-icons');

// Silence Animated warning from React Native by mocking the entire reanimated module
jest.mock('react-native-reanimated', () =>
  require('react-native-reanimated/mock')
);

// Optional: Silence console.warn and console.error if too noisy
beforeAll(() => {
  jest.spyOn(console, 'warn').mockImplementation(() => {});
  jest.spyOn(console, 'error').mockImplementation(() => {});
});
