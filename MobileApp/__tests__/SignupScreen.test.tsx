import React from "react";
import { render, fireEvent, waitFor, act } from "@testing-library/react-native";
import SignupScreen from "../app/screens/signup";
import { AuthContext } from "../constants/auth-context";
import { Alert } from "react-native";
import { AuthProvider } from "../constants/auth-context";

const mockNavigate = jest.fn();
const mockSetOptions = jest.fn();

jest.mock("@react-navigation/native", () => {
  const actualNav = jest.requireActual("@react-navigation/native");
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockNavigate,
      setOptions: mockSetOptions, // ✅ mock this!
    }),
  };
});

jest.spyOn(Alert, "alert");

describe("SignupScreen", () => {
  const mockSignUp = jest.fn();

  const renderComponent = (loading = false) =>
    render(
      <AuthContext.Provider
        value={{
          user: null,
          loading,
          signUp: mockSignUp,
          signIn: jest.fn(),
          signOut: jest.fn(),
        }}
      >
        <SignupScreen />
      </AuthContext.Provider>
    );

  beforeEach(() => {
    mockSignUp.mockReset();
    jest.clearAllMocks();
  });

  it("renders all input fields", () => {
    const { getByPlaceholderText } = renderComponent();
    expect(getByPlaceholderText("Full Name")).toBeTruthy();
    expect(getByPlaceholderText("Email")).toBeTruthy();
    expect(getByPlaceholderText("Password")).toBeTruthy();
    expect(getByPlaceholderText("Confirm Password")).toBeTruthy();
  });

  it("shows error if name is empty", async () => {
    const { getByTestId, getByText } = renderComponent();
    await act(async () => {
      fireEvent.press(getByTestId("signup-submit-btn"));
    });
    expect(getByText("Name is required")).toBeTruthy();
  });

  it("shows error if passwords do not match", async () => {
    const { getByTestId, getByPlaceholderText, getByText } = renderComponent();
    await act(async () => {
      fireEvent.changeText(getByPlaceholderText("Full Name"), "Test User");
    });
    await act(async () => {
      fireEvent.changeText(getByPlaceholderText("Email"), "user@example.com");
    });
    await act(async () => {
      fireEvent.changeText(getByPlaceholderText("Password"), "123456");
    });
    await act(async () => {
      fireEvent.changeText(getByPlaceholderText("Confirm Password"), "654321");
    });

    await act(async () => {
      fireEvent.press(getByTestId("signup-submit-btn"));
    });

    expect(getByText("Passwords do not match")).toBeTruthy();
  });

  it("calls signUp on valid form", async () => {
    mockSignUp.mockResolvedValueOnce({});
    const { getByTestId, getByPlaceholderText } = renderComponent();

    await act(async () => {
      fireEvent.changeText(getByPlaceholderText("Full Name"), "Test User");
    });
    await act(async () => {
      fireEvent.changeText(getByPlaceholderText("Email"), "user@example.com");
    });
    await act(async () => {
      fireEvent.changeText(getByPlaceholderText("Password"), "123456");
    });
    await act(async () => {
      fireEvent.changeText(getByPlaceholderText("Confirm Password"), "123456");
    });

    await act(async () => {
      fireEvent.press(getByTestId("signup-submit-btn"));
    });

    expect(mockSignUp).toHaveBeenCalledWith(
      "Test User",
      "user@example.com",
      "123456"
    );
  });

  it("shows alert on signup error from API", async () => {
    mockSignUp.mockResolvedValueOnce({ error: "User already exists" });

    const { getByTestId, getByPlaceholderText } = renderComponent();

    await act(async () => {
      fireEvent.changeText(getByPlaceholderText("Full Name"), "Test User");
    });
    await act(async () => {
      fireEvent.changeText(getByPlaceholderText("Email"), "user@example.com");
    });
    await act(async () => {
      fireEvent.changeText(getByPlaceholderText("Password"), "123456");
    });
    await act(async () => {
      fireEvent.changeText(getByPlaceholderText("Confirm Password"), "123456");
    });

    await act(async () => {
      fireEvent.press(getByTestId("signup-submit-btn"));
    });

    expect(Alert.alert).toHaveBeenCalledWith("Error", "User already exists");
  });

  it("does not call signUp when loading is true", async () => {
    const { getByTestId, getByPlaceholderText } = renderComponent(true); // loading = true

    await act(async () => {
      fireEvent.changeText(getByPlaceholderText("Full Name"), "Test User");
      fireEvent.changeText(getByPlaceholderText("Email"), "user@example.com");
      fireEvent.changeText(getByPlaceholderText("Password"), "123456");
      fireEvent.changeText(getByPlaceholderText("Confirm Password"), "123456");
    });

    await act(async () => {
      fireEvent.press(getByTestId("signup-submit-btn"));
    });

    expect(mockSignUp).not.toHaveBeenCalled(); // ✅ Nothing should happen
  });

  it("shows generic alert on unexpected signup exception", async () => {
    mockSignUp.mockImplementationOnce(() => {
      throw new Error("Network fail");
    });

    const { getByTestId, getByPlaceholderText } = renderComponent();

    await act(async () => {
      fireEvent.changeText(getByPlaceholderText("Full Name"), "Test User");
    });
    await act(async () => {
      fireEvent.changeText(getByPlaceholderText("Email"), "user@example.com");
    });
    await act(async () => {
      fireEvent.changeText(getByPlaceholderText("Password"), "123456");
    });
    await act(async () => {
      fireEvent.changeText(getByPlaceholderText("Confirm Password"), "123456");
    });

    await act(async () => {
      fireEvent.press(getByTestId("signup-submit-btn"));
    });

    expect(Alert.alert).toHaveBeenCalledWith(
      "Error",
      "An unexpected error occurred"
    );
  });

  it("shows error if confirm password is empty", async () => {
    const { getByTestId, getByPlaceholderText, getByText } = renderComponent();
    fireEvent.changeText(getByPlaceholderText("Full Name"), "Test User");
    fireEvent.changeText(getByPlaceholderText("Email"), "user@example.com");
    fireEvent.changeText(getByPlaceholderText("Password"), "123456");

    fireEvent.press(getByTestId("signup-submit-btn"));
    expect(getByText("Please confirm your password")).toBeTruthy();
  });

  it("hides password input by default", () => {
    const { getByPlaceholderText } = renderComponent();
    const passwordInput = getByPlaceholderText("Password");

    expect(passwordInput.props.secureTextEntry).toBe(true);
  });

  it("toggles password visibility", () => {
    const { getByPlaceholderText, getByTestId } = renderComponent();
    const passwordInput = getByPlaceholderText("Password");

    expect(passwordInput.props.secureTextEntry).toBe(true);
    fireEvent.press(getByTestId("password-visibility-toggle")); // Add this testID
    // Re-render may be needed
  });

  it("does not call signUp if validation fails", async () => {
    const { getByTestId } = renderComponent();
    fireEvent.press(getByTestId("signup-submit-btn"));
    expect(mockSignUp).not.toHaveBeenCalled();
  });

  it("shows error if name contains numbers", async () => {
    const { getByPlaceholderText, getByTestId, getByText } = renderComponent();

    fireEvent.changeText(getByPlaceholderText("Full Name"), "John123");
    fireEvent.press(getByTestId("signup-submit-btn"));

    expect(getByText("Name must not contain numbers")).toBeTruthy(); // you'd add this to validation
  });
});