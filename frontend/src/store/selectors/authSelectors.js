export const selectIsAdmin = (state) => state.auth.user?.role === 'admin';

export const selectAuthUser = (state) => state.auth.user;

export const selectAuthToken = (state) => state.auth.token;
