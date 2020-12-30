let timer;

export default {
  async login(context, payload) {
    return context.dispatch('auth', {
      ...payload,
      mode: 'login'
    });
  },
  async signup(context, payload) {
    return context.dispatch('auth', {
      ...payload,
      mode: 'signup'
    });
  },
  async auth(context, payload) {
    const mode = payload.mode;
    let url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC0TzwMD-I4eIBFJd6rDM8bw_u2NSqWD7g";
    if (mode === 'signup') {
      url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC0TzwMD-I4eIBFJd6rDM8bw_u2NSqWD7g";
    }
    const response = await fetch(
      url,
      {
        method: "POST",
        // headers: {
        //   "Content-type": "application/json",
        // },
        body: JSON.stringify({
          email: payload.email,
          password: payload.password,
          returnSecureToken: true,
        }),
      }
    );
    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(
        responseData.message || "Не удалось зарегистрироваться"
      );
      throw error;
    }
    
    /* Время выхода из аккаунта */
    const expiresIn = +responseData.expiresIn * 1000; 
    // const expiresIn = 5000; 
    
    const expirationDate = new Date().getTime() + expiresIn;
    localStorage.setItem('token', responseData.idToken);
    localStorage.setItem('tokenExpiration', expirationDate);
    let isAdmin = responseData.localId ==='MwfJwsxHBpcj92dE9MCCRmOoWau2' ? true : false
    localStorage.setItem('adminLogged', isAdmin);

    timer = setTimeout(() => {
      context.dispatch('autologout');
    }, expiresIn);

    context.commit("setUser", {
      token: responseData.idToken,
      userId: responseData.localId,
      isAdmin: isAdmin
    });
  },
  autologin(context) {
    const admin = localStorage.getItem('adminLogged');

    const token = localStorage.getItem('token');
    const tokenExpiration = localStorage.getItem('tokenExpiration');
    const userId = localStorage.getItem('userId');

    const expiresIn = +tokenExpiration - new Date().getTime();

    let adminValue;
    if (admin === 'false')
      adminValue = false
    else adminValue = true;

    if (expiresIn < 0) {
      return;
    }

    timer = setTimeout(function() {
      context.dispatch('autologout');
    }, expiresIn);

  

    if (token) {
      context.commit('setUser', {
        token: token,
        userId: userId,
        isAdmin: adminValue
      })
      
    }
  
  },
  logout(context) {
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpiration');
    localStorage.removeItem('userId');
    localStorage.removeItem('isAdmin');
    
    clearTimeout(timer);
    context.commit('setUser', {
      token: null,
      userId: null,
      isAdmin: null
    })
  },
  autologout(context) {
    context.dispatch('logout');
    context.commit('setAutologout');
  }
};
