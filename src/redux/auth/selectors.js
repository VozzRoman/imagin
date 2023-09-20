export const getAuth = (state) => state.auth;
export const getUser = (state) => state.auth.user;
export const getIsLoading = (state) => state.auth.isLoading;
export const getErrorUp = (state) => state.auth.signUpError;
export const getError = (state) => state.auth.error;
export const getErrorIn = (state) => state.auth.signInError;
export const getToken = (state) => state.auth.token;
export const getIsFetchUser = (state) => state.auth.isFetchingUser;
