export const logger = (message, ...optionalParams) => {
	if (import.meta.env.MODE === "development") {
		console.log(message, ...optionalParams);
	}
};
