export const getAuthToken = () => localStorage.getItem("authToken"); // Get token from storage

export const isAuthenticated = () => Boolean(getAuthToken()); // Check if token exists
