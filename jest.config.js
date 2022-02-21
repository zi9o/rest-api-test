module.exports = {
  verbose: true,
  transform: {
    "^.*\\.js$": "<rootDir>/preprocessor.js",
  },
  setupFilesAfterEnv: ['./test/jest.setup.js'],
  modulePathIgnorePatterns: ["<rootDir>/front/"]
};
