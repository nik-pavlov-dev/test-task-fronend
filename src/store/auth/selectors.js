// eslint-disable-next-line import/prefer-default-export
export const signedUserSelector = (state) => [state.auth.user, state.auth.loading];
