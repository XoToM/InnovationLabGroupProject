// __tests__/MapScreen.test.tsx
import React from "react";
import { render } from "@testing-library/react-native";
import Mapbox from "@rnmapbox/maps";

jest.mock("@rnmapbox/maps", () => ({
  setAccessToken: jest.fn(),
  setTelemetryEnabled: jest.fn(),
  MapView: () => null,
}));

jest.mock("expo-constants", () => ({
  expoConfig: {
    extra: {
      MAPBOX_ACCESS_TOKEN: "test_token",
    },
  },
}));

describe("MapScreen", () => {
  it("calls Mapbox.setAccessToken when token is available", () => {
    require("../app/screens/map");
    expect(Mapbox.setAccessToken).toHaveBeenCalledWith("test_token");
  });

  it("calls Mapbox.setTelemetryEnabled with false", () => {
    require("../app/screens/map");
    expect(Mapbox.setTelemetryEnabled).toHaveBeenCalledWith(false);
  });
});
