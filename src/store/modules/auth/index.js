import mutations from './mutations';
import actions from './actions';
import getters from './getters';

export default {
  state() {
    return {
      // email: '',
      userId: null,
      token: null,
      didAutologout: false,
      newsMessage: '',
      parentsMessage: '',
      articleMessage: ''
    };
  },
  mutations,
  actions,
  getters
};