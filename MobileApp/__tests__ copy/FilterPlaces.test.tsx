import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import PlacesScreen from "../app/screens/filter-places";
import { NavigationContainer } from "@react-navigation/native";

const mockFetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve({
        places: [
          {
            idPlace: 1,
            name: "Mock Place",
            formattedAddress: "123 Mock St",
            latitude: 0,
            longitude: 0,
          },
        ],
      }),
  })
);

global.fetch = mockFetch;

describe("PlacesScreen Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const waitForFilterButton = async () => {
    const utils = render(
      <NavigationContainer>
        <PlacesScreen />
      </NavigationContainer>
    );
    await waitFor(() => {
      expect(utils.queryByText("Filter")).toBeTruthy();
    });
    return utils;
  };

  const openModal = async (utils: any) => {
    await waitFor(() => expect(utils.getByText("Filter")).toBeTruthy());
    fireEvent.press(utils.getByText("Filter"));
  };

  it("renders Filter button initially", async () => {
    const utils = await waitForFilterButton();
    expect(utils.getByText("Filter")).toBeTruthy();
  });

  it("opens modal and displays filters", async () => {
    const utils = await waitForFilterButton();
    await openModal(utils);
    expect(await utils.findByText(/Wheelchair Access/i)).toBeTruthy();
  });

  it("toggles a filter and makes API call", async () => {
    const utils = await waitForFilterButton();
    await openModal(utils);
    fireEvent.press(await utils.findByText(/Dogs Allowed/i));
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(2); // Initial + toggle
    });
  });

  it("toggles multiple filters and checks fetch call count", async () => {
    const utils = await waitForFilterButton();
    await openModal(utils);
    fireEvent.press(await utils.findByText(/Highly Rated/i));
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(2));
    fireEvent.press(await utils.findByText(/Child Friendly/i));
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(3));
  });

  it("renders loading state initially", async () => {
    const utils = render(
      <NavigationContainer>
        <PlacesScreen />
      </NavigationContainer>
    );
    expect(utils.getByText("Loading...")).toBeTruthy();
  });

  it("displays fetched place data (mock)", async () => {
    const utils = await waitForFilterButton();
    expect(await utils.findByText("Mock Place")).toBeTruthy();
  });

  it("closes modal on X press", async () => {
    const utils = await waitForFilterButton();
    await openModal(utils);
    fireEvent.press(await utils.findByText("X"));
    await waitFor(() => {
      expect(utils.queryByText(/Wheelchair Access/i)).toBeNull();
    });
  });

  it("constructs correct URL with filters", async () => {
    const utils = await waitForFilterButton();
    await openModal(utils);
    fireEvent.press(await utils.findByText(/Hearing Loop/i));
    await waitFor(() => {
      const call = mockFetch.mock.calls.find((args) =>
        args[0].includes("inductionLoop=1")
      );
      expect(call).toBeTruthy(); // Ensure at least one fetch had the filter param
    });
  });

  it("handles fetch failure gracefully", async () => {
    const errorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    mockFetch.mockImplementationOnce(() =>
      Promise.resolve({ ok: false, text: () => "error" })
    );

    const utils = await waitForFilterButton();
    await openModal(utils);
    fireEvent.press(await utils.findByText(/Highly Rated/i));

    await waitFor(() => {
      expect(errorSpy).toHaveBeenCalledWith(
        expect.stringContaining("❌ Fetch error:"),
        expect.any(Error)
      );
    });

    errorSpy.mockRestore();
  });

  it("does not fetch again when modal is closed immediately", async () => {
    await waitForFilterButton();
    expect(fetch).toHaveBeenCalledTimes(1); // Only initial
  });
});
