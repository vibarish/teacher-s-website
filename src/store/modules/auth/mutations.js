export default {
  setUser(state, payload) {
    state.token = payload.token;
    state.userId = payload.userId;
    state.didAutologout = false;
    // state.isAdmin = state.userId ==='MwfJwsxHBpcj92dE9MCCRmOoWau2' ? true : false;
    state.isAdmin = payload.isAdmin;
  },
  setAutologout(state) {
    state.didAutologout = true;
  }
};