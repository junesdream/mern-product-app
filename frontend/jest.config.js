export default {
	testEnvironment: "jsdom",
	transform: {
		"^.+\\.[t|j]sx?$": "babel-jest",
	},
	setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
};
