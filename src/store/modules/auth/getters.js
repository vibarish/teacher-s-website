export default {
  myMessage(state) {
    return state.newsMessage;
  },
  token(state) {
    return state.token;
  },
  isAuthenticated(state) {
    return !!state.token;
  },
  isAuthAsAdmin(state) {
      // return state.userId ==='MwfJwsxHBpcj92dE9MCCRmOoWau2' ? true : false;
      return state.isAdmin;
  },
  didAutologout(state) {
    return state.didAutologout;
  }
};