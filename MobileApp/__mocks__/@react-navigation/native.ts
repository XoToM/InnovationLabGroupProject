export const mockNavigate = jest.fn();

export const useNavigation = () => ({
  navigate: mockNavigate,
});

// You may also need to mock other exports
export const useRoute = () => ({});
export const NavigationContainer = ({ children }) => children;
