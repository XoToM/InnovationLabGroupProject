module.exports = {
    loadAsync: jest.fn(),
    isLoaded: jest.fn(() => true),
    isLoading: jest.fn(() => false),
    unloadAsync: jest.fn()
  };
  