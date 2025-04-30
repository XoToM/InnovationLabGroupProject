const React = require("react");

module.exports = {
  __esModule: true,
  default: {
    setAccessToken: jest.fn(),
    setTelemetryEnabled: jest.fn(),
  },
  MapView: (props) => <View {...props} testID="mockMapView" />,
  StyleURL: {
    Street: "mock-street-url",
  },
};
