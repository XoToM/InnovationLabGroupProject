module.exports = {
    Link: ({ children }) => children,
    useRouter: () => ({ push: jest.fn(), replace: jest.fn(), back: jest.fn() }),
    useLocalSearchParams: () => ({}),
    Stack: ({ children }) => children,
  };
  