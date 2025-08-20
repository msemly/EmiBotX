module.exports = {
    // Logs an error message
    error: (message, ...optionalParams) => {
        console.error("[ERROR]", message, ...optionalParams);
    },

    // Logs a normal message
    log: (message, ...optionalParams) => {
        console.log("[LOG]", message, ...optionalParams);
    },
};
