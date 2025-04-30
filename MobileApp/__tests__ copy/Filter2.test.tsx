import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import Filter from "../app/screens/filter2";

// Helper to open modal
const openModal = (getByText: any) => {
  const button = getByText("Filter");
  fireEvent.press(button);
};

describe("Filter2 Component", () => {
  it("renders the Filter button", () => {
    const { getByText } = render(<Filter />);
    expect(getByText("Filter")).toBeTruthy();
  });

  it("opens modal when Filter button is pressed", async () => {
    const { getByText, findByText } = render(<Filter />);
    openModal(getByText);
    const checkboxLabel = await findByText(/Wheelchair Access/);
    expect(checkboxLabel).toBeTruthy();
  });

  it("toggles filter checkbox when tapped", async () => {
    const { getByText, findByText } = render(<Filter />);
    openModal(getByText);
    const checkbox = await findByText(/Dogs Allowed/);
    fireEvent.press(checkbox);
    expect(checkbox.props.children.join("")).toContain("☑");
  });

  it("makes API call when a filter is toggled", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({ ok: true, json: () => Promise.resolve([]) })
    ) as jest.Mock;

    const { getByText, findByText } = render(<Filter />);
    openModal(getByText);
    const checkbox = await findByText(/Ratings/);
    fireEvent.press(checkbox);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalled();
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining("ratings=1"),
        expect.any(Object)
      );
    });
  });

  it("closes modal when X is pressed", async () => {
    const { getByText, queryByText } = render(<Filter />);
    openModal(getByText);
    const close = await queryByText("X");
    fireEvent.press(close);
    await waitFor(() => {
      expect(queryByText(/Dogs Allowed/)).toBeNull();
    });
  });

  it("updates query params with multiple filters", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({ ok: true, json: () => Promise.resolve([]) })
    ) as jest.Mock;

    const { getByText, findByText } = render(<Filter />);
    openModal(getByText);
    const dogFilter = await findByText(/Dogs Allowed/);
    const ratingFilter = await findByText(/Ratings/);
    fireEvent.press(dogFilter);
    fireEvent.press(ratingFilter);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining("allowsDogs=1&ratings=1"),
        expect.any(Object)
      );
    });
  });

  it("handles empty filters gracefully", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({ ok: true, json: () => Promise.resolve([]) })
    ) as jest.Mock;

    const { getByText } = render(<Filter />);
    openModal(getByText);
    // don't toggle any filter, but ensure no crash
    expect(getByText("X")).toBeTruthy();
  });

  it("displays all available filters", async () => {
    const { getByText, findByText } = render(<Filter />);
    openModal(getByText);

    expect(await findByText(/Wheelchair Access/)).toBeTruthy();
    expect(await findByText(/Dogs Allowed/)).toBeTruthy();
    expect(await findByText(/Ratings/)).toBeTruthy();
    expect(await findByText(/Hearing Loop/)).toBeTruthy();
  });

  it("does not call API if fetch is not needed", async () => {
    const fetchSpy = jest.fn();
    global.fetch = fetchSpy;
    const { getByText } = render(<Filter />);
    openModal(getByText);
    expect(fetchSpy).not.toHaveBeenCalled();
  });
});
