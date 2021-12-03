let timer;

export default {
  async login(context, payload) {
    return context.dispatch('auth', {
      ...payload,
      mode: 'login',
    });
  },
  async signup(context, payload) {
    return context.dispatch('auth', {
      ...payload,
      mode: 'signup',
    });
  },
  async auth(context, payload) {
    const mode = payload.mode;
    const url =
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB-qgMw7GFyG11cWovDimqJPUSicD1JzD8';

    if (mode === 'signup') {
      const url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB-qgMw7GFyG11cWovDimqJPUSicD1JzD8';
    }
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
        returnSecureToken: true,
      }),
    });

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(
        responseData.message || 'Failed to authenticate. Check your login data.'
      );
      throw error;
    }
    const expiresIn = +responseData.expiresIn * 1000; // milliseconds
    // const expiresIn = 8000; // milliseconds
    const expirationDate = new Date().getTime() + expiresIn;

    localStorage.setItem('token', responseData.idToken);
    localStorage.setItem('userId', responseData.localId);
    localStorage.setItem('expirationDate', expirationDate);

    timer = setTimeout(function () {
      context.dispatch('autoLogOut');
    }, expiresIn);

    context.commit('setUser', {
      token: responseData.idToken,
      userId: responseData.localId,
    });
  },

  tryLogin(context) {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const expirationDate = localStorage.getItem('expirationDate');
    const expiresIn = expirationDate - new Date().getTime();

    if (expiresIn < 0) {
      return;
    }

    timer = setTimeout(function () {
      context.dispatch('autoLogOut');
    }, expiresIn);

    if (token && userId) {
      context.commit('setUser', {
        token: token,
        userId: userId,
      });
    }
  },

  logOut(context) {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expirationDate');
    clearTimeout(timer);
    context.commit('setUser', {
      userId: null,
      token: null,
    });
  },
  autoLogOut(context){
    context.dispatch('logOut');
    context.commit('setAutoLogOut');
  }
};
