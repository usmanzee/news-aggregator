export const defaultConfig = {
  api: {
    baseUrl: "http://localhost:8000",
  },
};

export const equipmentCalibrationFrontend = {
  config: defaultConfig,
};

window.env = window.env || defaultConfig;
equipmentCalibrationFrontend.config = { ...window.env };

export const baseUrl = () => equipmentCalibrationFrontend.config.api.baseUrl;
