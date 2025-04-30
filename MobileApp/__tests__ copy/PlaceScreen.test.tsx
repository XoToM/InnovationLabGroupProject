import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { useLocalSearchParams } from "expo-router";
import PlaceScreen from "../app/screens/place";

// Mock image imports
jest.mock("react-native/Libraries/Image/Image", () => "Image");

// Mock useLocalSearchParams to provide sample navigation params
jest.mock("expo-router", () => ({
  useLocalSearchParams: jest.fn(),
}));

const mockParams = {
  name: "Test Place",
  formattedAddress: "123 Main Street",
  latitude: 12.34,
  longitude: 56.78,
};

describe("PlaceScreen", () => {
  beforeEach(() => {
    (useLocalSearchParams as jest.Mock).mockReturnValue(mockParams);
  });

  it("renders place name in title", () => {
    const { getByText } = render(<PlaceScreen />);
    expect(getByText("Test Place")).toBeTruthy();
  });

  it("displays the header elements including logo and menu icon", () => {
    const { getByText } = render(<PlaceScreen />);
    expect(getByText("☰")).toBeTruthy();
    expect(getByText("EquiMap")).toBeTruthy();
  });

  it("renders all four circular icon buttons", () => {
    const { getByText } = render(<PlaceScreen />);
    expect(getByText("♿")).toBeTruthy();
    expect(getByText("🏳️‍🌈")).toBeTruthy();
    expect(getByText("🔍")).toBeTruthy();
    expect(getByText("🍽️")).toBeTruthy();
  });

  it("shows accessibility info when ♿ is tapped", () => {
    const { getByText, queryByText } = render(<PlaceScreen />);
    expect(
      queryByText(/This location has great disability access/i)
    ).toBeNull();
    fireEvent.press(getByText("♿"));
    expect(
      getByText(/This location has great disability access/i)
    ).toBeTruthy();
  });

  it("shows lgbt info when 🏳️‍🌈 is tapped", () => {
    const { getByText, queryByText } = render(<PlaceScreen />);
    fireEvent.press(getByText("🏳️‍🌈"));
    expect(getByText(/supports LGBTQ\+ inclusivity/i)).toBeTruthy();
  });

  it("toggles info box off when same button is pressed again", () => {
    const { getByText, queryByText } = render(<PlaceScreen />);
    const button = getByText("♿");
    fireEvent.press(button);
    expect(getByText(/disability access/i)).toBeTruthy();
    fireEvent.press(button);
    expect(queryByText(/disability access/i)).toBeNull();
  });

  it("renders 4 stars and a ££ price tag", () => {
    const { getByText } = render(<PlaceScreen />);
    expect(getByText("⭐⭐⭐⭐☆")).toBeTruthy();
    expect(getByText("££")).toBeTruthy();
  });

  it("renders static description paragraph", () => {
    const { getByText } = render(<PlaceScreen />);
    expect(getByText(/Lorem ipsum/i)).toBeTruthy();
  });

  it("opens and closes menu modal", () => {
    const { getByText, queryByText } = render(<PlaceScreen />);
    fireEvent.press(getByText("☰"));
    expect(getByText("✖ Close")).toBeTruthy();
    fireEvent.press(getByText("✖ Close"));
    expect(queryByText("✖ Close")).toBeNull();
  });

  it("matches snapshot", () => {
    const tree = render(<PlaceScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
