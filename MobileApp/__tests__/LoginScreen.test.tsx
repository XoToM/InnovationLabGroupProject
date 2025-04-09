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

import React from "react";
import { render, fireEvent, waitFor, act } from "@testing-library/react-native";
import LoginScreen from "../app/screens/login";
import { AuthContext } from "../app/screens/context";
import { Alert } from "react-native";
import { AuthProvider } from "../app/screens/context";

jest.spyOn(Alert, "alert");

describe("LoginScreen", () => {
  const mockSignIn = jest.fn();

  const renderComponent = (loading = false) =>
    render(
      <AuthContext.Provider
        value={{
          user: null,
          loading,
          signIn: mockSignIn,
          signUp: jest.fn(),
          signOut: jest.fn(),
        }}
      >
        <LoginScreen />
      </AuthContext.Provider>
    );

  beforeEach(() => {
    jest.clearAllMocks(); // Clear everything first
    mockSignIn.mockReset(); // Then reset custom mocks
    mockNavigate.mockReset(); // ✅ Add this to make sure navigate tracking is clean
  });

  it("renders email and password inputs", () => {
    const { getByPlaceholderText } = renderComponent();
    expect(getByPlaceholderText("Email")).toBeTruthy();
    expect(getByPlaceholderText("Password")).toBeTruthy();
  });

  it("shows error for empty email", async () => {
    const { getByText } = renderComponent();
    await act(async () => {
      fireEvent.press(getByText("Sign In"));
    });
    expect(getByText("Email is required")).toBeTruthy();
  });

  it("shows error for invalid email", async () => {
    const { getByPlaceholderText, getByText } = renderComponent();
    await act(async () => {
      fireEvent.changeText(getByPlaceholderText("Email"), "invalidemail");
    });

    await act(async () => {
      fireEvent.press(getByText("Sign In"));
    });

    expect(getByText("Please enter a valid email")).toBeTruthy();
  });

  it("shows error for empty password", async () => {
    const { getByPlaceholderText, getByText } = renderComponent();
    await act(async () => {
      fireEvent.changeText(getByPlaceholderText("Email"), "user@example.com");
    });

    await act(async () => {
      fireEvent.press(getByText("Sign In"));
    });

    expect(getByText("Password is required")).toBeTruthy();
  });

  it("shows error for short password", async () => {
    const { getByPlaceholderText, getByText } = renderComponent();
    await act(async () => {
      fireEvent.changeText(getByPlaceholderText("Email"), "user@example.com");
    });
    await act(async () => {
      fireEvent.changeText(getByPlaceholderText("Password"), "123");
    });

    await act(async () => {
      fireEvent.press(getByText("Sign In"));
    });

    expect(getByText("Password must be at least 6 characters")).toBeTruthy();
  });

  it("calls signIn on valid form", async () => {
    mockSignIn.mockResolvedValueOnce({});
    const { getByPlaceholderText, getByText } = renderComponent();
    await act(async () => {
      fireEvent.changeText(getByPlaceholderText("Email"), "user@example.com");
    });
    await act(async () => {
      fireEvent.changeText(getByPlaceholderText("Password"), "password123");
    });

    await act(async () => {
      fireEvent.press(getByText("Sign In"));
    });

    expect(mockSignIn).toHaveBeenCalledWith("user@example.com", "password123");
  });

  it("shows alert on signIn error", async () => {
    mockSignIn.mockResolvedValueOnce({ error: "Invalid credentials" });
    const { getByPlaceholderText, getByText } = renderComponent();

    await act(async () => {
      fireEvent.changeText(getByPlaceholderText("Email"), "user@example.com");
    });
    await act(async () => {
      fireEvent.changeText(getByPlaceholderText("Password"), "wrongpass");
    });

    await act(async () => {
      fireEvent.press(getByText("Sign In"));
    });

    expect(Alert.alert).toHaveBeenCalledWith("Error", "Invalid credentials");
  });

  it("shows generic alert on unexpected signIn exception", async () => {
    mockSignIn.mockImplementationOnce(() => {
      throw new Error("Network error");
    });

    const { getByPlaceholderText, getByText } = renderComponent();

    await act(async () => {
      fireEvent.changeText(getByPlaceholderText("Email"), "user@example.com");
    });
    await act(async () => {
      fireEvent.changeText(getByPlaceholderText("Password"), "password123");
    });

    await act(async () => {
      fireEvent.press(getByText("Sign In"));
    });

    expect(Alert.alert).toHaveBeenCalledWith(
      "Error",
      "An unexpected error occurred"
    );
  });

  it("does not call signIn when loading is true", async () => {
    const { getByTestId } = renderComponent(true); // loading=true
    const submitBtn = getByTestId("login-submit-btn");

    await act(async () => {
      fireEvent.press(submitBtn);
    });

    expect(mockSignIn).not.toHaveBeenCalled(); // ✅ Ensure disabled means no call
  });
  it("enables submit button when email and password are valid", async () => {
    const { getByTestId, getByPlaceholderText } = renderComponent();
    fireEvent.changeText(getByPlaceholderText("Email"), "user@example.com");
    fireEvent.changeText(getByPlaceholderText("Password"), "password123");
    const button = getByTestId("login-submit-btn");

    expect(button.props.accessibilityState?.disabled).toBe(false);
  });

  it("does not call signIn if fields are invalid", async () => {
    const { getByText } = renderComponent();
    await act(async () => fireEvent.press(getByText("Sign In")));
    expect(mockSignIn).not.toHaveBeenCalled();
  });

  it("clears email error after valid input", async () => {
    const { getByPlaceholderText, getByText, queryByText } = renderComponent();

    fireEvent.press(getByText("Sign In")); // trigger error
    expect(getByText("Email is required")).toBeTruthy();

    fireEvent.changeText(getByPlaceholderText("Email"), "user@example.com");
    expect(queryByText("Email is required")).toBeNull();
  });

  it("toggles password visibility when eye icon is pressed", async () => {
    const { getByPlaceholderText, getByTestId } = renderComponent();

    const passwordInput = getByPlaceholderText("Password");

    // Initially should be secure
    expect(passwordInput.props.secureTextEntry).toBe(true);

    // Press the eye icon
    const eyeButton = getByTestId("password-visibility-toggle");
    fireEvent.press(eyeButton);

    // Should now show password (secureTextEntry = false)
    expect(passwordInput.props.secureTextEntry).toBe(false);

    // Toggle again
    fireEvent.press(eyeButton);
    expect(passwordInput.props.secureTextEntry).toBe(true);
  });
});