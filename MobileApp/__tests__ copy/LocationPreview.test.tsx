import React from "react";
import { render, waitFor } from "@testing-library/react-native";
import LocationPreview from "../app/components/LocationPreview";
import { Image } from "react-native";

jest.mock("react-native/Libraries/Settings/NativeSettingsManager", () => ({
  getConstants: () => ({ settings: {} }),
}));

jest.mock("react-native", () => {
  const RN = jest.requireActual("react-native");
  return {
    ...RN,
    Image: {
      ...RN.Image,
      getSize: jest.fn((uri, success) => {
        console.log("Mock getSize called with:", uri);
        setTimeout(() => success(400, 200), 0); // Delay slightly to simulate async
      }),
    },
  };
});

describe("LocationPreview", () => {
  const mockInfo = {
    name: "Park",
    img: "https://example.com/image.jpg",
  };

  it("renders the correct image and name", async () => {
    const { getByText } = render(<LocationPreview info={mockInfo} />);
    await waitFor(() => {
      expect(getByText("Park")).toBeTruthy();
    });
  });

  it("sets correct aspect ratio after loading image size", async () => {
    const { UNSAFE_getByType } = render(<LocationPreview info={mockInfo} />);
    await waitFor(() => {
      const image = UNSAFE_getByType(Image);
      expect(image.props.style.aspectRatio).toBe(2);
    });
  });

  it("calls Image.getSize with correct URI", () => {
    expect(Image.getSize).toHaveBeenCalledWith(
      mockInfo.img,
      expect.any(Function)
    );
  });
});
