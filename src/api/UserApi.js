import { apiUrl } from '../constants/constants';

const Login = async (username, password) => {
  try {
    const response = await fetch(apiUrl + '/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    if (response.ok) {
      const token = await response.text();
      //   setAccessToken(token);
      return [token, null];
    }
    if (!response.ok) {
      throw new Error('Something went wrong during login', response.status);
    }
  } catch (error) {
    console.error(error);
    return [null, error];
  }
};

const Signup = async (username, password) => {
  try {
    const response = await fetch(apiUrl + '/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    if (response.ok) {
      const message = await response.text();
      return [message, null];
    }
    if (!response.ok) {
      throw new Error('Something went wrong during signup', response.status);
    }
  } catch (error) {
    console.error(error);
    return [null, error];
  }
};

export { Login, Signup };
