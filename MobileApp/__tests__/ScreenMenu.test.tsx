import React from "react";
import { render } from "@testing-library/react-native";
import ScreensMenu from "../app/screens/menu";

// Mock the expo-router's Link component
jest.mock("expo-router", () => ({
  Link: ({ children }: any) => <>{children}</>,
}));

describe("ScreensMenu", () => {
  it("renders the screen title", () => {
    const { getByText } = render(<ScreensMenu />);
    expect(getByText("Screens Menu")).toBeTruthy();
  });

  it("renders the Login button", () => {
    const { getByText } = render(<ScreensMenu />);
    expect(getByText("Login")).toBeTruthy();
  });

  it("renders the SignUP button", () => {
    const { getByText } = render(<ScreensMenu />);
    expect(getByText("SignUP")).toBeTruthy();
  });

  it("contains buttons wrapped in Link", () => {
    const { getByText } = render(<ScreensMenu />);
    expect(getByText("Login")).toBeTruthy();
    expect(getByText("SignUP")).toBeTruthy();
  });

  it("matches the snapshot", () => {
    const tree = render(<ScreensMenu />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
