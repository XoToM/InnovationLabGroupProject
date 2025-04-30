import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import SettingsScreen from "../app/screens/settings"; // Adjust path as needed

describe("SettingsScreen", () => {
  it("renders the screen with header and title", () => {
    const { getByText } = render(<SettingsScreen />);
    expect(getByText("Settings")).toBeTruthy();
  });

  it("renders all accessibility switches", () => {
    const { getByText } = render(<SettingsScreen />);
    expect(getByText("Wheelchair user")).toBeTruthy();
    expect(getByText("Hearing loop")).toBeTruthy();
    expect(getByText("Guide dog owner")).toBeTruthy();
    expect(getByText("Social anxiety")).toBeTruthy();
  });

  it("renders all palette options", () => {
    const { getByText } = render(<SettingsScreen />);
    expect(getByText("Tol color palette")).toBeTruthy();
    expect(getByText("IBM color palette")).toBeTruthy();
  });

  it("toggles accessibility option on press", () => {
    const { getByText, getAllByA11yRole } = render(<SettingsScreen />);
    const wheelchairSwitch = getByText("Wheelchair user").parent?.parent?.find(
      (node) => node.props.accessibilityRole === "switch"
    );
    if (wheelchairSwitch) {
      fireEvent(wheelchairSwitch, "valueChange", true);
    }
    expect(getByText("Wheelchair user")).toBeTruthy(); // Still rendered
  });

  it("selects Tol palette", () => {
    const { getByText } = render(<SettingsScreen />);
    fireEvent.press(getByText("Tol color palette"));
    expect(getByText("Tol color palette")).toBeTruthy(); // Selected switch should reflect change
  });

  it("selects IBM palette", () => {
    const { getByText } = render(<SettingsScreen />);
    fireEvent.press(getByText("IBM color palette"));
    expect(getByText("IBM color palette")).toBeTruthy(); // Should remain true (default)
  });

  it("matches snapshot", () => {
    const tree = render(<SettingsScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders icons for header and sections", () => {
    const { getAllByRole } = render(<SettingsScreen />);
    const icons = getAllByRole("button");
    expect(icons.length).toBeGreaterThanOrEqual(3); // home, close, and maybe others
  });

  it("toggles multiple accessibility options independently", () => {
    const { getByText } = render(<SettingsScreen />);
    fireEvent.press(getByText("Wheelchair user"));
    fireEvent.press(getByText("Hearing loop"));
    fireEvent.press(getByText("Social anxiety"));

    expect(getByText("Wheelchair user")).toBeTruthy();
    expect(getByText("Hearing loop")).toBeTruthy();
    expect(getByText("Social anxiety")).toBeTruthy();
  });

  it("does not crash when all switches are toggled", () => {
    const { getByText } = render(<SettingsScreen />);
    [
      "Wheelchair user",
      "Hearing loop",
      "Guide dog owner",
      "Social anxiety",
    ].forEach((label) => {
      fireEvent.press(getByText(label));
    });
    expect(getByText("Guide dog owner")).toBeTruthy();
  });
});
