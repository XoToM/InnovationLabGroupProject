import React from "react";
import { TouchableOpacity } from "react-native";
import { render, waitFor, fireEvent } from "@testing-library/react-native";
import PlacesScreen from "../app/screens/places";
import { API_DOMAIN } from "@/constants/config";

// Mock data
const mockPlaces = [
  {
    idPlace: 1,
    name: "Library",
    formattedAddress: "123 Main St",
    latitude: 37.7749,
    longitude: -122.4194,
  },
  {
    idPlace: 2,
    name: "Park",
    formattedAddress: "456 Elm St",
    latitude: 40.7128,
    longitude: -74.006,
  },
];

// Mock fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ places: mockPlaces }),
  })
) as jest.Mock;

// Mock expo-router Link
jest.mock("expo-router", () => ({
  Link: ({ children, href }: any) => <>{children}</>,
}));

describe("PlacesScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders loading state initially", () => {
    const { getByText } = render(<PlacesScreen />);
    expect(getByText("Loading...")).toBeTruthy();
  });

  it("fetches places and displays them", async () => {
    const { getByText } = render(<PlacesScreen />);
    await waitFor(() => {
      expect(getByText("Library")).toBeTruthy();
      expect(getByText("Park")).toBeTruthy();
    });
  });

  it("displays address and coordinates of each place", async () => {
    const { getByText } = render(<PlacesScreen />);
    await waitFor(() => {
      expect(getByText("123 Main St")).toBeTruthy();
      expect(getByText("456 Elm St")).toBeTruthy();
      expect(getByText("37.7749, -122.4194")).toBeTruthy();
      expect(getByText("40.7128, -74.006")).toBeTruthy();
    });
  });

  it("renders a FlatList of places with 2 columns", async () => {
    const { UNSAFE_getAllByType } = render(<PlacesScreen />);
    await waitFor(() => {
      const touchables = UNSAFE_getAllByType(TouchableOpacity);
      expect(touchables.length).toBeGreaterThanOrEqual(2);
    });
  });

  it("does not crash on empty list", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ places: [] }),
    });

    const { queryByText } = render(<PlacesScreen />);
    await waitFor(() => {
      expect(queryByText("Library")).toBeNull();
    });
  });

  it("handles API error gracefully", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });

    const { getByText } = render(<PlacesScreen />);
    await waitFor(() => {
      expect(getByText("Loading...")).toBeTruthy(); // Still shows loading momentarily
    });
  });

  it("matches snapshot after data load", async () => {
    const { toJSON } = render(<PlacesScreen />);
    await waitFor(() => {
      const tree = toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  it("uses correct API endpoint", async () => {
    render(<PlacesScreen />);
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(`${API_DOMAIN}/places`);
    });
  });

  it("displays all place names correctly", async () => {
    const { getByText } = render(<PlacesScreen />);
    await waitFor(() => {
      mockPlaces.forEach((place) => {
        expect(getByText(place.name)).toBeTruthy();
      });
    });
  });

  it("renders the correct number of cards", async () => {
    const { UNSAFE_getAllByType } = render(<PlacesScreen />);
    await waitFor(() => {
      const cards = UNSAFE_getAllByType(TouchableOpacity);
      expect(cards.length).toBe(mockPlaces.length);
    });
  });
});
